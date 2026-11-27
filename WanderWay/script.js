console.log("Hello");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let checkbox = document.querySelector("#checkbox");
let button = document.querySelector("#loginButton");
let emailError = document.querySelector("#emailError");
let passwordError = document.querySelector("#passwordError");
let loginMessage = document.querySelector("#loginMessage");
let togglePassword = document.querySelector("#togglePassword");
let forgetpassword = document.querySelector("#forgetpassword");
let homePage = document.querySelector("#homePage");

// forget password ===>>>
forgetpassword.addEventListener("click", () => {
  if (email.value === "") {
    emailError.textContent = "Please enter your email first";
    emailError.style.color = "red";
  } else {
    emailError.textContent = "Password reset link sent!";
    emailError.style.color = "green";
  }
});

// this show / hide password

togglePassword.addEventListener("click", () => {
  if (password.type === "password") {
    password.type = "text";
    togglePassword.textContent = "Hide";
  } else {
    password.type = "password";
    togglePassword.textContent = "Show";
  }
});

button.addEventListener("click", () => {
  let pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Clear previous messages
  emailError.textContent = "";
  passwordError.textContent = "";
  loginMessage.textContent = "";

  // email validation check ===>>>

  if (email.value === "") {
    emailError.textContent = "Please enter your email";
    emailError.style.color = "red";
  } else if (!pattern.test(email.value)) {
    emailError.textContent = "Please enter a valid email";
  } else {
    emailError.textContent = "";
  }

  // password validation check ==>>

  if (password.value === "") {
    passwordError.textContent = "Please enter your password";
    passwordError.style.color = "red";
  } else if (password.value.length < 8) {
    passwordError.textContent = "Password must be at least 8 characters";
    passwordError.style.color = "red";
  } else {
    passwordError.textContent = "";
  }

  let emailValid = pattern.test(email.value);
  let passwordValid = password.value.length >= 8;

  if (emailValid && passwordValid) {
    loginMessage.textContent = "Login successful!";
    loginMessage.style.color = "green";

    loginCard.style.display = "none";
    signupCard.style.display = "none";
    document.querySelector(".login-container").classList.add("hidden");
    homePage.style.display = "block";

    if (checkbox.checked) {
      localStorage.setItem("savedEmail", email.value);
    } else {
      localStorage.removeItem("savedEmail");
    }
    email.value = "";
    password.value = "";
  }
});

// to stote  the user data  in localstorage...../

if (localStorage.getItem("savedEmail")) {
  email.value = localStorage.getItem("savedEmail");
  checkbox.checked = true;
}
let signup = document.querySelector("#signup");
let signupCard = document.querySelector("#signupCard");
let loginCard = document.querySelector(".login-card");
let backToLogin = document.querySelector("#backToLogin");

let signupName = document.querySelector("#signupName");
let signupEmail = document.querySelector("#signupEmail");
let signupPassword = document.querySelector("#signupPassword");
let signupMessage = document.querySelector("#signupMessage");
let createAccount = document.querySelector("#createAccount");

// Open signup page
signup.addEventListener("click", (e) => {
  e.preventDefault();
  loginCard.style.display = "none";
  signupCard.style.display = "block";
});

// Back to login
backToLogin.addEventListener("click", (e) => {
  e.preventDefault();
  signupCard.style.display = "none";
  loginCard.style.display = "block";
});

// Create account
createAccount.addEventListener("click", () => {
  let pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  signupMessage.style.color = "red";

  if (signupName.value.trim() === "") {
    signupMessage.textContent = "Please enter your name";
  } else if (!pattern.test(signupEmail.value)) {
    signupMessage.textContent = "Please enter a valid email";
  } else if (signupPassword.value.length < 8) {
    signupMessage.textContent = "Password must be at least 8 characters";
  } else {
    signupMessage.textContent = "Account created successfully!";
    signupMessage.style.color = "green";
  }
});

/* Destination category filtering and search */

const filterButtons = document.querySelectorAll(".filter-btn");
const destinationCards = document.querySelectorAll(".destination-card");
const searchInput = document.querySelector("#destination");
const searchButton = document.querySelector("#searchButton");
const noResults = document.querySelector("#noResults");

let selectedCategory = "all";

function filterDestinations() {
  const searchText = searchInput.value.toLowerCase().trim();
  let visibleCards = 0;

  destinationCards.forEach((card) => {
    const category = card.dataset.category;
    const cardText = card.textContent.toLowerCase();

    const categoryMatch =
      selectedCategory === "all" || category === selectedCategory;

    const searchMatch = cardText.includes(searchText);

    if (categoryMatch && searchMatch) {
      card.style.display = "block";
      visibleCards++;
    } else {
      card.style.display = "none";
    }
  });

  noResults.hidden = visibleCards !== 0;
}

// Category buttons
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));

    button.classList.add("active");
    selectedCategory = button.dataset.filter;

    filterDestinations();
  });
});

// Search button
searchButton.addEventListener("click", filterDestinations);

// Search while typing
searchInput.addEventListener("input", filterDestinations);

// Search when Enter is pressed
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    filterDestinations();
  }
});

// Temporarily bypass login and show homepage directly
document.querySelector(".login-container").style.display = "none";
homePage.style.display = "block";