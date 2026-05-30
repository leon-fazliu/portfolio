const authCard = document.querySelector("#authCard");
const dashboardPanel = document.querySelector("#dashboardPanel");
const authForm = document.querySelector("#authForm");
const formTitle = document.querySelector("#formTitle");
const formLead = document.querySelector("#formLead");
const submitButton = document.querySelector("#submitButton");
const switchMode = document.querySelector("#switchMode");
const switchText = document.querySelector("#switchText");
const registerOnly = document.querySelector(".register-only");
const errorMessage = document.querySelector("#errorMessage");
const successMessage = document.querySelector("#successMessage");
const logoutButton = document.querySelector("#logoutButton");
const userName = document.querySelector("#userName");
const profileName = document.querySelector("#profileName");
const profileEmail = document.querySelector("#profileEmail");

let isRegisterMode = false;
let demoUser = {
  name: "Alex Morgan",
  email: "client@example.com",
  password: "123456"
};

function showMessage(type, text) {
  errorMessage.classList.add("hidden");
  successMessage.classList.add("hidden");

  const message = type === "error" ? errorMessage : successMessage;
  message.textContent = text;
  message.classList.remove("hidden");
}

function toggleMode() {
  isRegisterMode = !isRegisterMode;
  registerOnly.classList.toggle("hidden", !isRegisterMode);
  formTitle.textContent = isRegisterMode ? "Create client account" : "Sign in to ClientFlow";
  formLead.textContent = isRegisterMode
    ? "Create a demo client account and then sign in to the portal dashboard."
    : "A polished authentication and client dashboard prototype. The PHP/MySQL backend version is included in this project folder.";
  submitButton.textContent = isRegisterMode ? "Create account" : "Sign in";
  switchText.textContent = isRegisterMode ? "Already have access?" : "Need a new client account?";
  switchMode.textContent = isRegisterMode ? "Sign in" : "Register";
  errorMessage.classList.add("hidden");
  successMessage.classList.add("hidden");
}

function showDashboard(user) {
  userName.textContent = user.name.split(" ")[0];
  profileName.textContent = user.name;
  profileEmail.textContent = user.email;
  authCard.classList.add("hidden");
  dashboardPanel.classList.remove("hidden");
}

authForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(authForm);
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  if (isRegisterMode) {
    if (!name || !email || password.length < 6) {
      showMessage("error", "Fill in the name, email and a password with at least 6 characters.");
      return;
    }

    demoUser = { name, email, password };
    showMessage("success", "The demo account was created. You can now log in.");
    toggleMode();
    authForm.reset();
    return;
  }

  if (email === demoUser.email && password === demoUser.password) {
    showDashboard(demoUser);
    return;
  }

  showMessage("error", "For the demo use client@example.com and password 123456, or create an account.");
});

switchMode.addEventListener("click", toggleMode);

logoutButton.addEventListener("click", () => {
  dashboardPanel.classList.add("hidden");
  authCard.classList.remove("hidden");
  authForm.reset();
});
