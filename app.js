const $=id=>document.getElementById(id),KEY="PB_INVOICES",DRAFT="PB_DRAFT";let edit=null;const money=n=>"£"+Number(n||0).toLocaleString("en-GB",{minimumFractionDigits:2,maximumFractionDigits:2});
function view(x){document.querySelectorAll(".screen").forEach(s=>s.classList.add("hide"));$(x).classList.remove("hide");if(x==="dashboard")dash();if(x==="invoices")renderInvoices();if(x==="customers")renderCustomers();$("side").classList.remove("open")}
function toggleSide(){$("side").classList.toggle("open")}function next(){let a=JSON.parse(localStorage.getItem(KEY)||"[]"),n=a.length+1;return"INV-"+String(n).padStart(4,"0")}
function add(x={description:"",qty:1,unit:0}){let t=document.createElement("tr");t.innerHTML=`<td><input class="d" value="${x.description||""}"></td><td><input class="q" type="number" value="${x.qty??1}"></td><td><input class="u" type="number" value="${x.unit??0}" step=".01"></td><td class="line">£0.00</td><td><button class="danger" onclick="this.closest('tr').remove();calc();draft()">×</button></td>`;$("items").appendChild(t);t.querySelectorAll("input").forEach(i=>i.oninput=()=>{calc();draft()});calc()}
function calc(){let t=0;document.querySelectorAll("#items tr").forEach(r=>{let v=(+r.querySelector(".q").value||0)*(+r.querySelector(".u").value||0);t+=v;r.querySelector(".line").textContent=money(v)});let r=+$("received").value||0;$("total").textContent=money(t);$("remain").textContent=money(Math.max(0,t-r))}
function collect(){return{id:edit||Date.now().toString(),no:$("no").value,date:$("date").value,time:$("time").value,customer:$("customer").value,phone:$("phone").value,email:$("email").value,address:$("address").value,project:$("project").value,received:+$("received").value||0,notes:$("notes").value,payment:$("payment").value,terms:$("terms").value,variations:$("variations").value,items:[...document.querySelectorAll("#items tr")].map(r=>({description:r.querySelector(".d").value,qty:+r.querySelector(".q").value||0,unit:+r.querySelector(".u").value||0}))}}
function draft(){localStorage.setItem(DRAFT,JSON.stringify(collect()))}
function load(x){edit=x.id||null;$("no").value=x.no||next();$("date").value=x.date||new Date().toISOString().slice(0,10);$("time").value=x.time||new Date().toTimeString().slice(0,5);["customer","phone","email","address","project","notes","payment","terms","variations"].forEach(k=>$(k).value=x[k]||"");$("received").value=x.received||0;$("items").innerHTML="";(x.items?.length?x.items:[{}]).forEach(add);calc()}
function newInvoice(){edit=null;localStorage.removeItem(DRAFT);load({no:next(),items:[{}]});view("new")}
function save(){let x=collect(),a=JSON.parse(localStorage.getItem(KEY)||"[]"),i=a.findIndex(v=>v.id===x.id);if(i<0)a.unshift(x);else a[i]=x;localStorage.setItem(KEY,JSON.stringify(a));localStorage.setItem(DRAFT,JSON.stringify(x));edit=x.id;toast("Invoice saved")}
function open(id){let x=JSON.parse(localStorage.getItem(KEY)||"[]").find(v=>v.id===id);if(x){load(x);view("new")}}
function del(id){if(confirm("Delete this invoice?")){localStorage.setItem(KEY,JSON.stringify(JSON.parse(localStorage.getItem(KEY)||"[]").filter(x=>x.id!==id)));renderInvoices();dash()}}
function row(x){let t=x.items.reduce((s,i)=>s+i.qty*i.unit,0);return`<div class="row"><div><b>${x.no}</b><br>${x.customer||"No customer"}<br><small>${x.date||""} · ${money(t)} · Remaining ${money(Math.max(0,t-x.received))}</small></div><div><button onclick="open('${x.id}')">Open</button><button class="danger" onclick="del('${x.id}')">Delete</button></div></div>`}
function renderInvoices(){let q=($("isearch").value||"").toLowerCase(),a=JSON.parse(localStorage.getItem(KEY)||"[]").filter(x=>(x.no+" "+x.customer+" "+x.project).toLowerCase().includes(q));$("ilist").innerHTML=a.map(row).join("")||"No invoices found."}
function renderCustomers(){let q=($("csearch").value||"").toLowerCase(),a=JSON.parse(localStorage.getItem(KEY)||"[]"),m={};a.forEach(x=>{if(x.customer)m[x.customer]=x});$("clist").innerHTML=Object.values(m).filter(x=>x.customer.toLowerCase().includes(q)).map(x=>`<div class="row"><div><b>${x.customer}</b><br>${x.phone||""}<br>${x.email||""}</div><button onclick="open('${x.id}')">Open</button></div>`).join("")||"No customers found."}
function dash(){let a=JSON.parse(localStorage.getItem(KEY)||"[]"),b=a.reduce((s,x)=>s+x.items.reduce((z,i)=>z+i.qty*i.unit,0),0),r=a.reduce((s,x)=>s+x.received,0);$("si").textContent=a.length;$("sb").textContent=money(b);$("sr").textContent=money(r);$("so").textContent=money(Math.max(0,b-r));$("recent").innerHTML=a.slice(0,5).map(row).join("")||"No invoices yet."}
function settingsSave(){localStorage.setItem("PB_SETTINGS",JSON.stringify({name:$("sname").value,email:$("semail").value,wa:$("swa").value,phone:$("sphone").value,acc:$("sacc").value,sort:$("ssort").value,num:$("snum").value}));toast("Settings saved")}
function loadSettings(){let s=JSON.parse(localStorage.getItem("PB_SETTINGS")||'{"name":"Perfect Builder Contractor Ltd","email":"info@perfectbuilder.uk","wa":"+44 7391 931969","phone":"07391 931969 | 03301 338689","acc":"Perfect Building Contractor Ltd","sort":"23-08-01","num":"27126829"}');$("sname").value=s.name;$("semail").value=s.email;$("swa").value=s.wa;$("sphone").value=s.phone;$("sacc").value=s.acc;$("ssort").value=s.sort;$("snum").value=s.num}
function printIt(){draft();window.print()}function toast(x){$("toast").textContent=x;$("toast").style.display="block";setTimeout(()=>$("toast").style.display="none",1600)}
$("received").oninput=()=>{calc();draft()};document.addEventListener("input",e=>{if(e.target.closest("#new"))draft()});window.onbeforeunload=draft;
(function(){let d=JSON.parse(localStorage.getItem(DRAFT)||"null");if(d)load(d);else newInvoice();loadSettings();dash()})()

/* ---------- CLOUD SYNC EXTENSION ----------
   Add your Supabase URL + anon key in Settings.
   SQL schema is in supabase.sql.
*/
const PB_CLOUD_KEY="PB_CLOUD_CONFIG";
function getCloudConfig(){try{return JSON.parse(localStorage.getItem(PB_CLOUD_KEY)||"null")}catch(e){return null}}
function saveCloudConfig(c){localStorage.setItem(PB_CLOUD_KEY,JSON.stringify(c))}
async function cloudHeaders(){
  const c=getCloudConfig();
  if(!c?.url||!c?.anonKey) throw new Error("Cloud database is not configured.");
  return {"apikey":c.anonKey,"Authorization":"Bearer "+c.anonKey,"Content-Type":"application/json","Prefer":"return=representation"};
}
async function cloudListInvoices(){
  const c=getCloudConfig(); if(!c?.url||!c?.anonKey) return null;
  const r=await fetch(c.url.replace(/\/$/,"")+"/rest/v1/invoices?select=*&order=created_at.desc",{headers:await cloudHeaders()});
  if(!r.ok) throw new Error(await r.text()); return await r.json();
}
async function cloudUpsertInvoice(x){
  const c=getCloudConfig(); if(!c?.url||!c?.anonKey) return null;
  const body={id:String(x.id),invoice_no:x.no,invoice_json:x,updated_at:new Date().toISOString()};
  const r=await fetch(c.url.replace(/\/$/,"")+"/rest/v1/invoices?on_conflict=id",{method:"POST",headers:{...(await cloudHeaders()),"Prefer":"resolution=merge-duplicates,return=representation"},body:JSON.stringify(body)});
  if(!r.ok) throw new Error(await r.text()); return await r.json();
}
async function cloudDeleteInvoice(id){
  const c=getCloudConfig(); if(!c?.url||!c?.anonKey) return;
  const r=await fetch(c.url.replace(/\/$/,"")+"/rest/v1/invoices?id=eq."+encodeURIComponent(id),{method:"DELETE",headers:await cloudHeaders()});
  if(!r.ok) throw new Error(await r.text());
}
async function cloudSyncDown(){
  const rows=await cloudListInvoices(); if(!rows) return;
  const a=rows.map(r=>r.invoice_json);
  localStorage.setItem(KEY,JSON.stringify(a));
  const first=a[0]; if(first) localStorage.setItem(DRAFT,JSON.stringify(first));
  dash(); if(typeof renderInvoices==="function")renderInvoices(); if(typeof renderCustomers==="function")renderCustomers();
}
async function cloudSyncUp(){
  const c=getCloudConfig(); if(!c?.url||!c?.anonKey) return;
  const a=JSON.parse(localStorage.getItem(KEY)||"[]");
  for(const x of a) await cloudUpsertInvoice(x);
}
