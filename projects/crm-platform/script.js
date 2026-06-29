const navLinks = document.querySelectorAll(".nav-link");
const views = document.querySelectorAll(".view");
const customPickers = document.querySelectorAll(".custom-picker");
const pipelineValue = document.querySelector("#pipelineValue");
const clientCount = document.querySelector("#clientCount");
const clientSegmentLabel = document.querySelector("#clientSegmentLabel");
const winRate = document.querySelector("#winRate");
const dueToday = document.querySelector("#dueToday");
const quotaPercent = document.querySelector("#quotaPercent");
const quotaBar = document.querySelector("#quotaBar");
const quotaLabel = document.querySelector("#quotaLabel");
const forecastFilter = document.querySelector("#forecastFilter");
const forecastChart = document.querySelector("#forecastChart");
const priorityList = document.querySelector("#priorityList");
const dealSearch = document.querySelector("#dealSearch");
const stageFilter = document.querySelector("#stageFilter");
const pipelineBoard = document.querySelector("#pipelineBoard");
const clientSearch = document.querySelector("#clientSearch");
const clientList = document.querySelector("#clientList");
const profileName = document.querySelector("#profileName");
const profileMeta = document.querySelector("#profileMeta");
const profileStatus = document.querySelector("#profileStatus");
const profileValue = document.querySelector("#profileValue");
const profileOwner = document.querySelector("#profileOwner");
const profileHealth = document.querySelector("#profileHealth");
const activityList = document.querySelector("#activityList");
const taskFilter = document.querySelector("#taskFilter");
const taskGrid = document.querySelector("#taskGrid");
const scoreList = document.querySelector("#scoreList");
const healthList = document.querySelector("#healthList");
const dealDialog = document.querySelector("#dealDialog");
const openDealForm = document.querySelector("#openDealForm");
const closeDealForm = document.querySelector("#closeDealForm");
const dealForm = document.querySelector("#dealForm");
const exportReport = document.querySelector("#exportReport");
const toast = document.querySelector("#toast");

const stages = ["Lead", "Discovery", "Proposal", "Negotiation", "Won"];
const monthlyTarget = 120000;

let deals = [
  {
    id: 1,
    company: "Northline Studio",
    contact: "Emma Carter",
    segment: "SMB",
    stage: "Proposal",
    value: 18400,
    probability: 55,
    owner: "Mia Roberts",
    health: 82,
    closeDate: "Jul 12",
    tags: ["Website redesign", "CMS"],
    notes: ["Proposal sent for website redesign.", "Client requested CMS options.", "Follow-up scheduled for Friday."]
  },
  {
    id: 2,
    company: "BrightMart Supply",
    contact: "Daniel Brooks",
    segment: "Enterprise",
    stage: "Negotiation",
    value: 42000,
    probability: 72,
    owner: "Alex Morgan",
    health: 76,
    closeDate: "Jul 18",
    tags: ["Inventory", "Dashboard"],
    notes: ["Pricing discussion completed.", "Inventory dashboard is primary requirement.", "Decision expected next week."]
  },
  {
    id: 3,
    company: "MediBook Clinic",
    contact: "Sophia Turner",
    segment: "SMB",
    stage: "Won",
    value: 24100,
    probability: 100,
    owner: "Mia Roberts",
    health: 94,
    closeDate: "Closed",
    tags: ["Booking", "Healthcare"],
    notes: ["Booking workflow approved.", "Admin dashboard moved to implementation.", "Training session requested."]
  },
  {
    id: 4,
    company: "Urban Desk Co.",
    contact: "Liam Johnson",
    segment: "Startup",
    stage: "Lead",
    value: 6800,
    probability: 18,
    owner: "Noah Chen",
    health: 61,
    closeDate: "Aug 03",
    tags: ["Landing page", "Menu"],
    notes: ["Needs landing page and menu management.", "Waiting for branding assets."]
  },
  {
    id: 5,
    company: "Apex Retail Group",
    contact: "Sarah Mitchell",
    segment: "Enterprise",
    stage: "Discovery",
    value: 36500,
    probability: 34,
    owner: "Alex Morgan",
    health: 73,
    closeDate: "Aug 09",
    tags: ["E-commerce", "Integrations"],
    notes: ["Discovery call completed.", "Needs Shopify and ERP integration.", "Technical requirements review pending."]
  },
  {
    id: 6,
    company: "ClearPath Logistics",
    contact: "James Wilson",
    segment: "Enterprise",
    stage: "Proposal",
    value: 58800,
    probability: 62,
    owner: "Nora Lee",
    health: 88,
    closeDate: "Jul 26",
    tags: ["Logistics", "Portal"],
    notes: ["Client wants driver portal.", "Security requirements confirmed.", "Proposal review set for Monday."]
  }
];

let tasks = [
  { id: 1, title: "Send revised proposal", company: "ClearPath Logistics", owner: "Nora Lee", due: "Today", priority: "High" },
  { id: 2, title: "Prepare pricing options", company: "BrightMart Supply", owner: "Alex Morgan", due: "Today", priority: "High" },
  { id: 3, title: "Book discovery workshop", company: "Apex Retail Group", owner: "Alex Morgan", due: "Tomorrow", priority: "Medium" },
  { id: 4, title: "Collect brand assets", company: "Urban Desk Co.", owner: "Noah Chen", due: "This week", priority: "Low" },
  { id: 5, title: "Schedule onboarding call", company: "MediBook Clinic", owner: "Mia Roberts", due: "This week", priority: "Medium" }
];

const team = [
  { name: "Alex Morgan", closed: 42000, pipeline: 78500, meetings: 14 },
  { name: "Mia Roberts", closed: 24100, pipeline: 42500, meetings: 11 },
  { name: "Nora Lee", closed: 0, pipeline: 58800, meetings: 9 },
  { name: "Noah Chen", closed: 0, pipeline: 6800, meetings: 6 }
];

let activeClientId = deals[0].id;

function money(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.setTimeout(() => toast.classList.remove("is-visible"), 2400);
}

function setView(viewName) {
  views.forEach((view) => view.classList.toggle("is-visible", view.dataset.panel === viewName));
  navLinks.forEach((link) => link.classList.toggle("is-active", link.dataset.view === viewName));
}

function filteredDeals() {
  const query = dealSearch.value.trim().toLowerCase();
  const stage = stageFilter.value;
  return deals.filter((deal) => {
    const text = [deal.company, deal.contact, deal.owner, deal.segment, ...deal.tags].join(" ").toLowerCase();
    return text.includes(query) && (stage === "all" || deal.stage === stage);
  });
}

function renderMetrics() {
  const weighted = deals.reduce((sum, deal) => sum + deal.value * (deal.probability / 100), 0);
  const won = deals.filter((deal) => deal.stage === "Won");
  const closedValue = won.reduce((sum, deal) => sum + deal.value, 0);
  const enterprise = deals.filter((deal) => deal.segment === "Enterprise").length;
  const percent = Math.min(100, Math.round((closedValue / monthlyTarget) * 100));

  pipelineValue.textContent = money(weighted);
  clientCount.textContent = deals.length;
  clientSegmentLabel.textContent = `${enterprise} enterprise accounts`;
  winRate.textContent = `${Math.round((won.length / deals.length) * 100)}%`;
  dueToday.textContent = tasks.filter((task) => task.due === "Today").length;
  quotaPercent.textContent = `${percent}%`;
  quotaBar.style.width = `${percent}%`;
  quotaLabel.textContent = `${money(closedValue)} closed from ${money(monthlyTarget)} goal`;
}

function renderForecast() {
  const segment = forecastFilter.value;
  const visible = segment === "all" ? deals : deals.filter((deal) => deal.segment === segment);
  const totals = stages.map((stage) => ({
    stage,
    value: visible.filter((deal) => deal.stage === stage).reduce((sum, deal) => sum + deal.value, 0)
  }));
  const max = Math.max(...totals.map((item) => item.value), 1);

  forecastChart.innerHTML = totals.map((item) => `
    <div class="forecast-row">
      <strong>${item.stage}</strong>
      <div class="progress-track"><span style="width: ${(item.value / max) * 100}%"></span></div>
      <small>${money(item.value)}</small>
    </div>
  `).join("");
}

function renderPriority() {
  const priorityDeals = deals
    .filter((deal) => deal.stage !== "Won")
    .sort((a, b) => (b.value * b.probability) - (a.value * a.probability))
    .slice(0, 4);

  priorityList.innerHTML = priorityDeals.map((deal) => `
    <article class="priority-card">
      <div>
        <h3>${deal.company}</h3>
        <p>${deal.contact} · ${deal.stage} · closes ${deal.closeDate}</p>
      </div>
      <div class="card-meta">
        <span class="badge info">${money(deal.value)}</span>
        <span class="badge ${deal.health > 80 ? "good" : "warn"}">${deal.health}% health</span>
      </div>
    </article>
  `).join("");
}

function renderPipeline() {
  const visible = filteredDeals();
  pipelineBoard.innerHTML = stages.map((stage) => {
    const stageDeals = visible.filter((deal) => deal.stage === stage);
    const total = stageDeals.reduce((sum, deal) => sum + deal.value, 0);
    return `
      <section class="kanban-column">
        <div class="column-head">
          <strong>${stage}</strong>
          <span class="badge info">${money(total)}</span>
        </div>
        <div class="deal-list">
          ${stageDeals.map((deal) => `
            <article class="deal-card ${deal.id === activeClientId ? "is-selected" : ""}" data-id="${deal.id}">
              <div>
                <h3>${deal.company}</h3>
                <p>${deal.contact} · ${deal.owner}</p>
              </div>
              <div class="deal-meta">
                <span class="badge info">${money(deal.value)}</span>
                <span class="badge ${deal.probability >= 60 ? "good" : "warn"}">${deal.probability}%</span>
              </div>
            </article>
          `).join("")}
        </div>
      </section>
    `;
  }).join("");
}

function renderClients() {
  const query = clientSearch.value.trim().toLowerCase();
  const visible = deals.filter((deal) => [deal.company, deal.contact, deal.segment, deal.owner].join(" ").toLowerCase().includes(query));
  clientList.innerHTML = visible.map((deal) => `
    <button class="client-card ${deal.id === activeClientId ? "is-active" : ""}" type="button" data-id="${deal.id}">
      <strong>${deal.company}</strong>
      <span>${deal.contact} · ${deal.segment} · ${deal.stage}</span>
    </button>
  `).join("");
}

function renderProfile() {
  const deal = deals.find((item) => item.id === activeClientId) || deals[0];
  profileName.textContent = deal.company;
  profileMeta.textContent = `${deal.contact} · ${deal.segment} account · closes ${deal.closeDate}`;
  profileStatus.textContent = deal.stage;
  profileValue.textContent = money(deal.value);
  profileOwner.textContent = deal.owner;
  profileHealth.textContent = `${deal.health}%`;
  activityList.innerHTML = deal.notes.map((note) => `<li>${note}</li>`).join("");
}

function renderTasks() {
  const filter = taskFilter.value;
  const visible = tasks.filter((task) => filter === "all" || task.due === filter);
  taskGrid.innerHTML = visible.map((task) => `
    <article class="task-card">
      <div>
        <h3>${task.title}</h3>
        <p>${task.company} · ${task.owner}</p>
      </div>
      <span class="badge ${task.priority === "High" ? "danger" : task.priority === "Medium" ? "warn" : "good"}">${task.due}</span>
    </article>
  `).join("");
}

function renderReports() {
  scoreList.innerHTML = team.map((member) => `
    <article class="score-card">
      <div>
        <h3>${member.name}</h3>
        <p>${member.meetings} meetings this month</p>
      </div>
      <div class="card-meta">
        <span class="badge good">${money(member.closed)} closed</span>
        <span class="badge info">${money(member.pipeline)} pipeline</span>
      </div>
    </article>
  `).join("");

  healthList.innerHTML = deals.map((deal) => `
    <article class="health-card">
      <div>
        <h3>${deal.company}</h3>
        <p>${deal.owner} · ${deal.stage}</p>
      </div>
      <div class="progress-track"><span style="width: ${deal.health}%"></span></div>
      <span class="badge ${deal.health > 80 ? "good" : deal.health > 65 ? "warn" : "danger"}">${deal.health}% health</span>
    </article>
  `).join("");
}

function renderAll() {
  renderMetrics();
  renderForecast();
  renderPriority();
  renderPipeline();
  renderClients();
  renderProfile();
  renderTasks();
  renderReports();
}

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    setView(link.dataset.view);
  });
});

dealSearch.addEventListener("input", renderPipeline);
stageFilter.addEventListener("input", renderPipeline);
clientSearch.addEventListener("input", renderClients);
forecastFilter.addEventListener("input", renderForecast);
taskFilter.addEventListener("input", renderTasks);

function closeCustomPicker(picker) {
  picker.classList.remove("is-open");
  picker.querySelector(".custom-toggle").setAttribute("aria-expanded", "false");
}

customPickers.forEach((picker) => {
  const toggle = picker.querySelector(".custom-toggle");
  const label = toggle.querySelector("span");
  const input = picker.previousElementSibling;

  toggle.addEventListener("click", () => {
    const isOpen = picker.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    customPickers.forEach((otherPicker) => {
      if (otherPicker !== picker) closeCustomPicker(otherPicker);
    });
  });

  picker.addEventListener("click", (event) => {
    const option = event.target.closest("[data-value]");
    if (!option) return;

    input.value = option.dataset.value;
    label.textContent = option.dataset.label;
    picker.querySelectorAll("[data-value]").forEach((button) => {
      button.classList.toggle("is-selected", button === option);
    });
    closeCustomPicker(picker);
    input.dispatchEvent(new Event("input"));
  });
});

document.addEventListener("click", (event) => {
  if (event.target.closest(".custom-picker")) return;
  customPickers.forEach((picker) => closeCustomPicker(picker));
});

pipelineBoard.addEventListener("click", (event) => {
  const card = event.target.closest(".deal-card");
  if (!card) return;
  activeClientId = Number(card.dataset.id);
  renderPipeline();
  renderClients();
  renderProfile();
  setView("clients");
});

clientList.addEventListener("click", (event) => {
  const card = event.target.closest(".client-card");
  if (!card) return;
  activeClientId = Number(card.dataset.id);
  renderClients();
  renderProfile();
});

openDealForm.addEventListener("click", () => {
  dealForm.reset();
  dealDialog.showModal();
});

closeDealForm.addEventListener("click", () => dealDialog.close());

dealForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(dealForm);
  const deal = {
    id: Date.now(),
    company: formData.get("company").trim(),
    contact: formData.get("contact").trim(),
    segment: formData.get("segment"),
    stage: formData.get("stage"),
    value: Number(formData.get("value")),
    probability: Number(formData.get("probability")),
    owner: "Mia Roberts",
    health: 70,
    closeDate: "New forecast",
    tags: ["New opportunity"],
    notes: ["Deal created from the CRM intake form.", "Qualification call should be scheduled."]
  };

  deals.unshift(deal);
  tasks.unshift({
    id: Date.now() + 1,
    title: "Schedule qualification call",
    company: deal.company,
    owner: deal.owner,
    due: "Today",
    priority: "High"
  });
  activeClientId = deal.id;
  dealDialog.close();
  showToast("Deal added to the pipeline.");
  renderAll();
});

exportReport.addEventListener("click", () => {
  const weighted = deals.reduce((sum, deal) => sum + deal.value * (deal.probability / 100), 0);
  showToast(`Forecast exported: ${money(weighted)} weighted pipeline.`);
});

renderAll();
