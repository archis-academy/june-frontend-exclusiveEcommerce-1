async function getProducts() {
  const productsResponse = await fetch("https://fakestoreapi.com/products");
  const productsData = await productsResponse.json();
  return productsData;
}
async function productsRender() {
  // gelen datayı burda düzenlenmesi bekleyerek products içine atıyoruz ve bu fonksiyonun içinde kullanmaya devam ediyoruz
  const products = await getProducts();
}

document.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById('exprocontainer');
  const products = document.getElementById('products');
  const leftButton = document.getElementById('leftbuton');
  const rightButton = document.getElementById('rightbuton');
  const viewAllButton = document.querySelector('.btn-view-prd');

  let currentTranslate = 0;
  const productWidth = 140; // Ürün genişliği + margin
  const productsVisible = 4; // Görünen ürün sayısı
  const totalProducts = products.children.length;
  const maxTranslate = -(totalProducts - productsVisible) * productWidth;

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

  viewAllButton.addEventListener('click', function() {
      const isExpanded = products.style.flexDirection === 'column';
      products.style.flexDirection = isExpanded ? 'row' : 'column';
      products.style.flexWrap = isExpanded ? 'nowrap' : 'wrap';
      products.style.overflow = isExpanded ? 'hidden' : 'visible';
      products.style.height = isExpanded ? 'auto' : 'auto';
  });
});
