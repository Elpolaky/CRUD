var productNameInput = document.getElementById("productName");
var productpriceInput = document.getElementById("productPrice");
var productCateogeryInput = document.getElementById("productCateogery");
var productImageInput = document.getElementById("productImage");
var productDesInput = document.getElementById("productDes");
var productSearchInput = document.getElementById("searchProduct");
var productAddBtnInput = document.getElementById("addBtn");
var productUpdBtnInput = document.getElementById("updateBtn");
var productSearchAlertInput = document.getElementById("noSearchAlert");
var productContainer = document.getElementById("products");
var productsAlert = document.getElementById("productsAlert");
var productsKeyValue = "Products";
var getProducts = JSON.parse(localStorage.getItem(productsKeyValue));
var productList = [];
(function () {
  if (getProducts) {
    productList = getProducts;
    displayProduct(productList);
    console.log(getProducts);
    productList.length
      ? productsAlert.classList.replace("alert-r", "alert-l")
      : productsAlert.classList.replace("alert-l", "alert-r");
  }
  // console.log(productList.length);
})();

function addProduct() {
  if (validationFormResult()) {
    productsAlert.classList.replace("alert-r", "alert-l");
    var product = {
      name: productNameInput.value,
      price: productpriceInput.value,
      cate: productCateogeryInput.value,
      image: `images/${productImageInput.files[0].name}`,
      dec: productDesInput.value,
      id: productList.length,
    };
    console.log(product.src);
    productList.push(product);
    localStorage.setItem(productsKeyValue, JSON.stringify(productList));
    console.log(productList);
    displayProduct(productList);
    clearForm();
  } else {
  }
}

function displayProduct(list) {
  var blackBox = "";
  for (var i = 0; i < list.length; i++) {
    blackBox += `  <div class="col-lg-3 col-md-6 col-12 ">
            <div class="card product shadow-lg" id="productCard${list[i].id}"
             productIndex="${list[i].id}">
              <img
              src="${list[i].image}" class="card-img-top" alt="..." />
              <div class="card-body">
                <div class="d-flex justify-content-between">
                  <span class="badge rounded-pill text-bg-primary"
                    >${list[i].cate}</span
                  >
                   <span class="badge  text-bg-info">ID : ${list[i].id}
                  </span>
                  <span class="badge rounded-pill text-bg-danger">${
                    list[i].price
                  } $</span>
                </div>
                <div class=" py-3">
                  <p class="m-0 card-text fw-bold mb-1">${
                    list[i].title ? list[i].title : list[i].name
                  }</p>
                  <p class=" m-0 fw-light">${list[i].dec}</p>
                </div>
                <div class="d-flex flex-row align-items-baseline justify-content-between">
                  <button onclick="delProduct(${
                    list[i].id
                  })" class="btn btn-danger">
                    <i class="fa-solid fa-trash"></i>
                  </button>
                  <button onclick="editProduct(${
                    list[i].id
                  })" class="btn btn-warning">
                    <i class="fa-solid fa-pen-to-square"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>`;
  }
  productContainer.innerHTML = blackBox;
}
function updateProduct() {
  var productCardInput = document.getElementById("cardUpdating");
  var updateCardIndex = productCardInput.getAttribute("productIndex");
  console.log(updateCardIndex);

  productList[updateCardIndex].name = productNameInput.value;
  productList[updateCardIndex].title = productNameInput.value;
  productList[updateCardIndex].price = productpriceInput.value;
  productList[updateCardIndex].cate = productCateogeryInput.value;
  productList[updateCardIndex].dec = productDesInput.value;
  productList[
    updateCardIndex
  ].image = `images/${productImageInput.files[0].name}`;

  localStorage.setItem(productsKeyValue, JSON.stringify(productList));
  displayProduct(productList);
  clearForm();
  productCardInput.id = `productCard${updateCardIndex}`;
  console.log(productCardInput);
  productAddBtnInput.classList.remove("d-none");
  productUpdBtnInput.classList.add("d-none");
  alert(
    `Update is done in Product : ${productList[updateCardIndex].name} with ID : ${productList[updateCardIndex].id}`
  );
}

function clearForm(input) {
  productNameInput.value = input ? input.name : "";
  productpriceInput.value = input ? input.price : "";
  productCateogeryInput.value = input ? input.cate : "";
  var fileList = new DataTransfer();

  if (input) {
    fileList.items.add(new File([], input.image.slice(input.image.indexOf("/")+1)));
    productImageInput.files = fileList.files;
  } else {
    productImageInput.value = "";
  }
  productDesInput.value = input ? input.dec : "";

  productAddBtnInput.disabled = true;
  productNameInput.classList.remove("is-valid");
  productpriceInput.classList.remove("is-valid");
  productCateogeryInput.classList.remove("is-valid");
  productDesInput.classList.remove("is-valid");
  productImageInput.classList.remove("is-valid");
  // console.log(productImageInput.files);
  productSearchInput.value ? searchProduct(productSearchInput.value) : "";
}

function editProduct(productIndex) {
  productAddBtnInput.classList.add("d-none");
  productUpdBtnInput.classList.remove("d-none");
  clearForm(productList[productIndex]);
  validationFormResult();
  // productNameInput.value = productList[productIndex].name;
  // productpriceInput.value = productList[productIndex].price;
  // productCateogeryInput.value = productList[productIndex].cate;
  // productDesInput.value = productList[productIndex].dec;
  // productImageInput.value = productList[productIndex].image;
  var productCardId = document.getElementById(`productCard${productIndex}`);
  if (productCardId) {
    productCardId.id = "cardUpdating";
  }
  console.log(productIndex);
}

function delProduct(productNum) {
  productList.splice(productNum, 1);
  console.log(productSearchInput.value);
  for (var i = 0; i < productList.length; i++) {
    productList[i].id = i;
  }
  localStorage.setItem(productsKeyValue, JSON.stringify(productList));
  productSearchInput.value
    ? searchProduct(productSearchInput.value)
    : displayProduct(productList);
  productList.length
    ? productsAlert.classList.replace("alert-r", "alert-l")
    : productsAlert.classList.replace("alert-l", "alert-r");
}

function searchProduct(keyword) {
  var seachlist = [];
  var searchResult = 0;
  for (var i = 0; i < productList.length; i++) {
    if (productList[i].name.toUpperCase().includes(keyword.toUpperCase())) {
      searchResult = 1;
      if (productList[i].name.includes(keyword)) {
        productList[i].title = productList[i].name.replace(
          keyword,
          `<span class="text-success">${keyword}</span>`
        );
      } else if (productList[i].name.includes(keyword.toUpperCase())) {
        productList[i].title = productList[i].name.replace(
          keyword.toUpperCase(),
          `<span class="text-success">${keyword.toUpperCase()}</span>`
        );
      } else if (productList[i].name.includes(keyword.toLowerCase())) {
        productList[i].title = productList[i].name.replace(
          keyword.toLowerCase(),
          `<span class="text-success">${keyword.toLowerCase()}</span>`
        );
      } else if (productList[i].name.toLowerCase().includes(keyword)) {
        productList[i].title = productList[i].name
          .toLowerCase()
          .replace(
            keyword.toLowerCase(),
            `<span class="text-success">${keyword.toLowerCase()}</span>`
          );
      } else {
        productList[i].title = productList[i].name
          .toUpperCase()
          .replace(
            keyword.toUpperCase(),
            `<span class="text-success">${keyword.toUpperCase()}</span>`
          );
      }
      seachlist.push(productList[i]);
    } else {
      console.log("not matched");
    }
  }
  if (searchResult) {
    productSearchAlertInput.classList.add("alert-r");
    productSearchAlertInput.classList.replace("alert-danger", "alert-success");
    productSearchAlertInput.classList.add("mb-5");
    productSearchAlertInput.innerHTML = `
    <i class="fa-solid fa-bounce fa-circle-check me-2"></i>
    ${seachlist.length} product/s founded `;
    displayProduct(seachlist);
  } else {
    productSearchAlertInput.classList.replace("alert-success", "alert-danger");
    productSearchAlertInput.classList.add("alert-r");
    productSearchAlertInput.classList.add("mb-5");
    productSearchAlertInput.innerHTML = `
    <i class="fa-solid fa-ban fa-beat-fade text-danger me-2"></i>
    No products founded , Try again !
`;
  }
  if (!productSearchInput.value) {
    productSearchAlertInput.classList.remove("alert-r");
    productSearchAlertInput.classList.remove("mb-5");
  }
}

function validateForm(input) {
  var regex = {
    productName: /^[A-Z]([a-z]{2,15})$/,
    productPrice: /^([6-9][0-9]{3}|[1-5][0-9]{4}|60000)$/,
    productCateogery: /^(Phones|Screens|Accesories)$/,
    productDes: /^\w{1,250}$/,
    productImage: /^C:\\fakepath\\/,
  };
  var isValid = regex[input.id].test(input.value);
  // console.log(input.value);
  // console.log(isValid);
  if (isValid) {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
    input.nextElementSibling.classList.replace("alert-r", "alert-l");
    input.nextElementSibling.classList.remove("mb-2");
  } else {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
    input.nextElementSibling.classList.replace("alert-l", "alert-r");
    input.nextElementSibling.classList.add("mb-2");
  }

  if (
    regex.productName.test(productNameInput.value) &&
    regex.productCateogery.test(productCateogeryInput.value) &&
    regex.productPrice.test(productpriceInput.value) &&
    regex.productDes.test(productDesInput.value) &&
    regex.productImage.test(productImageInput.value)
  ) {
    productAddBtnInput.disabled = false;
    productUpdBtnInput.disabled = false;
  } else {
    productAddBtnInput.disabled = true;
    productUpdBtnInput.disabled = true;
  }
  return isValid;
}

function validationFormResult() {
  var result = false;
  if (
    validateForm(productNameInput) &&
    validateForm(productpriceInput) &&
    validateForm(productCateogeryInput) &&
    validateForm(productDesInput) &&
    validateForm(productImageInput)
  ) {
    result = true;
  }
  return result;
}
