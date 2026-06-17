let form = document.querySelector("form");
let formContainer = document.querySelector(".form-container");
let createBtn = document.querySelector(".createBtn");
let submitBtn = document.querySelector(".SBtn");
let products = document.querySelector(".products");

let ProductArr = [];
let updateIdx = null;

let renderUI = () => {
  products.innerHTML = "";
  ProductArr.forEach((product, idx) => {
    products.innerHTML += `<div class="product-card">
          <div class="img">
            <img
              src="${product.imageURL}"
              alt=""
            />
          </div>
          <div class="text">
            <h1>${product.productName}</h1>
            <p>${product.productDescription}</p>
          </div>
          <div class="btns">
            <button onclick="updateBtn('${product.productName}')" class="update">Update</button>
            <button onclick="deleteBtn('${idx}')" class="delete">Delete</button>
          </div>
        </div>`;
  });
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let productName = e.target[0].value;
  let productDescription = e.target[1].value;
  let imageURL = e.target[2].value;

  let obj = {
    productName,
    productDescription,
    imageURL,
  };

  if (updateIdx !== null) {
    ProductArr[updateIdx] = obj;
    updateIdx = null;
  } else {
    ProductArr.push(obj);
  }
  renderUI();
  form.reset();
  formContainer.style.display = "none";
});

createBtn.addEventListener("click", () => {
  formContainer.style.display = "flex";
});

let updateBtn = (name) => {
  formContainer.style.display = "flex";
  let product = ProductArr.find((product) => product.productName === name);
  updateIdx = ProductArr.findIndex((product) => product.productName === name);
  form[0].value = product.productName;
  form[1].value = product.productDescription;
  form[2].value = product.imageURL;
};

let deleteBtn = (idx) => {
  ProductArr.splice(idx, 1);
  renderUI();
};
