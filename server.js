"use strict";
// Maktab sayti serveri. Tashqi kutubxona kerak emas, faqat Node.js 18+.
// Saqlash ikki xil: (1) SUPABASE_URL va SUPABASE_KEY berilsa — Supabase Storage (bepul, doimiy);
// (2) berilmasa — shu kompyuterdagi "data" papkasi (sinash uchun).
const http=require("http"),fs=require("fs"),path=require("path"),crypto=require("crypto"),{Readable}=require("stream");
const PORT=+process.env.PORT||3000, PIN=process.env.MAKTAB_PIN||"maktab";
const SB_URL=(process.env.SUPABASE_URL||"").trim().replace(/\/+$/,""), SB_KEY=(process.env.SUPABASE_KEY||"").trim(), SB_BUCKET=(process.env.SUPABASE_BUCKET||"maktab").trim();
const REMOTE=!!(SB_URL&&SB_KEY);
const PUB=path.join(__dirname,"public"), DATA=process.env.DATA_DIR||path.join(__dirname,"data");
const UP=path.join(DATA,"uploads"), PDF=path.join(DATA,"pdf");
if(!REMOTE) for(const d of [UP,PDF]) fs.mkdirSync(d,{recursive:true});
const MAX_PDF=(REMOTE?50:150)*2**20, MAX_JSON=6*2**20, KEY=/^(5|6|7|8|9|10|11)-(uz|ru)-[a-z0-9]+(-[a-z0-9]+)*$/;
const MIME={".html":"text/html; charset=utf-8",".css":"text/css; charset=utf-8",".js":"text/javascript; charset=utf-8",".png":"image/png",".jpg":"image/jpeg",".jpeg":"image/jpeg",".webp":"image/webp",".svg":"image/svg+xml",".ico":"image/x-icon",".pdf":"application/pdf"};

const json=(res,code,obj)=>{if(res.headersSent)return;res.writeHead(code,{"Content-Type":"application/json; charset=utf-8","Cache-Control":"no-store"});res.end(JSON.stringify(obj))};
const id=()=>crypto.randomBytes(8).toString("hex");
const clean=(v,n)=>typeof v==="string"?v.trim().slice(0,n):"";
const sha=s=>crypto.createHash("sha256").update(String(s)).digest();
const same=(a,b)=>crypto.timingSafeEqual(sha(a),sha(b));
const notFound=res=>{res.writeHead(404,{"Content-Type":"text/plain; charset=utf-8"});res.end("Topilmadi")};
const storageErr=(msg)=>Object.assign(new Error(msg),{code:502});

/* ---------- Saqlash: Supabase yoki lokal papka ---------- */
const hdr=()=>{const h={apikey:SB_KEY,"Accept-Encoding":"identity"};if(SB_KEY.startsWith("eyJ"))h.Authorization="Bearer "+SB_KEY;return h};
const objUrl=p=>`${SB_URL}/storage/v1/object/${encodeURIComponent(SB_BUCKET)}/${p.split("/").map(encodeURIComponent).join("/")}`;
const rGet=(p,range)=>fetch(objUrl(p),{headers:{...hdr(),...(range?{Range:range}:{})}});
async function rPut(p,buf,type){
  let r;try{r=await fetch(objUrl(p),{method:"POST",headers:{...hdr(),"Content-Type":type,"x-upsert":"true"},body:buf})}catch(e){throw storageErr("Saqlash xizmatiga ulanib bo'lmadi")}
  if(!r.ok)throw storageErr("Saqlash xatosi "+r.status+": "+(await r.text()).slice(0,200))}
// Fayl yo'qligini aniqlash. Boshqa xatolar (kalit noto'g'ri, tarmoq) "yo'q" hisoblanmaydi — aks holda ma'lumot ustidan yozilib ketardi.
async function missing(r){if(r.status===404)return true;if(r.status!==400)return false;const t=await r.clone().text();return /not.?found/i.test(t)&&!/bucket/i.test(t)}

const cache=new Map();
let chain=Promise.resolve();
const lock=fn=>{const r=chain.then(()=>fn());chain=r.catch(()=>{});return r};  // bir vaqtda yozishlar ketma-ket bajariladi

const store={
  async getJson(name){
    if(!REMOTE){try{return JSON.parse(fs.readFileSync(path.join(DATA,name),"utf8"))}catch(e){return[]}}
    const c=cache.get(name);if(c&&Date.now()-c.t<30000)return structuredClone(c.v);
    let r;try{r=await rGet("data/"+name)}catch(e){throw storageErr("Saqlash xizmatiga ulanib bo'lmadi")}
    if(r.ok){let v;try{v=await r.json()}catch(e){throw storageErr("Saqlangan ma'lumot o'qilmadi")}cache.set(name,{v,t:Date.now()});return structuredClone(v)}
    if(await missing(r))return[];
    throw storageErr("Saqlash xizmati xatosi "+r.status)},
  async setJson(name,v){
    if(!REMOTE){const p=path.join(DATA,name),t=p+"."+process.pid+".tmp";fs.writeFileSync(t,JSON.stringify(v));fs.renameSync(t,p);return}
    await rPut("data/"+name,Buffer.from(JSON.stringify(v)),"application/json");cache.set(name,{v:structuredClone(v),t:Date.now()})},
  async putFile(rel,buf,type){
    if(REMOTE)return rPut(rel,buf,type);
    const p=path.join(DATA,rel),t=p+"."+id()+".tmp";fs.writeFileSync(t,buf);fs.renameSync(t,p)},
  async books(){return REMOTE?store.getJson("books.json"):fs.readdirSync(PDF).filter(f=>f.endsWith(".pdf")).map(f=>f.slice(0,-4))},
  async addBook(key){if(REMOTE)await lock(async()=>{const a=await store.getJson("books.json");if(!a.includes(key)){a.push(key);await store.setJson("books.json",a)}})}
};

async function proxy(req,res,rel,type,cch){
  let r;try{r=await rGet(rel,req.headers.range)}catch(e){throw storageErr("Saqlash xizmatiga ulanib bo'lmadi")}
  if(!r.ok){if(await missing(r))return notFound(res);throw storageErr("Saqlash xizmati xatosi "+r.status)}
  const h={"Content-Type":type,"Cache-Control":cch,"Accept-Ranges":"bytes"};
  for(const k of["content-length","content-range"]){const v=r.headers.get(k);if(v)h[k]=v}
  res.writeHead(r.status,h);
  if(req.method==="HEAD"||!r.body)return res.end();
  const s=Readable.fromWeb(r.body);res.on("close",()=>s.destroy());s.on("error",()=>res.destroy());s.pipe(res)}

function sendFile(req,res,file,type,cch){fs.stat(file,(e,st)=>{
  if(e||!st.isFile())return notFound(res);
  const h={"Content-Type":type,"Accept-Ranges":"bytes","Cache-Control":cch};
  let s=0,en=st.size-1,code=200;const r=/^bytes=(\d*)-(\d*)$/.exec(req.headers.range||"");
  if(r&&(r[1]||r[2])){if(r[1]==="")s=Math.max(0,st.size-+r[2]);else{s=+r[1];if(r[2])en=Math.min(en,+r[2])}
    if(s>en||s>=st.size){res.writeHead(416,{"Content-Range":`bytes */${st.size}`});return res.end()}
    code=206;h["Content-Range"]=`bytes ${s}-${en}/${st.size}`}
  h["Content-Length"]=en-s+1;res.writeHead(code,h);
  if(req.method==="HEAD")return res.end();
  fs.createReadStream(file,{start:s,end:en}).pipe(res)})}
const serve=(req,res,rel,type,cch)=>REMOTE?proxy(req,res,rel,type,cch):sendFile(req,res,path.join(DATA,rel),type,cch);

function body(req){return new Promise((ok,no)=>{let n=0;const c=[];
  req.on("data",d=>{n+=d.length;if(n>MAX_JSON){no(Object.assign(new Error("big"),{code:413}));req.destroy()}else c.push(d)});
  req.on("end",()=>{try{ok(JSON.parse(Buffer.concat(c).toString()||"{}"))}catch(e){no(Object.assign(e,{code:400}))}});
  req.on("error",no)})}

// Parol tekshiruvi: noto'g'ri urinishlar cheklanadi (15 daqiqada 10 ta)
const fails=new Map();
const ipOf=req=>process.env.TRUST_PROXY?(String(req.headers["x-forwarded-for"]||"").split(",")[0].trim()||req.socket.remoteAddress):req.socket.remoteAddress;
function checkPin(req,pin){const k=ipOf(req),now=Date.now();let f=fails.get(k);
  if(!f||now-f.t>9e5){f={n:0,t:now};fails.set(k,f)}
  if(f.n>=10)return 429;
  if(typeof pin==="string"&&same(pin,PIN)){fails.delete(k);return 200}
  f.n++;return 401}
const deny=(res,s)=>json(res,s,{error:s===429?"Juda ko'p urinish. Keyinroq urinib ko'ring.":"Parol xato!"});

async function saveImg(d){const m=/^data:image\/(jpeg|png|webp);base64,([A-Za-z0-9+/=]+)$/.exec(typeof d==="string"?d:"");if(!m)return null;
  const buf=Buffer.from(m[2],"base64");if(!buf.length||buf.length>4e6)return null;
  const ext=m[1]==="jpeg"?"jpg":m[1],name=crypto.randomBytes(10).toString("hex")+"."+ext;
  await store.putFile("uploads/"+name,buf,MIME["."+ext]);return name}

async function putBook(req,res,key){
  if(!KEY.test(key)||key.length>40)return json(res,400,{error:"Noto'g'ri kitob nomi"});
  const st=checkPin(req,String(req.headers["x-pin"]||""));
  if(st!==200){res.setHeader("Connection","close");deny(res,st);return res.once("finish",()=>req.destroy())}
  const chunks=[];let n=0;
  for await(const d of req){n+=d.length;
    if(n>MAX_PDF){res.setHeader("Connection","close");json(res,413,{error:`Fayl juda katta (${MAX_PDF/2**20} MB gacha bo'lishi kerak)`});return res.once("finish",()=>req.destroy())}
    chunks.push(d)}
  const buf=Buffer.concat(chunks);
  if(buf.subarray(0,5).toString()!=="%PDF-")return json(res,400,{error:"Bu PDF fayl emas"});
  await store.putFile("pdf/"+key+".pdf",buf,"application/pdf");
  await store.addBook(key);
  json(res,200,{ok:true})}


/* ---------- O'qituvchilar sahifasi (sayt ichidan o'zgartirilgan qismi) ---------- */
const OFIELDS={direktor:["ism","yosh","direktor","qabulKunlari","qabulVaqti"],orinbosarlar:["ism","vazifa","malumot","yosh","staj"],oqituvchilar:["ism","fan","yosh","malumot","staj"]};
const OMAX={direktor:1,orinbosarlar:10,oqituvchilar:200};
async function odamDoc(){const d=await store.getJson("odamlar.json");return(!d||Array.isArray(d))?{}:d}
// null — ma'lumot noto'g'ri, undefined — rasm noto'g'ri, aks holda tozalangan ro'yxat
async function cleanPeople(g,items){if(!Array.isArray(items)||items.length>OMAX[g])return null;const out=[];
  for(const it of items){if(!it||typeof it!=="object")return null;const o={};
    for(const k of OFIELDS[g])o[k]=clean(String(it[k]??""),k==="ism"?80:100);
    if(!o.ism)return null;
    let r=typeof it.rasm==="string"?it.rasm.trim():"";
    if(r.startsWith("data:image/")){const n=await saveImg(r);if(!n)return undefined;r="/uploads/"+n}
    else if(!(/^img\/[\w./-]{1,120}$/.test(r)&&!r.includes(".."))&&!/^\/uploads\/[a-f0-9]{20}\.(jpg|png|webp)$/.test(r))r="";
    o.rasm=r;out.push(o)}
  return out}

/* ---------- Dars jadvali (sayt ichidan o'zgartirilgan qismi) ---------- */
const KUN=["Dushanba","Seshanba","Chorshanba","Payshanba","Juma","Shanba"];
async function jadvalDoc(){const d=await store.getJson("jadval.json");return(!d||Array.isArray(d))?{zanglar:null,sinflar:{}}:{zanglar:d.zanglar||null,sinflar:d.sinflar||{}}}
function cleanDays(k){if(!k||typeof k!=="object")return null;const out={};
  for(const d of KUN){const a=k[d]||[];if(!Array.isArray(a)||a.length>12)return null;out[d]=[];
    for(const x of a){if(!Array.isArray(x)||x.length<2||x.length>3)return null;
      const fan=clean(x[0],60),xona=clean(x[1],30),vaqt=x.length===3?clean(x[2],30):"";if(!fan)return null;out[d].push(vaqt?[fan,xona,vaqt]:[fan,xona])}}
  return out}
async function jadvalApi(req,res,p,m){let r;
  if(p==="/api/jadval"&&m==="GET")return json(res,200,await jadvalDoc());
  if((r=/^\/api\/jadval\/sinf\/([^/]{1,12})$/.exec(p))&&(m==="PUT"||m==="DELETE")){
    const sinf=r[1];if(!/^[\p{L}\p{N}'’-]{1,12}$/u.test(sinf))return json(res,400,{error:"Sinf nomi noto'g'ri"});
    const b=m==="PUT"?await body(req):{},s=checkPin(req,m==="PUT"?b.pin:String(req.headers["x-pin"]||""));if(s!==200)return deny(res,s);
    if(m==="PUT"){const kun=cleanDays(b.kunlar);if(!kun)return json(res,400,{error:"Jadval noto'g'ri to'ldirilgan (har bir darsda fan nomi bo'lishi kerak)"});
      await lock(async()=>{const d=await jadvalDoc();d.sinflar[sinf]=kun;await store.setJson("jadval.json",d)})}
    else await lock(async()=>{const d=await jadvalDoc();delete d.sinflar[sinf];await store.setJson("jadval.json",d)});
    return json(res,200,{ok:true})}
  if(p==="/api/jadval/zanglar"&&(m==="PUT"||m==="DELETE")){
    const b=m==="PUT"?await body(req):{},s=checkPin(req,m==="PUT"?b.pin:String(req.headers["x-pin"]||""));if(s!==200)return deny(res,s);
    let z=null;if(m==="PUT"){if(!Array.isArray(b.zanglar)||b.zanglar.length<1||b.zanglar.length>12)return json(res,400,{error:"Vaqtlar noto'g'ri"});
      z=b.zanglar.map(x=>clean(x,30));if(z.some(x=>!x))return json(res,400,{error:"Bo'sh vaqt bo'lmasligi kerak"})}
    await lock(async()=>{const d=await jadvalDoc();d.zanglar=z;await store.setJson("jadval.json",d)});
    return json(res,200,{ok:true})}
  return false}

async function api(req,res,p,m){let r;
  if(p==="/api/odamlar"){
    if(m==="GET")return json(res,200,await odamDoc());
    if(m==="DELETE"){const st=checkPin(req,String(req.headers["x-pin"]||""));if(st!==200)return deny(res,st);
      await lock(()=>store.setJson("odamlar.json",{}));return json(res,200,{ok:true})}}
  if((r=/^\/api\/odamlar\/(direktor|orinbosarlar|oqituvchilar)$/.exec(p))&&m==="PUT"){
    const b=await body(req),st=checkPin(req,b.pin);if(st!==200)return deny(res,st);
    const items=await cleanPeople(r[1],b.items);
    if(items===null)return json(res,400,{error:"Ma'lumot noto'g'ri to'ldirilgan (har bir ramkada ism-familya bo'lishi kerak)"});
    if(items===undefined)return json(res,400,{error:"Rasm noto'g'ri yoki juda katta"});
    await lock(async()=>{const d=await odamDoc();d[r[1]]=items;await store.setJson("odamlar.json",d)});
    return json(res,200,{items})}
  if(p==="/api/chorak"){
    if(m==="GET"){const d=await store.getJson("chorak.json");return json(res,200,{tugash:(d&&!Array.isArray(d)&&Number(d.tugash))||null,hozir:Date.now()})}
    if(m==="PUT"){const b=await body(req),st=checkPin(req,b.pin);if(st!==200)return deny(res,st);
      const n=(v,max)=>Number.isInteger(v)&&v>=0&&v<=max?v:null,kun=n(b.kun,400),soat=n(b.soat,23),daq=n(b.daqiqa,59),sek=n(b.sekund,59);
      if([kun,soat,daq,sek].includes(null))return json(res,400,{error:"Qiymatlar noto'g'ri: kun 0–400, soat 0–23, daqiqa va sekund 0–59 bo'lishi kerak"});
      const tugash=Date.now()+(((kun*24+soat)*60+daq)*60+sek)*1000;
      await lock(()=>store.setJson("chorak.json",{tugash}));
      return json(res,200,{tugash,hozir:Date.now()})}}
  if(p.startsWith("/api/jadval")){const x=await jadvalApi(req,res,p,m);if(x!==false)return x}
  if(p==="/api/health"&&m==="GET"){
    if(!REMOTE)return json(res,200,{saqlash:"lokal papka",ok:true});
    try{const x=await rGet("data/health-check");const t=await x.clone().text();
      const ok=x.ok||await missing(x);return json(res,200,ok?{saqlash:"supabase",bucket:SB_BUCKET,ok:true,javob:"Ulanish yaxshi"}:{saqlash:"supabase",bucket:SB_BUCKET,ok:false,holat:x.status,javob:t.slice(0,200)})}
    catch(e){return json(res,200,{saqlash:"supabase",ok:false,javob:"Ulanib bo'lmadi: "+e.message})}}
  if(p==="/api/pin"&&m==="POST"){const b=await body(req),s=checkPin(req,b.pin);return s===200?json(res,200,{ok:true}):deny(res,s)}
  if(p==="/api/events"){
    if(m==="GET")return json(res,200,await store.getJson("events.json"));
    if(m==="POST"){const b=await body(req),s=checkPin(req,b.pin);if(s!==200)return deny(res,s);
      const text=clean(b.text,2000);let img="";
      if(b.img){const n=await saveImg(b.img);if(!n)return json(res,400,{error:"Rasm noto'g'ri yoki juda katta"});img="/uploads/"+n}
      if(!text&&!img)return json(res,400,{error:"Rasm yoki matn kerak"});
      await lock(async()=>{const a=await store.getJson("events.json");a.push({id:id(),text,img,time:Date.now()});await store.setJson("events.json",a)});
      return json(res,201,{ok:true})}}
  if(p==="/api/news"){
    if(m==="GET")return json(res,200,(await store.getJson("news.json")).map(({token,...x})=>x));
    if(m==="POST"){const b=await body(req),s=checkPin(req,b.pin);if(s!==200)return deny(res,s);
      const name=clean(b.name,80),text=clean(b.text,2000);if(!name||!text)return json(res,400,{error:"Ism va xabar kerak"});
      const it={id:id(),name,text,time:Date.now(),token:crypto.randomBytes(16).toString("hex")};
      await lock(async()=>{const a=await store.getJson("news.json");a.push(it);await store.setJson("news.json",a)});
      return json(res,201,{id:it.id,token:it.token})}}
  if((r=/^\/api\/news\/([a-f0-9]{16})$/.exec(p))&&m==="DELETE"){
    const tok=String(req.headers["x-token"]||""),pin=req.headers["x-pin"];let out=[200,{ok:true}];
    await lock(async()=>{const a=await store.getJson("news.json"),i=a.findIndex(x=>x.id===r[1]);
      if(i<0){out=[404,{error:"Topilmadi"}];return}
      if(!(tok&&same(tok,a[i].token))&&!(pin&&checkPin(req,String(pin))===200)){out=[403,{error:"Ruxsat yo'q"}];return}
      a.splice(i,1);await store.setJson("news.json",a)});
    return json(res,out[0],out[1])}
  if(p==="/api/books"&&m==="GET")return json(res,200,await store.books());
  if((r=/^\/api\/books\/([\w-]+)$/.exec(p))&&m==="PUT")return putBook(req,res,r[1]);
  json(res,404,{error:"Topilmadi"})}

const server=http.createServer(async(req,res)=>{try{
  res.setHeader("X-Content-Type-Options","nosniff");
  let p;try{p=decodeURIComponent(new URL(req.url,"http://x").pathname)}catch(e){res.writeHead(400);return res.end()}
  if(p.startsWith("/api/"))return await api(req,res,p,req.method);
  if(req.method!=="GET"&&req.method!=="HEAD"){res.writeHead(405);return res.end()}
  let r;
  if(r=/^\/pdf\/([\w-]+)$/.exec(p))return KEY.test(r[1])?await serve(req,res,"pdf/"+r[1]+".pdf",MIME[".pdf"],"no-cache"):notFound(res);
  if(r=/^\/uploads\/([a-f0-9]{20}\.(jpg|png|webp))$/.exec(p))return await serve(req,res,"uploads/"+r[1],MIME["."+r[2]],"public, max-age=31536000, immutable");
  const f=path.resolve(PUB,"."+(p.endsWith("/")?p+"index.html":p));
  if(!f.startsWith(PUB+path.sep))return notFound(res);
  sendFile(req,res,f,MIME[path.extname(f).toLowerCase()]||"application/octet-stream","no-cache");
}catch(e){const c=e&&e.code;if(c===502||!(c===400||c===413))console.error("Xato:",e&&e.message);
  if(!res.headersSent)json(res,c===400||c===413||c===502?c:500,{error:c===413?"Juda katta":c===502?"Saqlash xizmatiga ulanib bo'lmadi. Keyinroq urinib ko'ring.":"Xato"});else res.end()}});
server.requestTimeout=15*60e3;
server.listen(PORT,()=>{console.log(`Sayt ishga tushdi: http://localhost:${PORT}`);
  console.log(REMOTE?`Saqlash: Supabase (bucket: ${SB_BUCKET})`:"Saqlash: shu kompyuterdagi 'data' papkasi (internetdagi hostingda doimiy emas bo'lishi mumkin)");
  if(PIN==="maktab")console.log("DIQQAT: parol hali standart ('maktab'). Internetga chiqarishdan oldin o'zgartiring: MAKTAB_PIN=yangi_parol")});
