document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("basket-items-container");
  const template = document.getElementById("basket-template");
  const totalEl = document.getElementById("total");
  const checkoutBtn = document.getElementById("checkout-btn");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function renderCart() {
    container.innerHTML = "";
    let total = 0;

    cart.forEach((game, index) => {
      const clone = template.cloneNode(true);
      clone.style.display = "flex";
      clone.removeAttribute("id");

      clone.querySelector(".basket-img").src = game.img;
      clone.querySelector(".basket-img").alt = game.name;
      clone.querySelector(".basket-name").textContent = game.name;
      clone.querySelector(".basket-price").textContent = "₴" + game.price;

      
      clone.querySelector(".remove-btn").addEventListener("click", () => {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
      });

      container.appendChild(clone);
      clone.style.marginBottom = "20px";
      total += game.price;
    });

    totalEl.textContent = total + "₴";
  }

  renderCart();

  
  checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Ваш кошик порожній!");
      return;
    }

    let orderSummary = "Ви замовили:\n\n";
    cart.forEach(game => {
      orderSummary += `${game.name} - ₴${game.price}\n`;
    });

    const total = cart.reduce((sum, game) => sum + game.price, 0);
    orderSummary += `\nСума до оплати: ₴${total}`;

    alert(orderSummary);


    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  });
});
