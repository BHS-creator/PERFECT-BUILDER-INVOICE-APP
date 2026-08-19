const nav=document.querySelector("nav"),hamb=document.querySelector(".hamburger");
hamb.addEventListener("click",()=>nav.classList.toggle("open"));
document.querySelectorAll("nav a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));
const drop=document.querySelector(".drop");
if(drop) drop.querySelector("button").addEventListener("click",()=>drop.classList.toggle("open"));
const form=document.querySelector("#quoteForm");
form.addEventListener("submit",e=>{
  e.preventDefault();
  const msg=document.querySelector("#msg");
  if(!form.checkValidity()){msg.textContent="Please complete all required fields.";msg.style.color="#a33";form.reportValidity();return;}
  msg.textContent="Your enquiry is ready to be connected to your email/form service.";
  msg.style.color="#5b7e45";
});