async function getProducts() {
  const productsResponse = await fetch("https://fakestoreapi.com/products");
  const productsData = await productsResponse.json();
  return productsData;
}
async function productsRender() {
  // gelen datayı burda düzenlenmesi bekleyerek products içine atıyoruz ve bu fonksiyonun içinde kullanmaya devam ediyoruz
  const products = await getProducts();

  localStorage.setItem("cartProducts", JSON.stringify(products));

  const productTableBody = document.getElementById("productTableBody");

  products.forEach(product => {
    const productRow = document.createElement("tr");
    productRow.classList.add("table-row");

    const limitedTitle = product.title.length > 20 ? product.title.substring(0, 20) + '...' : product.title;

    productRow.innerHTML = `
      <td class="table-product-name">
        <img src="${product.image}" alt="${product.title}"> 
        <p class="product-name">${limitedTitle}</p>
      </td>
      <td class="table-price">$${product.price}</td>
      <td class="table-quantity-container">
        <p class="table-quantity-value">1</p>
        <div class="quantity-buttons">
          <button class="quantity-button">
            <img id="quantityIncrease" src="images/arrow-vector.png">
          </button>
          <button class="quantity-button">
            <img id="quantityDecrease" src="images/arrow-vector.png">
          </button>
        </div>
      </td>
      <td class="table-subtotal">$${product.price}</td>
    `;

    productTableBody.appendChild(productRow);
  });

  const quantityIncrease = document.querySelectorAll("#quantityIncrease"); 
  const quantityDecrease = document.querySelectorAll("#quantityDecrease"); 

  quantityIncrease.forEach(button => {
    button.addEventListener("click", event => {
      const quantityValueElement = event.target.closest("td").querySelector(".table-quantity-value");
      let quantityValue = parseInt(quantityValueElement.innerText);
      quantityValueElement.innerText = quantityValue + 1;

      const priceElement = event.target.closest("tr").querySelector(".table-price");
      const price = parseFloat(priceElement.innerText.replace('$', ''));
      const totalProductPrice = event.target.closest("tr").querySelector(".table-subtotal");
      totalProductPrice.innerText = `$${((quantityValue + 1) * price).toFixed(2)}`;
      updateTotalSum();


    });
  });

  quantityDecrease.forEach(button => {
    button.addEventListener("click", event => {
      const quantityValueElement = event.target.closest("td").querySelector(".table-quantity-value");
      let quantityValue = parseInt(quantityValueElement.innerText);
      if (quantityValue > 0) {
        quantityValueElement.innerText = quantityValue - 1;
        const priceElement = event.target.closest("tr").querySelector(".table-price");
        const price = parseFloat(priceElement.innerText.replace('$', ''));
        const totalProductPrice = event.target.closest("tr").querySelector(".table-subtotal");
        totalProductPrice.innerText = `$${((quantityValue - 1) * price).toFixed(2)}`;
        updateTotalSum();
      }
    });
  });
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
}

document.querySelector('.coupon-button').addEventListener('click', function() {
  const couponCode = document.getElementById('couponInput').value;
  const subtotalElement = document.getElementById('totalSumProducts');
  const totalPriceElement = document.getElementById('totalPrice');
  const subtotal = parseFloat(subtotalElement.innerText.replace('$', ''));

  if (couponCode === 'COUPON20') {
    const discountPrice = subtotal - (subtotal * 0.20);
    totalPriceElement.innerText = `$${discountPrice.toFixed(2)}`; 
  } else {
    totalPriceElement.innerText = `$${subtotal.toFixed(2)}`; 
  }
});

productsRender();

