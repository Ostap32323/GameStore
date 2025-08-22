document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".search-cart input");
  const gameBlocks = document.querySelectorAll("section.game-block");

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();

    gameBlocks.forEach(block => {
      const titleEl = block.querySelector(".game-title"); 
      if (!titleEl) return;

      const title = titleEl.textContent.toLowerCase();
      if (title.includes(query)) {
        block.style.display = "block"; 
      } else {
        block.style.display = "none"; 
      }
    });
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const buyButtons = document.querySelectorAll(".center-button button");

  buyButtons.forEach(button => {
    button.addEventListener("click", () => {
      const gameBlock = button.closest("section.game-block");
      if (!gameBlock) return;

      const nameEl = gameBlock.querySelector(".game-title");
      const imgEl = gameBlock.querySelector("img");
      const priceText = button.textContent.replace(/\D/g, ""); 

      if (!nameEl || !imgEl || !priceText) return;

      const game = {
        name: nameEl.textContent,
        img: imgEl.src,
        price: parseFloat(priceText)
      };

      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(game);
      localStorage.setItem("cart", JSON.stringify(cart));

      window.location.href = "basket.html";
    });
  });
});








