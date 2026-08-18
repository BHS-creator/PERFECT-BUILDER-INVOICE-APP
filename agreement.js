const KEY="pbc_agreement_v1";
const ids=[
"agreementDate","clientName","projectAddress","agreementRef","contractPrice",
"priceIncludes","completion","clientSignName","clientSignature","clientSignDate",
"contractorSignature","contractorSignDate",
"scope1","scope2","scope3","scope4","scope5","scope6","scope7","scope8"
];

function todayISO(){
  const d=new Date();
  const off=d.getTimezoneOffset();
  return new Date(d.getTime()-off*60000).toISOString().slice(0,10);
}
function getData(){
  const data={};
  ids.forEach(id=>{
    const el=document.getElementById(id);
    if(el) data[id]=el.value;
  });
  return data;
}
function setData(data){
  ids.forEach(id=>{
    const el=document.getElementById(id);
    if(el && data[id]!==undefined) el.value=data[id];
  });
}
function saveAgreement(){
  localStorage.setItem(KEY,JSON.stringify(getData()));
  alert("Agreement saved.");
}
function newAgreement(){
  if(!confirm("Start a new agreement?")) return;
  localStorage.removeItem(KEY);
  location.reload();
}
function loadAgreement(){
  const saved=localStorage.getItem(KEY);
  if(saved){
    try{setData(JSON.parse(saved));return;}catch(e){}
  }
  const d=todayISO();
  document.getElementById("agreementDate").value=d;
  document.getElementById("agreementRef").value="PBC-"+d.replaceAll("-","");
  document.getElementById("clientSignDate").value=d;
  document.getElementById("contractorSignDate").value=d;
}
function preparePrint(){
  // Make blank optional fields disappear from the printed document.
  document.querySelectorAll("input,textarea").forEach(el=>{
    if(!el.value.trim() && el.id!=="contractPrice") el.classList.add("print-empty-field");
  });
  window.print();
}
window.addEventListener("afterprint",()=>{
  document.querySelectorAll(".print-empty-field").forEach(el=>el.classList.remove("print-empty-field"));
});
document.addEventListener("DOMContentLoaded",loadAgreement);

(function(){
  const originalPrint=window.print.bind(window);
  window.print=function(){
    const footer=document.querySelector(".agreement-footer");
    if(footer){
      footer.classList.add("print-last-footer");
    }
    originalPrint();
  };
})();
