(() => {
"use strict";
const cfg=window.EVARA_CONFIG||{}, price=Number(cfg.productPrice||450), name=cfg.productName||"EVARA Ayurvedic Period Wellness Blend";
const $=id=>document.getElementById(id), money=n=>`${cfg.currency||"Rs."} ${Number(n).toLocaleString("en-LK")}`;
let qty=1, cart=0;
try { cart=Math.max(0,Math.min(99,Number(localStorage.getItem("evaraCart")||0))); } catch(e) {}
function saveCart(){try{localStorage.setItem("evaraCart",String(cart));}catch(e){}}
function toast(msg){const e=$("toast");if(!e)return;e.textContent=msg;e.classList.add("show");setTimeout(()=>e.classList.remove("show"),2600)}
function openLink(kind){
 let target=kind==="channel"?(cfg.whatsappChannelUrl||""):(cfg.whatsappBusinessUrl||"");
 if(!target && kind!=="channel"){const n=(cfg.whatsappNumber||"").replace(/\D/g,"");target=n&&!n.includes("REPLACE")?`https://wa.me/${n}`:""}
 if(!target||target.includes("REPLACE")){toast("Please configure the WhatsApp link in config.js.");return}
 window.open(target,"_blank","noopener,noreferrer");
}
function order(q){
 const target=cfg.whatsappBusinessUrl||"";
 if(!target){openLink("business");return}
 const quantity=Math.max(1,Math.min(99,Number(q)||1));
 const subtotal=quantity*price;
 const msg=`Hello EVARA! I'd like to place an order enquiry.\n\nProduct: ${name}\nPack size: 10 tea bags per pack\nQuantity: ${quantity} pack(s)\nPrice per pack: ${money(price)}\nProduct subtotal: ${money(subtotal)}\n\nPlease confirm stock availability, delivery charges, delivery/collection options, and available payment methods before finalising my order.`;
 // Prefill the WhatsApp message. For the most reliable prefill, config.js can use a direct https://wa.me/<phone-number> link; the current EVARA short link is retained as configured.
 const separator=target.includes("?")?"&":"?";
 window.open(`${target}${separator}text=${encodeURIComponent(msg)}`,"_blank","noopener,noreferrer");
}
function render(){
 const count=$("count"), heroCount=$("heroCount"), total=$("total"), items=$("items");
 if(count)count.textContent=cart;if(heroCount)heroCount.textContent=cart;if(total)total.textContent=money(cart*price);
 if(items){
  items.innerHTML=cart?`<div class="cartitem"><div><strong>${name}</strong><small>10 tea bags · ${money(price)} each</small></div><div class="item-controls"><button id="dec" aria-label="Decrease quantity">−</button><b>${cart}</b><button id="inc" aria-label="Increase quantity">+</button><button class="remove" id="remove">Remove</button></div></div>`:'<div class="empty-cart"><div class="empty-icon">♡</div><h3>Your bag is waiting</h3><p>Add EVARA Wellness Blend to begin your order.</p><a class="btn outline full" href="product.html">Explore the blend</a></div>';
  if($("dec"))$("dec").onclick=()=>{cart=Math.max(0,cart-1);saveCart();render()};
  if($("inc"))$("inc").onclick=()=>{cart=Math.min(99,cart+1);saveCart();render()};
  if($("remove"))$("remove").onclick=()=>{cart=0;saveCart();render();toast("Item removed from your bag.")};
 }
}
if($("minus"))$("minus").onclick=()=>{qty=Math.max(1,qty-1);if($("qty"))$("qty").textContent=qty};
if($("plus"))$("plus").onclick=()=>{qty=Math.min(99,qty+1);if($("qty"))$("qty").textContent=qty};
if($("add"))$("add").onclick=()=>{cart=Math.min(99,cart+qty);saveCart();render();toast(`${qty} pack(s) added to your bag.`)};
if($("buy"))$("buy").onclick=()=>order(qty);
["chat","chat2"].forEach(id=>{if($(id))$(id).onclick=()=>openLink("business")});
["channel","channel2"].forEach(id=>{if($(id))$(id).onclick=()=>openLink("channel")});
if($("footchat"))$("footchat").onclick=e=>{e.preventDefault();openLink("business")};
if($("footchannel"))$("footchannel").onclick=e=>{e.preventDefault();openLink("channel")};
if($("openCart"))$("openCart").onclick=()=>{if($("overlay"))$("overlay").classList.add("open")};
if($("heroCart"))$("heroCart").onclick=()=>{if($("overlay"))$("overlay").classList.add("open")};
if($("close"))$("close").onclick=()=>{if($("overlay"))$("overlay").classList.remove("open")};
if($("overlay"))$("overlay").onclick=e=>{if(e.target===$("overlay"))$("overlay").classList.remove("open")};
if($("checkout"))$("checkout").onclick=()=>{if(!cart){toast("Your bag is empty. Add a pack first.");return}order(cart)};
if($("menu"))$("menu").onclick=()=>{const nav=$("nav");if(!nav)return;const open=nav.classList.toggle("open");$("menu").setAttribute("aria-expanded",String(open))};
if($("nav"))$("nav").querySelectorAll("a").forEach(a=>a.onclick=()=>{ $("nav").classList.remove("open");if($("menu"))$("menu").setAttribute("aria-expanded","false")});
if($("year"))$("year").textContent=new Date().getFullYear();
render();
})();