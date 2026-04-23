let cart = JSON.parse(localStorage.getItem("cart")) || [];

// 👉 Replace with your WhatsApp number
let phoneNumber = "91XXXXXXXXXX";

// Save cart
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Buy single product
function buyNow(name, price, qtyId, inStock) {
  if (!inStock) {
    alert("This product is out of stock!");
    return;
  }

  let qty = document.getElementById(qtyId).value;

  let message = `🛍️ Order Details:%0AProduct: ${name}%0APrice: ₹${price}%0AQuantity: ${qty}`;

  sendWhatsApp(message);
}

// Add to cart
function addToCart(name, price, qtyId, inStock) {
  if (!inStock) {
    alert("This product is out of stock!");
    return;
  }

  let qty = document.getElementById(qtyId).value;

  cart.push({
    name,
    price,
    qty
  });

  saveCart();
  displayCart();
}

// Display cart
function displayCart() {
  let list = document.getElementById("cartList");
  list.innerHTML = "";

  cart.forEach(item => {
    let li = document.createElement("li");
    li.innerText = `${item.name} - ₹${item.price} x ${item.qty}`;
    list.appendChild(li);
  });
}

// Buy all cart items
function buyCart() {
  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }

  let message = "🛍️ Order Details:%0A";

  cart.forEach(item => {
    message += `${item.name} - ₹${item.price} x ${item.qty}%0A`;
  });

  sendWhatsApp(message);

  cart = [];
  saveCart();
  displayCart();
}

// WhatsApp redirect
function sendWhatsApp(message) {
  let url = `https://wa.me/${phoneNumber}?text=${message}`;
  window.open(url, "_blank");
}

// Load cart on page load
window.onload = displayCart;