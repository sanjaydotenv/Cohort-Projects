const registerBtn = document.querySelector(".register-btn");
const loginBtn = document.querySelector(".login-btn");
const registerPage = document.querySelector("#Register-page");
const loginPage = document.querySelector("#Login-Page");
const loginLink = document.querySelector(".login-span");
const dashboardPage = document.querySelector("#Dashboard-Page");
const registerLink = document.querySelector(".register-span");
let inp = document.querySelectorAll("input");
let registerForm = document.querySelector(".register-form");
const logoutBtn = document.querySelector(".logout-btn");
let loginForm = document.querySelector(".login-form");
const profileBtn = document.querySelector(".profile-btns");
const upDownArrow = document.querySelector(".up-down-profile");
const back_transaction = document.querySelector(".back-tran");
const create_transaction = document.querySelector(".create-Page");
const themeBtn = document.querySelector(".theme-toggle");
const create_transaction_btn = document.querySelector(".create-tran-btn");
const create_transaction_form = document.querySelector(
  ".create-transaction-form",
);
let navBarNameh1 = document.querySelector(".nav-bar-name-h1");
const resetAllData = document.querySelector(".resetalldata");
const profileWrapper = document.querySelector(".profile-wrapper");

const users = JSON.parse(localStorage.getItem("UsersData")) || [];

let IsLoginOrRegisterOrDashboard = localStorage.getItem(
  "IsLoginOrRegisterOrDashboard",
);

let CurrentPage = () => {
  if (IsLoginOrRegisterOrDashboard === "DashboardPage") {
    loginPage.style.display = "none";
    registerPage.style.display = "none";
    dashboardPage.style.display = "flex";
  } else if (IsLoginOrRegisterOrDashboard === "RegisterPage") {
    loginPage.style.display = "none";
    registerPage.style.display = "flex";
    dashboardPage.style.display = "none";
  } else {
    loginPage.style.display = "flex";
    registerPage.style.display = "none";
    dashboardPage.style.display = "none";
  }
};
CurrentPage();

const RenderProfile = () => {
  const users = JSON.parse(localStorage.getItem("UsersData")) || [];
  if (users.length === 0) return;

  const { username } = users[0];
  const user = users[0];
  const picture = user.picture || "logo.png";

  navBarNameh1.textContent = `${username}👋`;

  profileWrapper.innerHTML = `<div  class="profile-img">
            <img class="profile-img-tag" src="${picture}" alt="" />
          </div >
          <div class="profile-name">
            <h4 class="profile-name-h4">${username}</h4>
            <p>Welcome to CashPilot</p>
          </div >`;
};

RenderProfile();

resetAllData.addEventListener("click", () => {
  UsersTransaction = [];
  localStorage.setItem("UsersTransaction", JSON.stringify(UsersTransaction));
  calculateTotals();
  calculateCategoryData();

  RenderUI();
  createCharts();
});

let Users = [];

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let username = inp[0].value;
  let password = inp[1].value;
  let picture = inp[2].value;

  if (
    username.trim() === "" ||
    password.trim() === "" ||
    picture.trim() === ""
  ) {
    return;
  }

  let user = {
    username,
    password,
    picture,
  };

  Users.push(user);

  localStorage.setItem("UsersData", JSON.stringify(Users));

  IsLoginOrRegisterOrDashboard = "DashboardPage";
  localStorage.setItem(
    "IsLoginOrRegisterOrDashboard",
    IsLoginOrRegisterOrDashboard,
  );
  CurrentPage();
  RenderProfile();
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let Username = inp[3].value;
  let password = inp[4].value;

  if (Username.trim() === "" || password.trim() === "") {
    return;
  }

  let [Data] = JSON.parse(localStorage.getItem("UsersData"));
  if (Username === Data.username && password === Data.password) {
    IsLoginOrRegisterOrDashboard = "DashboardPage";
    localStorage.setItem(
      "IsLoginOrRegisterOrDashboard",
      IsLoginOrRegisterOrDashboard,
    );
    CurrentPage();
  }
});

loginLink.addEventListener("click", () => {
  IsLoginOrRegisterOrDashboard = "LoginPage";
  localStorage.setItem(
    "IsLoginOrRegisterOrDashboard",
    IsLoginOrRegisterOrDashboard,
  );
  CurrentPage();
});

registerLink.addEventListener("click", () => {
  IsLoginOrRegisterOrDashboard = "RegisterPage";
  localStorage.setItem(
    "IsLoginOrRegisterOrDashboard",
    IsLoginOrRegisterOrDashboard,
  );
  CurrentPage();
});

logoutBtn.addEventListener("click", () => {
  IsLoginOrRegisterOrDashboard = "LoginPage";
  localStorage.setItem(
    "IsLoginOrRegisterOrDashboard",
    IsLoginOrRegisterOrDashboard,
  );
  CurrentPage();
});

upDownArrow.addEventListener("click", () => {
  profileBtn.classList.toggle("hide-btns-profile");
  upDownArrow.style.rotate = "180deg";
});

back_transaction.addEventListener("click", () => {
  create_transaction.style.display = "none";
});

create_transaction_btn.addEventListener("click", () => {
  create_transaction.style.display = "flex";
});

const transactionSelect = document.querySelector(".transactionSelect");
const content = document.querySelector(".content");

let UsersTransaction =
  JSON.parse(localStorage.getItem("UsersTransaction")) || [];

let calculateTotals = () => {
  totalIncome = 0;
  totalExpense = 0;

  UsersTransaction.forEach((val) => {
    if (val.transactionType === "Income") {
      totalIncome += Number(val.amount);
    } else {
      totalExpense += Number(val.amount);
    }
  });

  totalBalance = totalIncome - totalExpense;
};
calculateTotals();

let userData = JSON.parse(localStorage.getItem("UsersData")) || [];

let RenderUI = () => {
  content.innerHTML = `<div  class="top-cards">
            <div  class="balance-card ">
              <div  class="balance-top">
                <div >
                  <p>Current Balance</p>
                  <h1>₹${totalBalance}</h1>
                </div >

                <div  class="balance-icon">
                  <i class="ri-wallet-3-fill"></i>
                </div >
              </div >

              <div  class="balance-bottom">
                <div >
                  <small>Income</small>
                  <h3>₹${totalIncome}</h3>
                </div >

                <div >
                  <small>Expense</small>
                  <h3>₹${totalExpense}</h3>
                </div >

                <div >
                  <small>Savings</small>
                  <h3>₹${totalBalance}</h3>
                </div >
              </div >
            </div >

            <div  class="small-card">
              <i class="ri-arrow-up-circle-fill"></i>

              <h2>₹${totalIncome}</h2>

              <p>This Month Income</p>

              <span>+18%</span>
            </div >

            <div  class="small-card">
              <i class="ri-arrow-down-circle-fill"></i>

              <h2>₹${totalExpense}</h2>

              <p>This Month Expense</p>

              <span class="expense">-8%</span>
            </div >
          </div >

          <div  class="charts">
            <div  class="chart-card">
              <canvas id="incomeExpenseChart"></canvas>
              <canvas id="categoryChart"></canvas>
            </div >
          </div >
          
          `;
};
RenderUI();

let categoryData = {};

function calculateCategoryData() {
  categoryData = {};

  UsersTransaction.forEach((item) => {
    if (item.transactionType === "Expense") {
      if (categoryData[item.category]) {
        categoryData[item.category] += Number(item.amount);
      } else {
        categoryData[item.category] = Number(item.amount);
      }
    }
  });
}
calculateCategoryData();

create_transaction_form.addEventListener("submit", (e) => {
  e.preventDefault();
  let transactionType = null;
  if (transactionSelect.value === "Income") {
    transactionType = "Income";
  } else if (transactionSelect.value === "Expense") {
    transactionType = "Expense";
  }

  let category = inp[5].value;
  let amount = inp[6].value;
  let date = inp[7].value;

  let obj = {
    transactionType,
    category,
    amount,
    date,
  };

  UsersTransaction.push(obj);
  localStorage.setItem("UsersTransaction", JSON.stringify(UsersTransaction));
  create_transaction.style.display = "none";

  calculateTotals();
  calculateCategoryData();
  RenderUI();
  createCharts();
});

function createCharts() {
  const ctx = document.getElementById("incomeExpenseChart");
  const ctx2 = document.getElementById("categoryChart");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Income",
          data: [totalIncome],
          backgroundColor: "#22C55E",
        },
        {
          label: "Expense",
          data: [totalExpense],
          backgroundColor: "#3B82F6",
        },
      ],
    },
  });

  new Chart(ctx2, {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Expense",
          data: [1200, 2500, 1800, 3200, 2700, 4100],
          borderColor: "#22C55E",
          backgroundColor: "#22C55E",
          fill: false,
          tension: 0.4,
        },
      ],
    },
  });
}

createCharts();

if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light");
  themeBtn.classList.add("active");
}

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
  themeBtn.classList.toggle("active");

  if (document.body.classList.contains("light")) {
    localStorage.setItem("theme", "light");
  } else {
    localStorage.setItem("theme", "dark");
  }
});
