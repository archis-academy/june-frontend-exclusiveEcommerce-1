async function getProducts() {
  const productsResponse = await fetch("https://fakestoreapi.com/products");
  const productsData = await productsResponse.json();
  return productsData;
}
async function productsRender() {
  // gelen datayı burda düzenlenmesi bekleyerek products içine atıyoruz ve bu fonksiyonun içinde kullanmaya devam ediyoruz
  
  let products = JSON.parse(localStorage.getItem("cartProducts"));
  if (!products) {
    products = await getProducts();
    localStorage.setItem("cartProducts", JSON.stringify(products));
  }

  const productTableBody = document.getElementById("productTableBody");

  products.forEach(product => {
    const productRow = document.createElement("tr");
    productRow.classList.add("table-row");  
    productRow.setAttribute('data-product-id', product.id);

    const limitedTitle = product.title.length > 20 ? product.title.substring(0, 20) + '...' : product.title;

    productRow.innerHTML = `
      <td class="table-product-name">
        <button onclick="deleteProduct(${product.id})"  class="delete-product-btn">X</button>
        <img class="table-product-img" src="${product.image}" alt="${product.title}"> 
        <p class="product-name">${limitedTitle}</p>
      </td>
      <td class="table-price">$${product.price}</td>
      <td class="table-quantity-container">
        <p class="table-quantity-value">1</p>
        <div class="quantity-buttons">
          <button onclick="quantityIncrease(${product.id})" class="quantity-button">
            <img src="images/arrow-vector.png">
          </button>
          <button onclick="quantityDecrease(${product.id})" class="quantity-button">
            <img id="quantityDecrease" src="images/arrow-vector.png">
          </button>
        </div>
      </td>
      <td class="table-subtotal">$${product.price}</td>
    `;

    productTableBody.appendChild(productRow);
    });

    updateTotalSum();
}

function deleteProduct(productId) {
  const rowElement = document.querySelector(`tr[data-product-id="${productId}"]`);
  rowElement.remove();
  let cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [] ; 
  cartProducts = cartProducts.filter(product => product.id !== productId);
  localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  productsRender();
}

function quantityDecrease (productId) {
  const rowElement = document.querySelector(`tr[data-product-id="${productId}"]`);
  const quantityValueElement = rowElement.querySelector(".table-quantity-value");
  let quantityValue = parseInt(quantityValueElement.innerText);
  if (quantityValue > 1) {
    quantityValueElement.innerText = quantityValue - 1;
    const priceElement = rowElement.querySelector(".table-price");
    const price = parseFloat(priceElement.innerText.replace('$', ''));
    const totalProductPrice = rowElement.querySelector(".table-subtotal");
    totalProductPrice.innerText = `$${((quantityValue - 1) * price).toFixed(2)}`;
    updateTotalSum();
  }
}

function quantityIncrease (productId) {
  const rowElement = document.querySelector(`tr[data-product-id="${productId}"]`);
  const quantityValueElement = rowElement.querySelector(".table-quantity-value");
  let quantityValue = parseInt(quantityValueElement.innerText);
  quantityValueElement.innerText = quantityValue + 1;
  const priceElement = rowElement.querySelector(".table-price");
  const price = parseFloat(priceElement.innerText.replace('$', ''));
  const totalProductPrice = rowElement.querySelector(".table-subtotal");
  totalProductPrice.innerText = `$${((quantityValue + 1) * price).toFixed(2)}`;
  updateTotalSum();
}

function updateTotalSum () {
  const subtotalTable = document.querySelectorAll(".table-subtotal");
  let totalSumTable = 0;
  
  subtotalTable.forEach(subtotalElement => {
    const subtotal = parseFloat(subtotalElement.innerText.replace('$', ''));
    totalSumTable += subtotal;
  });

  const totalSumProducts = document.getElementById("totalSumProducts");
  totalSumProducts.innerText = `$${totalSumTable.toFixed(2)}`;

  const totalPrice = document.getElementById("totalPrice");
  totalPrice.innerText = `$${totalSumTable.toFixed(2)}`;
}

document.querySelector('.coupon-button').addEventListener('click', function() {
  const couponCode = document.getElementById('couponInput').value;
  const subtotalElement = document.getElementById('totalSumProducts');
  const totalPriceElement = document.getElementById('totalPrice');
  const subtotal = parseFloat(subtotalElement.innerText.replace('$', ''));
  const discountQuantity = subtotal * 0.20;

  if (couponCode === 'COUPON20') {
    const discountPrice = subtotal - discountQuantity;
    totalPriceElement.innerText = `$${discountPrice.toFixed(2)}`; 
    document.getElementById('discount').innerText = `$${discountQuantity.toFixed(2)}`;
  } else {
    totalPriceElement.innerText = `$${subtotal.toFixed(2)}`; 
    document.getElementById('discount').innerText = `$0`;
  }
});

productsRender();

