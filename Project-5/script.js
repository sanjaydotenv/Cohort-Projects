const themeBtn = document.querySelector(".theme-btn");
const asideLinkDashboard = document.querySelector(".aside-link-dashboard");
const mainPage = document.querySelector(".main-page");
const todoPage = document.querySelector(".todo-page");
const asideLinkTodo = document.querySelector(".aside-link-todo");
const asideLinkDailyPlanner = document.querySelector(
  ".aside-link-daily-planner",
);
const dailyPlannerPage = document.querySelector(".daily-planner-page");
const asideLinkPromodoro = document.querySelector(".aside-link-promodoro");
const pomodoroCardPage = document.querySelector(".pomodoro-card-page");
const asideLinkWeather = document.querySelector(".aside-link-weather");
const weatherCardPage = document.querySelector(".weather-card-page");
const asideLinkDailyGoals = document.querySelector(".aside-link-daily-goals");
const goalsCardPage = document.querySelector(".goals-card-page");
const asideLinkMotivation = document.querySelector(".aside-link-motivation");
const quoteCardPage = document.querySelector(".quote-card-page");
const asideLinkSetting = document.querySelector(".aside-link-setting");
const settingsCardPage = document.querySelector(".settings-card-page");

const todoCard = document.querySelector(".todo-card");
const plannerCard = document.querySelector(".planner-card");
const pomodoroCard = document.querySelector(".pomodoro-card");
const weatherCard = document.querySelector(".weather-card");
const goalsCard = document.querySelector(".goals-card");
const motivationCard = document.querySelector(".motivation-card");

const resetOverlay = document.querySelector("#resetOverlay");
const cancelReset = document.querySelector("#cancelReset");
const confirmReset = document.querySelector("#confirmReset");
const dangerBtn = document.querySelector(".danger-btn");

dangerBtn.addEventListener("click", () => {
  resetOverlay.classList.add("active");
});

cancelReset.addEventListener("click", () => {
  resetOverlay.classList.remove("active");
});

confirmReset.addEventListener("click", () => {
  localStorage.clear();

  showToast("All Data Cleared Successfully 🧹", "warning");

  setTimeout(() => {
    location.reload();
  }, 1000);
});

const toast = document.querySelector("#toast");
const toastText = document.querySelector("#toastText");

function showToast(message, type = "success") {
  toast.className = "toast";

  if (type === "error") {
    toast.classList.add("error");
    toast.innerHTML = `<i class="fa-solid fa-circle-xmark"></i>
        <span id="toastText">${message}</span>`;
  } else if (type === "warning") {
    toast.classList.add("warning");
    toast.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i>
        <span id="toastText">${message}</span>`;
  } else {
    toast.innerHTML = `<i class="fa-solid fa-circle-check"></i>
        <span id="toastText">${message}</span>`;
  }

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

const overlay = document.querySelector("#confirmOverlay");
const cancelBtn = document.querySelector("#cancelDelete");
const confirmBtn = document.querySelector("#confirmDelete");

let deleteFunction = null;

function openConfirm(callback) {
  overlay.classList.add("active");
  deleteFunction = callback;
}

cancelBtn.addEventListener("click", () => {
  overlay.classList.remove("active");
});

confirmBtn.addEventListener("click", () => {
  if (deleteFunction) {
    deleteFunction();
  }

  overlay.classList.remove("active");

  showToast("Item Deleted Successfully 🗑", "warning");
});

const bgDynamic = document.querySelector(".background");
const greeting = document.querySelector("#greeting");
const headingGreeting = document.querySelector("#headinggreeting");
const bgDay = document.querySelector("#day");
const bgDate = document.querySelector("#date");
const bgTime = document.querySelector("#time");

const bgUI = () => {
  const hour = new Date().getHours();
  const min = new Date().getMinutes();
  const sec = new Date().getSeconds();
  const date = new Date().getDate();
  const year = new Date().getFullYear();
  const month = new Date().getMonth();
  const day = new Date().getDay();

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let amOrpm = hour >= 12 ? "PM" : "AM";

  if (hour >= 5 && hour < 12) {
    greeting.textContent = "🌅 Good Morning";
    headingGreeting.textContent = "🌅 Good Morning";
  } else if (hour >= 12 && hour < 17) {
    greeting.textContent = "☀️ Good Afternoon";
    headingGreeting.textContent = "☀️ Good Afternoon";
  } else if (hour >= 17 && hour < 20) {
    greeting.textContent = "🌇 Good Evening";
    headingGreeting.textContent = "🌇 Good Evening";
  } else {
    greeting.textContent = "🌙 Good Night";
    headingGreeting.textContent = "🌙 Good Night";
  }

  if (hour > 12) {
    bgTime.textContent = `${String(hour - 12).padStart(2, "0")}:${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")} ${amOrpm}`;
  } else {
    bgTime.textContent = `${String(hour).padStart(2, "0")}:${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")} ${amOrpm}`;
  }

  bgDate.textContent = `${date} ${months[month]} ${year}`;
  bgDay.textContent = `${days[day]}`;
};
bgUI();

setInterval(() => {
  bgUI();
}, 1000);

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

const handlePageNavigation = () => {
  const allPages = document.querySelectorAll(".page");

  const hideAllPages = () => {
    allPages.forEach((page) => {
      page.classList.remove("active");
    });
  };

  const handlekounhide = (page) => {
    page.classList.add("active");
  };

  asideLinkTodo.addEventListener("click", () => {
    mainPage.style.display = "none";
    hideAllPages();
    handlekounhide(todoPage);
  });
  todoCard.addEventListener("click", () => {
    mainPage.style.display = "none";
    hideAllPages();
    handlekounhide(todoPage);
  });

  asideLinkDailyPlanner.addEventListener("click", () => {
    mainPage.style.display = "none";
    hideAllPages();
    handlekounhide(dailyPlannerPage);
  });
  plannerCard.addEventListener("click", () => {
    mainPage.style.display = "none";
    hideAllPages();
    handlekounhide(dailyPlannerPage);
  });

  asideLinkPromodoro.addEventListener("click", () => {
    mainPage.style.display = "none";
    hideAllPages();
    handlekounhide(pomodoroCardPage);
  });
  pomodoroCard.addEventListener("click", () => {
    mainPage.style.display = "none";
    hideAllPages();
    handlekounhide(pomodoroCardPage);
  });

  asideLinkWeather.addEventListener("click", () => {
    mainPage.style.display = "none";
    hideAllPages();
    handlekounhide(weatherCardPage);
  });
  weatherCard.addEventListener("click", () => {
    mainPage.style.display = "none";
    hideAllPages();
    handlekounhide(weatherCardPage);
  });

  asideLinkDailyGoals.addEventListener("click", () => {
    mainPage.style.display = "none";
    hideAllPages();
    handlekounhide(goalsCardPage);
  });
  goalsCard.addEventListener("click", () => {
    mainPage.style.display = "none";
    hideAllPages();
    handlekounhide(goalsCardPage);
  });

  asideLinkMotivation.addEventListener("click", () => {
    mainPage.style.display = "none";
    hideAllPages();
    handlekounhide(quoteCardPage);
  });
  motivationCard.addEventListener("click", () => {
    mainPage.style.display = "none";
    hideAllPages();
    handlekounhide(quoteCardPage);
  });

  asideLinkSetting.addEventListener("click", () => {
    mainPage.style.display = "none";
    hideAllPages();
    handlekounhide(settingsCardPage);
  });

  asideLinkDashboard.addEventListener("click", () => {
    hideAllPages();
    mainPage.style.display = "flex";
  });
};

handlePageNavigation();

// TODO LIST
const todoInput = document.querySelector("#todoInput");
const todoList = document.querySelector(".todo-list");
let todoData = JSON.parse(localStorage.getItem("todoData")) || [];
const todoUI = () => {
  todoList.innerHTML = "";
  todoData.forEach((task, idx) => {
    todoList.innerHTML += `<li>
            <div class="left">
              <input type="checkbox" />

              <span>${task}</span>
            </div>

            <i onclick="openConfirm(() => deleteTodo(${idx}))" class="fa-solid fa-trash delete"></i>
          </li>`;
  });
};
todoUI();
const deleteTodo = (idx) => {
  todoData = todoData.filter((todo, index) => {
    return index !== idx;
  });

  localStorage.setItem("todoData", JSON.stringify(todoData));
  todoUI();
};
todoInput.addEventListener("change", (e) => {
  let todoInputdata = e.target.value;

  localStorage.setItem(
    "todoData",
    JSON.stringify([...todoData, todoInputdata]),
  );
  todoData.push(todoInputdata);
  todoUI();
  e.target.value = "";
});
// TODO LIST

// DAILY PLANNER
const plannerTimeInput = document.querySelector("#plannerTime");
const plannerTaskInput = document.querySelector("#plannerTask");
const plannerBtn = document.querySelector("#plannerBtn");
const plannerList = document.querySelector(".planner-list");
let plannerData = JSON.parse(localStorage.getItem("plannerData")) || [];

function formatTime(time) {
  let [hour, minute] = time.split(":");

  hour = Number(hour);

  const ampm = hour >= 12 ? "PM" : "AM";

  hour = hour % 12 || 12;

  return `${hour}:${minute} ${ampm}`;
}

const plannerUI = () => {
  plannerList.innerHTML = "";
  plannerData.forEach((task, idx) => {
    plannerList.innerHTML += ` <li>
          <div class="planner-left">
            <span class="time">${formatTime(task.time)}</span>

            <span class="task">${task.task} </span>
          </div>

          <i onclick="openConfirm(() => deletePlannerBtn(${idx}))" class="fa-solid fa-trash delete"></i>
        </li>`;
  });
};

plannerUI();
plannerBtn.addEventListener("click", () => {
  let time = plannerTimeInput.value;
  let task = plannerTaskInput.value;

  if (!time.trim() || !task.trim()) {
    showToast("Please enter a task!", "warning");
    return;
  }

  let obj = {
    time,
    task,
  };

  plannerTimeInput.value = "";
  plannerTaskInput.value = "";

  plannerData.push(obj);
  localStorage.setItem("plannerData", JSON.stringify(plannerData));
  plannerUI();
  showToast("Todo Added Successfully ✅");
});
const deletePlannerBtn = (idx) => {
  plannerData = plannerData.filter((task, index) => index !== idx);
  localStorage.setItem("plannerData", JSON.stringify(plannerData));
  plannerUI();
  showToast("Todo Deleted Successfully ✅");
};
// DAILY PLANNER

// POMODORO
const startBtn = document.querySelector(".start-btn");
const pauseBtn = document.querySelector(".pause-btn");
const resetBtn = document.querySelector(".reset-btn");
const timerDisplay = document.querySelector("#timer");
const shortBtn = document.querySelector("#shortBtn");
const longBtn = document.querySelector("#longBtn");
const defaultPomo = document.querySelector("#default");
const timerCircle = document.querySelector(".timer-circle ");

const waqt = JSON.parse(localStorage.getItem("pomodoroTimes")) || {
  focus: 25,
  short: 5,
  long: 45,
};

let time = waqt.focus * 60;

const focusUpdateDisplay = () => {
  let min = Math.floor(time / 60);
  let sec = time % 60;
  timerDisplay.textContent = `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
};
focusUpdateDisplay();

let timer = null;
let isStart = false;

let breakState = "focus";

startBtn.addEventListener("click", () => {
  if (isStart) return;

  isStart = true;

  timer = setInterval(() => {
    time--;
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    if (time <= 0) {
      clearInterval(timer);
      timer = null;
      isStart = false;
    }
  }, 1000);
});

pauseBtn.addEventListener("click", () => {
  clearInterval(timer);
  isStart = false;
});

resetBtn.addEventListener("click", () => {
  isStart = false;
  if (breakState === "focus") {
    time = pomodorTimes.focus * 60;
  } else if (breakState === "short") {
    time = pomodorTimes.short * 60;
  } else {
    time = pomodorTimes.long * 60;
  }
  clearInterval(timer);
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
});

shortBtn.addEventListener("click", () => {
  breakState = "short";
  timerCircle.style.border = "8px solid #14B8A6";
  defaultPomo.classList.remove("active");
  longBtn.classList.remove("active");
  shortBtn.classList.add("active");

  isStart = false;
  clearInterval(timer);
  time = Number(pomodorTimes.short || 5) * 60;

  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
});
longBtn.addEventListener("click", () => {
  breakState = "long";
  timerCircle.style.border = "8px solid #F59E0B";
  defaultPomo.classList.remove("active");
  longBtn.classList.add("active");
  shortBtn.classList.remove("active");

  isStart = false;
  clearInterval(timer);
  time = Number(pomodorTimes.long || 45) * 60;

  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
});
defaultPomo.addEventListener("click", () => {
  breakState = "focus";
  timerCircle.style.border = "8px solid #6366F1";
  defaultPomo.classList.add("active");
  longBtn.classList.remove("active");
  shortBtn.classList.remove("active");

  isStart = false;
  clearInterval(timer);
  time = Number(pomodorTimes.focus || 25) * 60;
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
});
// POMODORO

// WEATHER

const weatherUI = (data) => {
  const {
    current: { temperature_2m, relative_humidity_2m, wind_speed_10m },
  } = data;
  weatherCardPage.innerHTML = "";
  weatherCardPage.innerHTML = `
  <h2>
        <i class="fa-solid fa-cloud-sun"></i>
        Weather
      </h2>

      <div class="weather-top">
        <div class="weather-info">
          <h1 id="temperature">${temperature_2m}°C</h1>

          <h3 id="city">Bhopal</h3>

          <p id="condition">☀️ Clear</p>
        </div>

        <div class="weather-icon">
          <i class="fa-solid fa-sun"></i>
        </div>
      </div>

      <div class="weather-details">
        <div class="weather-box">
          <i class="fa-solid fa-droplet"></i>

          <span>Humidity</span>

          <h4>${relative_humidity_2m}%</h4>
        </div>

        <div class="weather-box">
          <i class="fa-solid fa-wind"></i>

          <span>Wind</span>

          <h4>${wind_speed_10m} km/h</h4>
        </div>

        <div class="weather-box">
          <i class="fa-solid fa-temperature-half"></i>

          <span>Feels Like</span>

          <h4>${temperature_2m}°C</h4>
        </div>
      </div>`;
};

const weatherLoading = () => {
  weatherCardPage.innerHTML = `
    <div class="loading">
      <i class="fa-solid fa-spinner fa-spin"></i>

      <h3>Loading Weather...</h3>
    </div>
  `;
};

const weatherError = () => {
  weatherCardPage.innerHTML = `
    <div class="error">
      <i class="fa-solid fa-circle-exclamation"></i>

      <h3>Some Problem Occurred</h3>

      <p>Please check your internet connection.</p>

      <button class="retry-btn">
        Try Again
      </button>
    </div>
  `;

  document.querySelector(".retry-btn").addEventListener("click", getWeathera);
};

const getWeathera = async () => {
  weatherLoading();

  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, 10000);

  try {
    const res = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=23.2599&longitude=77.4126&current=temperature_2m,relative_humidity_2m,wind_speed_10m",
      {
        signal: controller.signal,
      },
    );

    clearTimeout(timeout);

    if (!res.ok) {
      throw new Error("Network Error");
    }

    const data = await res.json();

    weatherUI(data);
  } catch (err) {
    clearTimeout(timeout);

    weatherError();

    console.log(err);
  }
};

getWeathera();

const getWeather = async () => {
  try {
    const res = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=23.2599&longitude=77.4126&current=temperature_2m,relative_humidity_2m,wind_speed_10m",
    );

    const data = await res.json();
    weatherUI(data);
  } catch (error) {
    console.log("error is -> ", error);
  }
};

getWeather();

// WEATHER

// DAILY GOALS
const dailyGolas = document.querySelector("#goalInput");
const goalBtn = document.querySelector("#goalBtn");
const goalList = document.querySelector(".goal-list");
const goalProgressFill = document.querySelector(".progress-fill");
const checkboxgoal = document.querySelector(".checkboxgoal");
const goalNoOfTask = document.querySelector("#goalnooftask");

let dailyGoalsData = JSON.parse(localStorage.getItem("goalData")) || [];

const renderGoalsUI = () => {
  goalList.innerHTML = "";
  const dataLenght = dailyGoalsData.length;
  const completedLength = dailyGoalsData.filter((goal) => goal.complete).length;

  dailyGoalsData.forEach((data, idx) => {
    goalList.innerHTML += `<li>
          <div class="goal-left">
            <input class="checkboxgoal" data-index="${idx}" ${data.complete ? "checked" : ""} type="checkbox" />

            <span>${data.task}</span>
          </div>

          <i onclick="openConfirm(() => deletedGoal(${idx}))" class="fa-solid fa-trash delete"></i>
        </li>`;

    goalNoOfTask.textContent = `${completedLength} / ${dataLenght}`;
  });
};
renderGoalsUI();

goalList.addEventListener("change", (e) => {
  if (e.target.classList.contains("checkboxgoal")) {
    const index = e.target.dataset.index;
    dailyGoalsData[index].complete = e.target.checked;
    localStorage.setItem("goalData", JSON.stringify(dailyGoalsData));
  }
  updatedProgress();
  renderGoalsUI();
});

const updatedProgress = () => {
  const completed = dailyGoalsData.filter((goal) => goal.complete).length;

  let total = dailyGoalsData.length;
  const percentage = total === 0 ? 0 : (completed / total) * 100;
  goalProgressFill.style.width = `${percentage}%`;
};

updatedProgress();

const deletedGoal = (idx) => {
  dailyGoalsData = dailyGoalsData.filter((val, index) => index !== idx);
  localStorage.setItem("goalData", JSON.stringify(dailyGoalsData));
  renderGoalsUI();
  updatedProgress();
  if (dailyGoalsData.length === 0) {
    goalNoOfTask.textContent = `0 / 0`;
  }
  showToast("Daily Goal Deleted Successfully ✅");
};

goalBtn.addEventListener("click", () => {
  const goalData = dailyGolas.value;
  if (!goalData.trim()) {
    showToast("Please enter a task!", "warning");
    return;
  }
  let goalObj = {
    task: goalData,
    complete: false,
  };
  dailyGoalsData.push(goalObj);
  localStorage.setItem("goalData", JSON.stringify(dailyGoalsData));
  renderGoalsUI();
  updatedProgress();
  dailyGolas.value = "";
  showToast("Daily Goal Added Successfully ✅");
});
// DAILY GOALS

// MOTIVATION

const quoteBtn = document.querySelector(".quote-btn");
const quoteBox = document.querySelector(".quote-box");

const renderQuoteUI = (author, quote) => {
  quoteBox.innerHTML = `<i class="fa-solid fa-quote-left quote-icon"></i>

        <p id="quote">
          ${quote}
        </p>

        <h4 id="author">— ${author}</h4>`;
};

const getQuotes = async () => {
  try {
    const blob = await fetch(
      "https://motivational-spark-api.vercel.app/api/quotes/random",
    );
    const { author, quote } = await blob.json();
    renderQuoteUI(author, quote);
  } catch (error) {
    console.log("error is -> ", error);
  }
};

quoteBtn.addEventListener("click", () => {
  getQuotes();
});

// MOTIVATION

// SETTING

// THEME
const settingSlider = document.querySelector(".slider");
const themeToggle = document.querySelector(".switch input");
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");
  themeToggle.checked = true;
}

settingSlider.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "white");
  }
});

// POMODORO

const pomodoroFocusInp = document.querySelector("#pomodoroFocusInp");
const pomodoroShortInp = document.querySelector("#pomodoroShortInp");
const pomodoroLongInp = document.querySelector("#pomodoroLongInp");

let pomodorTimes = JSON.parse(localStorage.getItem("pomodoroTimes")) || {
  focus: 25,
  short: 5,
  long: 45,
};

const { focus, short, long } = pomodorTimes;

pomodoroFocusInp.value = Number(focus);
pomodoroShortInp.value = Number(short);
pomodoroLongInp.value = Number(long);

const pomoSet = () => {
  pomodoroFocusInp.addEventListener("input", (e) => {
    pomodorTimes["focus"] = Number(e.target.value);
    localStorage.setItem("pomodoroTimes", JSON.stringify(pomodorTimes));

    if (breakState === "focus") {
      time = pomodorTimes.focus * 60;
      focusUpdateDisplay();
    }
  });
  pomodoroShortInp.addEventListener("input", (e) => {
    pomodorTimes["short"] = Number(e.target.value);
    localStorage.setItem("pomodoroTimes", JSON.stringify(pomodorTimes));

    if (breakState === "short") {
      time = pomodorTimes.short * 60;
      focusUpdateDisplay();
    }
  });
  pomodoroLongInp.addEventListener("input", (e) => {
    pomodorTimes["long"] = Number(e.target.value);
    localStorage.setItem("pomodoroTimes", JSON.stringify(pomodorTimes));

    if (breakState === "long") {
      time = pomodorTimes.long * 60;
      focusUpdateDisplay();
    }
  });
};
pomoSet();
