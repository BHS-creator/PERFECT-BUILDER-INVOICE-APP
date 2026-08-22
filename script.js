document.addEventListener("DOMContentLoaded",()=>{
  const year=document.getElementById("year");
  if(year) year.textContent=new Date().getFullYear();
  const toggle=document.querySelector(".menu-toggle");
  const nav=document.querySelector(".nav");
  if(toggle&&nav) toggle.addEventListener("click",()=>nav.classList.toggle("open"));
  const params=new URLSearchParams(location.search);
  const service=params.get("service");
  const select=document.querySelector('select[name="service"]');
  if(service&&select){
    [...select.options].forEach(o=>{if(o.text.toLowerCase().includes(service.toLowerCase())) select.value=o.text});
  }
});