async function getProducts() {
  const productsResponse = await fetch("https://fakestoreapi.com/products");
  const productsData = await productsResponse.json();
  return productsData;
}
async function productsRender() {
  // gelen datayı burda düzenlenmesi bekleyerek products içine atıyoruz ve bu fonksiyonun içinde kullanmaya devam ediyoruz
  const products = await getProducts();
}

productsRender();

// Best Selling Products Section Start
const likeEffect = document.getElementsByClassName("fa-heart");

likeEffect.addEventListener("click", () => {
  if (likeEffect.style.color === "darkred") {
    likeEffect.style.color = "default";
  } else { 
    likeEffect.style.color = "darkred";
  }
});
