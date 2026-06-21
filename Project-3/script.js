let ShowFormBtn = document.querySelector(".nav-right button");
let formContainer = document.querySelector(".form-container");
let categoryList = document.querySelector(".list");
let catrgoryDropDown = document.querySelector(".category-drop-down");
let catrgoryDropDownIcon = document.querySelector(".iconsrotate");
let form = document.querySelector("form");
let ListH4 = document.querySelectorAll(".list h4");
let products = document.querySelector(".actual-product");
let deletePopup = document.querySelector(".delete-popup");
let deleteBtn = document.querySelector(".delete-btn");
let cancelBtn = document.querySelector(".cancel-btn");
let categoryH1 = document.querySelector(".category-h1");
let productModal = document.querySelector(".product-modal");
let flashMsg = document.querySelector(".flash-msg");
let searchBar = document.querySelector(".search-bar");

let categoryName = null;
let idx = -1;
let isUpdate = null;
let ProductArray = JSON.parse(localStorage.getItem("products")) || [];
let isUpOrDown = true;
let categorySymbol = null;

let RenderUI = (data = ProductArray) => {
  products.innerHTML = "";
  if (data.length === 0) {
    products.innerHTML = `
  <h2 style="padding:20px;text-align:center;color:red">
    No Product Found 😔
  </h2>
`;
    return;
  }
  data.forEach((Product, idx) => {
    products.innerHTML += `<div class="product-list">
            <div class="name-img">
              <img
                src="${Product.ProductImage}"
                alt=""
              />
              <h2>${Product.ProductName}</h2>
            </div>
            <h2 class="category">
  ${Product.categoryName}
  ${checkCategorySymbol(Product.categoryName)}
</h2>
            <h2>${Product.ProductPrice} ₹</h2>

            <div class="actions">
              <i data-index="${Product.originalIndex ?? idx}" class="ri-eye-line view"></i>
              <i data-index="${Product.originalIndex ?? idx}" class="ri-pencil-line update"></i>
              <i data-index="${Product.originalIndex ?? idx}" class="ri-delete-bin-line delete"></i>
            </div>
          </div>`;
  });
};

RenderUI();

searchBar.addEventListener("input", (e) => {
  let value = e.target.value.toLowerCase();

  let filteredProducts = ProductArray.map((product, index) => ({
    ...product,
    originalIndex: index,
  })).filter((product) => product.ProductName.toLowerCase().includes(value));

  RenderUI(filteredProducts);
});

ListH4.forEach((category) => {
  category.addEventListener("click", (btbt) => {
    categoryName = btbt.target.textContent;
    categoryH1.textContent = categoryName;
    categoryList.style.display = "none";
    catrgoryDropDownIcon.style.transform = "rotate(360deg)";
    catrgoryDropDown.style.backgroundColor = "#30c530";
    isUpOrDown = true;
    checkCategorySymbol();
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let ProductName = e.target[0].value;
  let ProductPrice = e.target[1].value;
  let ProductImage = e.target[2].value;

  if (
    ProductName.trim() === "" ||
    ProductImage.trim() === "" ||
    ProductPrice.trim() === ""
  ) {
    showMessage("⚠️ Please select all fields");
    return;
  }

  let ProductOBJ = {
    ProductName,
    ProductPrice,
    ProductImage,
    categoryName,
  };

  categoryName = null;

  if (isUpdate !== null) {
    isUpdate = ProductOBJ;
    ProductArray[idx] = isUpdate;
    localStorage.setItem("products", JSON.stringify(ProductArray));
  } else {
    ProductArray.push(ProductOBJ);
    localStorage.setItem("products", JSON.stringify(ProductArray));
  }

  RenderUI();
  form.reset();
  categoryH1.textContent = "Category";
  catrgoryDropDownIcon.style.transform = "rotate(360deg)";
  catrgoryDropDown.style.backgroundColor = "#2563eb";
  formContainer.style.display = "none";
});

ShowFormBtn.addEventListener("click", () => {
  if (categoryName === null) {
    showMessage("⚠️ Please select a category first");
    return;
  }
  formContainer.style.display = "flex";
});

catrgoryDropDown.addEventListener("click", () => {
  if (isUpOrDown) {
    categoryList.style.display = "initial";
    catrgoryDropDownIcon.style.transform = "rotate(180deg)";
    isUpOrDown = false;
  } else {
    categoryList.style.display = "none";
    catrgoryDropDownIcon.style.transform = "rotate(360deg)";
    isUpOrDown = true;
  }
});

products.addEventListener("click", (e) => {
  idx = e.target.dataset.index;

  if (e.target.classList.contains("view")) {
    let product = ProductArray[idx];
    productModal.style.display = "flex";
    productModal.innerHTML = `
<div class="product-details-card">
  <button class="close-btn-card">✕</button>

  <div class="product-image">
    <img src="${product.ProductImage}" alt="" />
  </div>

  <div class="product-info">
    <span class="badge">${product.categoryName}</span>

    <h2>${product.ProductName}</h2>

    <p class="description">
      Premium quality product from ${product.categoryName} category.
    </p>

    <div class="details">
      <div>
        <h4>Price</h4>
        <p>₹${product.ProductPrice}</p>
      </div>

      <div>
        <h4>Category</h4>
        <p>${product.categoryName}</p>
      </div>

      <div>
        <h4>Stock</h4>
        <p>25 Available</p>
      </div>

      <div>
        <h4>Rating</h4>
        <p>⭐ 4.8</p>
      </div>
    </div>

    <button class="buy-btn">Add to Cart</button>
  </div>
</div>
`;
  }

  if (e.target.classList.contains("update")) {
    let product = ProductArray[idx];
    form[0].value = product.ProductName;
    form[1].value = product.ProductPrice;
    form[2].value = product.ProductImage;
    formContainer.style.display = "flex";
    categoryName = product.categoryName;
    isUpdate = true;
  }

  if (e.target.classList.contains("delete")) {
    idx = e.target.dataset.index;
    deletePopup.style.display = "flex";
  }
});

deleteBtn.addEventListener("click", () => {
  removeProduct();
});

cancelBtn.addEventListener("click", () => {
  deletePopup.style.display = "none";
});

let removeProduct = () => {
  ProductArray.splice(idx, 1);
  localStorage.setItem("products", JSON.stringify(ProductArray));
  RenderUI();
  deletePopup.style.display = "none";
};

function checkCategorySymbol(categoryName) {
  if (categoryName === "Fashion") {
    return `<img class="pr-image" src="still-life-spring-wardrobe-switch.jpg" alt="">`;
  } else if (categoryName === "Beauty") {
    return ` <img class="pr-image" src="cosmetic-male-beauty-products-with-display.jpg" alt="">`;
  } else if (categoryName === "Electronic") {
    return `<img class="pr-image" src="big-data-technology-cyberspace-motherboard-microchip-circuit-board-computer-processor-neon-light.jpg" alt="">`;
  } else {
    return `<img class="pr-image" src="close-up-futuristic-sneakers-showcase.jpg" alt="">`;
  }
}

productModal.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("close-btn-card") ||
    e.target.classList.contains("product-modal")
  ) {
    productModal.style.display = "none";
  }
});

function showMessage(msg) {
  flashMsg.textContent = msg;
  flashMsg.style.display = "flex";

  setTimeout(() => {
    flashMsg.style.display = "none";
  }, 3000);
}
