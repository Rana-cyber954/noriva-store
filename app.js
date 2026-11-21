const WHATSAPP_NUMBER = "917082207111";
const SHIPPING_CHARGE = 70;
const FREE_SHIPPING_THRESHOLD = 699;
let cart = [];
const $ = id => document.getElementById(id);
const money = n => `₹${Number(n).toLocaleString("en-IN")}`;

function renderProducts(){
  $("productGrid").innerHTML = PRODUCTS.map(p => `<article class="product-card"><div class="product-image" ${p.image ? `style="background-image:url('${p.image}');background-size:cover;background-position:center"` : ""}><span class="product-mark">NORIVA · ${p.id}</span></div><div class="product-info"><h3>${escapeHtml(p.name)}</h3><p>${escapeHtml(p.description)}</p><div class="product-foot"><span class="price">${money(p.price)}</span><button class="add-btn" onclick="addToCart('${p.id}')">ADD TO BAG +</button></div></div></article>`).join("");
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function subtotal(){return cart.reduce((s,i)=>s+i.price*i.qty,0)}
function shipping(){return subtotal()===0||subtotal()>=FREE_SHIPPING_THRESHOLD?0:SHIPPING_CHARGE}
function addToCart(id){const p=PRODUCTS.find(x=>x.id===id);if(!p)return;const found=cart.find(x=>x.id===id);found?found.qty++:cart.push({...p,qty:1});renderCart();openCart();}
function changeQty(id,delta){const item=cart.find(x=>x.id===id);if(!item)return;item.qty+=delta;if(item.qty<=0)cart=cart.filter(x=>x.id!==id);renderCart();}
function renderCart(){
  $("cartCount").textContent=cart.reduce((s,i)=>s+i.qty,0);
  $("cartItems").innerHTML=cart.length?cart.map(i=>`<div class="cart-row"><div><strong>${escapeHtml(i.name)}</strong><small>${money(i.price)} each</small></div><div class="qty"><button onclick="changeQty('${i.id}',-1)">−</button><span>${i.qty}</span><button onclick="changeQty('${i.id}',1)">+</button></div></div>`).join(""):'<p class="empty">Your bag is waiting for something beautiful.</p>';
  $("subtotal").textContent=money(subtotal());
  $("shippingNote").textContent=subtotal()>=FREE_SHIPPING_THRESHOLD?"You qualify for free shipping.":`Shipping ${money(SHIPPING_CHARGE)} · Free above ${money(FREE_SHIPPING_THRESHOLD)}`;
  $("checkoutBtn").disabled=!cart.length;$("checkoutBtn").style.opacity=cart.length?1:.45;
}
function openCart(){$("cartDrawer").classList.add("open");$("backdrop").classList.add("show")}
function closeCart(){$("cartDrawer").classList.remove("open");$("backdrop").classList.remove("show")}
function openCheckout(){if(!cart.length)return;closeCart();$("checkoutSummary").textContent=`Subtotal ${money(subtotal())} · Shipping ${money(shipping())}`;$("checkoutTotal").textContent=`Total ${money(subtotal()+shipping())}`;$("checkoutModal").classList.add("show")}
function closeCheckout(){$("checkoutModal").classList.remove("show")}
$("checkoutForm").addEventListener("submit",e=>{
  e.preventDefault();if(!cart.length)return;
  const f=new FormData(e.currentTarget);const customer={name:f.get("name").trim(),phone:f.get("phone").trim(),address:f.get("address").trim(),city:f.get("city").trim(),state:f.get("state").trim(),pin:f.get("pin").trim(),payment:f.get("payment")};
  const lines=cart.map(i=>`• ${i.name} (${i.id}) x${i.qty} = ${money(i.price*i.qty)}`).join("\n");
  const order=`Hello NORIVA! I'd like to place an order.\n\n${lines}\n\nSubtotal: ${money(subtotal())}\nShipping: ${shipping()===0?"FREE":money(shipping())}\nTotal: ${money(subtotal()+shipping())}\n\nName: ${customer.name}\nPhone: ${customer.phone}\nAddress: ${customer.address}\nCity: ${customer.city}\nState: ${customer.state}\nPIN: ${customer.pin}\nPayment: ${customer.payment}\n\nPlease confirm my order.`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(order)}`,"_blank","noopener");
});
$("cartOpen").onclick=openCart;$("cartClose").onclick=closeCart;$("backdrop").onclick=closeCart;$("checkoutBtn").onclick=openCheckout;$("modalClose").onclick=closeCheckout;$("checkoutModal").addEventListener("click",e=>{if(e.target===$("checkoutModal"))closeCheckout()});$("year").textContent=new Date().getFullYear();
renderProducts();renderCart();
