const bookingForm = document.querySelector("#bookingForm");
const patientName = document.querySelector("#patientName");
const patientEmail = document.querySelector("#patientEmail");
const serviceSelect = document.querySelector("#serviceSelect");
const doctorSelect = document.querySelector("#doctorSelect");
const dateInput = document.querySelector("#dateInput");
const timeInput = document.querySelector("#timeInput");
const formMessage = document.querySelector("#formMessage");
const appointmentsList = document.querySelector("#appointmentsList");
const filterButtons = document.querySelectorAll(".filter-btn");
const totalAppointments = document.querySelector("#totalAppointments");
const confirmedAppointments = document.querySelector("#confirmedAppointments");
const pendingAppointments = document.querySelector("#pendingAppointments");

const storageKey = "medibook-appointments-v2";

let currentFilter = "all";
let appointments = JSON.parse(localStorage.getItem(storageKey)) || [
  {
    id: 1,
    patient: "Emma Carter",
    email: "arta@example.com",
    service: "General Checkup",
    doctor: "Dr. Sarah Bennett",
    date: "2026-06-03",
    time: "09:30",
    status: "Confirmed"
  },
  {
    id: 2,
    patient: "Daniel Brooks",
    email: "dion@example.com",
    service: "Dental Consultation",
    doctor: "Dr. Michael Adams",
    date: "2026-06-04",
    time: "11:00",
    status: "Pending"
  },
  {
    id: 3,
    patient: "Sophia Turner",
    email: "nora@example.com",
    service: "Dermatology",
    doctor: "Dr. Olivia Reed",
    date: "2026-06-05",
    time: "14:30",
    status: "Confirmed"
  }
];

function saveAppointments() {
  localStorage.setItem(storageKey, JSON.stringify(appointments));
}

function updateSummary() {
  const confirmed = appointments.filter((appointment) => appointment.status === "Confirmed").length;
  const pending = appointments.filter((appointment) => appointment.status === "Pending").length;

  totalAppointments.textContent = appointments.length;
  confirmedAppointments.textContent = confirmed;
  pendingAppointments.textContent = pending;
}

function getVisibleAppointments() {
  if (currentFilter === "all") {
    return appointments;
  }

  return appointments.filter((appointment) => appointment.status === currentFilter);
}

function renderAppointments() {
  const visibleAppointments = getVisibleAppointments();

  if (!visibleAppointments.length) {
    appointmentsList.innerHTML = '<div class="empty-state">No appointments match this filter.</div>';
    updateSummary();
    return;
  }

  appointmentsList.innerHTML = visibleAppointments
    .map((appointment) => `
      <article class="appointment-card">
        <div>
          <h4>${appointment.patient}</h4>
          <p>${appointment.service} with ${appointment.doctor}</p>
          <p>${appointment.date} at ${appointment.time} • ${appointment.email}</p>
        </div>
        <span class="status ${appointment.status}">${appointment.status}</span>
      </article>
    `)
    .join("");

  updateSummary();
}

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = patientName.value.trim();
  const email = patientEmail.value.trim();
  const date = dateInput.value;
  const time = timeInput.value;

  if (!name || !email || !date || !time) {
    formMessage.textContent = "Please complete patient name, email, date and time.";
    return;
  }

  appointments.unshift({
    id: Date.now(),
    patient: name,
    email,
    service: serviceSelect.value,
    doctor: doctorSelect.value,
    date,
    time,
    status: "Pending"
  });

  formMessage.textContent = "";
  bookingForm.reset();
  saveAppointments();
  renderAppointments();
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;

    filterButtons.forEach((filterButton) => {
      filterButton.classList.toggle("is-active", filterButton === button);
    });

    renderAppointments();
  });
});

saveAppointments();
renderAppointments();
