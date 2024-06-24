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
document.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById('exprocontainer');
  const products = document.getElementById('products');
  const leftButton = document.getElementById('leftbuton');
  const rightButton = document.getElementById('rightbuton');
  const showAllButton = document.getElementById('showAllButton');

  let currentTranslate = 0;
  const productWidth = 120; // Ürün genişliği + margin
  const totalProductWidth = products.children.length * productWidth;
  const containerWidth = container.clientWidth;
  const maxTranslate = containerWidth - totalProductWidth;

  leftButton.addEventListener('click', function() {
      if (currentTranslate < 0) {
          currentTranslate += productWidth;
          products.style.transform = `translateX(${currentTranslate}px)`;
      }
  });

  rightButton.addEventListener('click', function() {
      if (currentTranslate > maxTranslate) {
          currentTranslate -= productWidth;
          products.style.transform = `translateX(${currentTranslate}px)`;
      }
  });
});