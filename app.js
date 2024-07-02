async function getProducts() {
  const productsResponse = await fetch("https://fakestoreapi.com/products");
  const productsData = await productsResponse.json();
  return productsData;
}

async function productsRender() {
  const products = await getProducts();

  const selectedProducts = products.slice(0, 4);

  const ürünListe = document.getElementById("ürün-liste");

  selectedProducts.forEach((product) => {
    const ürünKart = `
      <div class="ürün-kart">
      <div class="img-box">
        <img class="ürün-images" src="${product.image}" alt="${product.title}">
      </div>
        
        <div><p class="ürün-bilgi">${product.title
          .substring(0, 20)
          .concat(" ...")} </p>
    </div>
        <p class="fiyat">$${product.price}</p>
      </div>
    `;
    ürünListe.innerHTML += ürünKart;
  });
}

productsRender();

function startCountdown() {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 4);

  setInterval(function () {
    const currentDate = new Date();
    const difference = targetDate - currentDate;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById("todays-countdown-days").innerHTML = days + " :";
    document.getElementById("todays-countdown-hours").innerHTML = hours + " :";
    document.getElementById("todays-countdown-minutes").innerHTML =
      minutes + " :";
    document.getElementById("todays-countdown-seconds").innerHTML = seconds;
  });
}

startCountdown();
