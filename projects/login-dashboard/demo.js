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
  name: "Leon Fazliu",
  email: "email@example.com",
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
  formTitle.textContent = isRegisterMode ? "Register" : "Login";
  formLead.textContent = isRegisterMode
    ? "Krijo nje llogari demo dhe pastaj kycu ne dashboard."
    : "Demo vizuale qe hapet direkt ne browser. Versioni PHP/MySQL eshte ne te njejtin folder.";
  submitButton.textContent = isRegisterMode ? "Regjistrohu" : "Kycu";
  switchText.textContent = isRegisterMode ? "Ke llogari?" : "Nuk ke llogari?";
  switchMode.textContent = isRegisterMode ? "Kycu" : "Regjistrohu";
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
      showMessage("error", "Ploteso emrin, email dhe fjalekalim me te pakten 6 karaktere.");
      return;
    }

    demoUser = { name, email, password };
    showMessage("success", "Llogaria demo u krijua. Tani mund te kycesh.");
    toggleMode();
    authForm.reset();
    return;
  }

  if (email === demoUser.email && password === demoUser.password) {
    showDashboard(demoUser);
    return;
  }

  showMessage("error", "Per demo perdor email@example.com dhe fjalekalim 123456, ose krijo llogari.");
});

switchMode.addEventListener("click", toggleMode);

logoutButton.addEventListener("click", () => {
  dashboardPanel.classList.add("hidden");
  authCard.classList.remove("hidden");
  authForm.reset();
});
