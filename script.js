const products=[
{id:1,name:"Premium Basmati Rice",cat:"Grocery",price:650,old:720,emoji:"🍚",tag:"POPULAR"},
{id:2,name:"Cooking Oil 1L",cat:"Grocery",price:590,old:640,emoji:"🫗",tag:"DEAL"},
{id:3,name:"Assorted Biscuits Pack",cat:"Snacks",price:280,old:320,emoji:"🍪",tag:"POPULAR"},
{id:4,name:"Potato Crisps",cat:"Snacks",price:180,old:210,emoji:"🥔",tag:""},
{id:5,name:"Cola Drink 1.5L",cat:"Drinks",price:220,old:250,emoji:"🥤",tag:"DEAL"},
{id:6,name:"Fresh Juice",cat:"Drinks",price:190,old:220,emoji:"🧃",tag:"NEW"},
{id:7,name:"Laundry Detergent",cat:"Household",price:780,old:850,emoji:"🧺",tag:""},
{id:8,name:"Multi-Purpose Cleaner",cat:"Household",price:390,old:450,emoji:"🧴",tag:"DEAL"},
{id:9,name:"Shampoo 400ml",cat:"Personal Care",price:620,old:690,emoji:"🧴",tag:"POPULAR"},
{id:10,name:"Bath Soap Pack",cat:"Personal Care",price:260,old:300,emoji:"🧼",tag:""},
{id:11,name:"Tea 950g",cat:"Grocery",price:1250,old:1350,emoji:"🍵",tag:"POPULAR"},
{id:12,name:"Chocolate Bar",cat:"Snacks",price:160,old:190,emoji:"🍫",tag:"NEW"}
];
let cart=JSON.parse(localStorage.getItem("bhsCart")||"[]"), currentCat="All";
const productsEl=document.querySelector("#products"), countEl=document.querySelector("#resultCount");
function money(n){return "Rs. "+n.toLocaleString("en-PK")}
function render(list=products){
  productsEl.innerHTML=list.length?list.map(p=>`<article class="product"><div class="product-img">${p.tag?`<span class="badge">${p.tag}</span>`:""}${p.emoji}</div><h3>${p.name}</h3><small>${p.cat}</small><div class="price"><div><b>${money(p.price)}</b> <s>${money(p.old)}</s></div><button class="add" onclick="addCart(${p.id})">+ Cart</button></div></article>`).join(""):`<p>No products found.</p>`;
  countEl.textContent=`${list.length} products`;
}
function filter(cat){
 currentCat=cat;
 document.querySelectorAll(".cat").forEach(b=>b.classList.toggle("active",b.dataset.cat===cat));
 const q=document.querySelector("#searchInput").value.toLowerCase();
 render(products.filter(p=>(cat==="All"||cat==="Offers"?(cat==="Offers"?p.old>p.price:p.cat===p.cat):p.cat===cat)&&p.name.toLowerCase().includes(q)));
 document.querySelector("#shop").scrollIntoView({behavior:"smooth"});
}
document.querySelectorAll("[data-cat]").forEach(b=>b.addEventListener("click",()=>filter(b.dataset.cat)));
document.querySelector("#searchInput").addEventListener("input",()=>{const q=document.querySelector("#searchInput").value.toLowerCase();render(products.filter(p=>(currentCat==="All"||p.cat===currentCat)&&p.name.toLowerCase().includes(q)))});
document.querySelector("#shopNow").onclick=()=>document.querySelector("#shop").scrollIntoView({behavior:"smooth"});
document.querySelector("#viewAll").onclick=()=>filter("All");
function addCart(id){const item=cart.find(x=>x.id===id);item?item.qty++:cart.push({id,qty:1});save();openCart()}
function save(){localStorage.setItem("bhsCart",JSON.stringify(cart));renderCart()}
function renderCart(){
 document.querySelector("#cartCount").textContent=cart.reduce((s,x)=>s+x.qty,0);
 const el=document.querySelector("#cartItems");
 if(!cart.length){el.innerHTML='<div style="text-align:center;padding:70px 10px;color:#8a948e">🛒<h3 style="margin-top:12px">Your cart is empty</h3><p style="font-size:12px;margin-top:6px">Add something you like.</p></div>'}
 else el.innerHTML=cart.map(x=>{const p=products.find(y=>y.id===x.id);return `<div class="cart-item"><div class="pic">${p.emoji}</div><div style="flex:1"><h4>${p.name}</h4><small>${money(p.price)}</small><div class="qty"><button onclick="changeQty(${p.id},-1)">−</button><b>${x.qty}</b><button onclick="changeQty(${p.id},1)">+</button><button onclick="removeCart(${p.id})" style="margin-left:auto;background:none;color:#a66">Remove</button></div></div></div>`}).join("");
 document.querySelector("#cartTotal").textContent=money(cart.reduce((s,x)=>s+products.find(p=>p.id===x.id).price*x.qty,0));
}
function changeQty(id,n){const x=cart.find(i=>i.id===id);x.qty+=n;if(x.qty<=0)cart=cart.filter(i=>i.id!==id);save()}
function removeCart(id){cart=cart.filter(i=>i.id!==id);save()}
function openCart(){document.querySelector("#cartPanel").classList.add("open");document.querySelector("#overlay").classList.add("show")}
function closeCart(){document.querySelector("#cartPanel").classList.remove("open");document.querySelector("#overlay").classList.remove("show")}
document.querySelector("#cartOpen").onclick=openCart;document.querySelector("#cartClose").onclick=closeCart;document.querySelector("#overlay").onclick=closeCart;
document.querySelector("#checkout").onclick=()=>{if(!cart.length)return alert("Your cart is empty.");document.querySelector("#checkoutModal").classList.add("show");closeCart()};
document.querySelector("#modalClose").onclick=()=>document.querySelector("#checkoutModal").classList.remove("show");
document.querySelector("#orderForm").onsubmit=e=>{e.preventDefault();document.querySelector("#success").classList.add("show");cart=[];save();setTimeout(()=>{document.querySelector("#checkoutModal").classList.remove("show");document.querySelector("#success").classList.remove("show");e.target.reset()},2500)};
render();renderCart();