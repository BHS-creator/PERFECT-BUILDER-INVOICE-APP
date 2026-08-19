const menu=document.getElementById("menu"),nav=document.getElementById("nav");
menu.addEventListener("click",()=>nav.classList.toggle("open"));
document.querySelectorAll('#nav a[href^="#"]').forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));
document.getElementById("quoteForm").addEventListener("submit",e=>{
  e.preventDefault();
  const f=e.currentTarget, d=new FormData(f);
  const text=`Name: ${d.get("name")}\nEmail: ${d.get("email")}\nPhone: ${d.get("phone")}\nAddress: ${d.get("address")}\nWork: ${d.get("work")}\nSource: ${d.get("source")}\nMessage: ${d.get("message")}`;
  document.getElementById("formMsg").textContent="Thank you. Your enquiry has been prepared. Please contact us directly to complete submission.";
  // No backend is assumed on GitHub Pages.
});
window.scrollTo(0,0);
if("scrollRestoration" in history) history.scrollRestoration="manual";
