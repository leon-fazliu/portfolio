const navLinks = document.querySelectorAll(".nav-link");
const views = document.querySelectorAll(".view");
const customPickers = document.querySelectorAll(".custom-picker");
const productsTable = document.querySelector("#productsTable");
const productSearch = document.querySelector("#productSearch");
const stockFilter = document.querySelector("#stockFilter");
const categoryFilter = document.querySelector("#categoryFilter");
const categoryOptions = document.querySelector("#categoryOptions");
const categoryPicker = document.querySelector("#categoryPicker");
const orderFilter = document.querySelector("#orderFilter");
const warehouseSelect = document.querySelector("#warehouseSelect");
const totalProducts = document.querySelector("#totalProducts");
const activeProductsLabel = document.querySelector("#activeProductsLabel");
const stockValue = document.querySelector("#stockValue");
const lowStock = document.querySelector("#lowStock");
const openOrders = document.querySelector("#openOrders");
const urgentOrdersLabel = document.querySelector("#urgentOrdersLabel");
const warehouseHealth = document.querySelector("#warehouseHealth");
const warehouseHealthBar = document.querySelector("#warehouseHealthBar");
const orderChart = document.querySelector("#orderChart");
const alertList = document.querySelector("#alertList");
const orderList = document.querySelector("#orderList");
const purchaseList = document.querySelector("#purchaseList");
const supplierGrid = document.querySelector("#supplierGrid");
const activityTimeline = document.querySelector("#activityTimeline");
const productDialog = document.querySelector("#productDialog");
const openProductForm = document.querySelector("#openProductForm");
const closeProductForm = document.querySelector("#closeProductForm");
const productForm = document.querySelector("#productForm");
const createPurchaseOrder = document.querySelector("#createPurchaseOrder");
const exportButton = document.querySelector("#exportButton");
const toast = document.querySelector("#toast");

let products = [
  { id: 1, name: "Wireless Headset Max", sku: "AUD-241", category: "Audio", warehouse: "North Hub", stock: 84, reorder: 25, cost: 74, supplier: "Nexora Supply" },
  { id: 2, name: "Smart Watch Pro", sku: "WCH-118", category: "Wearables", warehouse: "Central DC", stock: 12, reorder: 30, cost: 126, supplier: "Vector Parts" },
  { id: 3, name: "USB-C Docking Station", sku: "ACC-432", category: "Accessories", warehouse: "South Hub", stock: 136, reorder: 40, cost: 58, supplier: "Nexora Supply" },
  { id: 4, name: "Mechanical Keyboard X2", sku: "KEY-710", category: "Peripherals", warehouse: "Central DC", stock: 9, reorder: 24, cost: 89, supplier: "OmniTech Wholesale" },
  { id: 5, name: "Portable SSD 2TB", sku: "DRV-903", category: "Storage", warehouse: "North Hub", stock: 42, reorder: 18, cost: 142, supplier: "Vector Parts" },
  { id: 6, name: "4K Conference Webcam", sku: "CAM-440", category: "Video", warehouse: "South Hub", stock: 7, reorder: 20, cost: 96, supplier: "PrimeLink Distribution" },
  { id: 7, name: "POS Terminal Pro", sku: "POS-210", category: "Retail Hardware", warehouse: "Central DC", stock: 31, reorder: 12, cost: 218, supplier: "PrimeLink Distribution" },
  { id: 8, name: "Barcode Scanner Elite", sku: "SCN-812", category: "Retail Hardware", warehouse: "North Hub", stock: 54, reorder: 20, cost: 77, supplier: "OmniTech Wholesale" }
];

let orders = [
  { id: "SO-2841", customer: "Northline Studio", items: "12 units", value: 3420, status: "Picking", priority: "High", warehouse: "Central DC", due: "Today" },
  { id: "SO-2840", customer: "BrightMart Supply", items: "8 units", value: 1188, status: "Ready to ship", priority: "Standard", warehouse: "North Hub", due: "Tomorrow" },
  { id: "SO-2839", customer: "Carter Retail Group", items: "21 units", value: 5870, status: "Backordered", priority: "High", warehouse: "South Hub", due: "Today" },
  { id: "SO-2838", customer: "Urban Desk Co.", items: "5 units", value: 620, status: "Ready to ship", priority: "Standard", warehouse: "Central DC", due: "Friday" }
];

let purchaseOrders = [
  { id: "PO-9182", supplier: "Vector Parts", item: "Smart Watch Pro", eta: "2 days", progress: 72, value: 15400 },
  { id: "PO-9178", supplier: "PrimeLink Distribution", item: "4K Conference Webcam", eta: "5 days", progress: 36, value: 8800 },
  { id: "PO-9171", supplier: "OmniTech Wholesale", item: "Mechanical Keyboard X2", eta: "Arrives today", progress: 91, value: 6400 }
];

const suppliers = [
  { name: "Nexora Supply", country: "Germany", score: 98, leadTime: "3.1 days", fillRate: "97%", spend: "$42.8K" },
  { name: "Vector Parts", country: "Netherlands", score: 91, leadTime: "4.4 days", fillRate: "93%", spend: "$38.2K" },
  { name: "OmniTech Wholesale", country: "Poland", score: 88, leadTime: "5.2 days", fillRate: "89%", spend: "$24.6K" },
  { name: "PrimeLink Distribution", country: "Austria", score: 84, leadTime: "5.8 days", fillRate: "86%", spend: "$31.3K" }
];

let activities = [
  { time: "09:42", type: "Stock adjustment", text: "Smart Watch Pro marked below reorder point.", actor: "System" },
  { time: "10:18", type: "Order update", text: "SO-2841 moved to picking queue.", actor: "Operations" },
  { time: "11:05", type: "Purchase order", text: "PO-9182 confirmed by Vector Parts.", actor: "Procurement" },
  { time: "12:30", type: "Receiving", text: "54 Barcode Scanner Elite units received at North Hub.", actor: "Warehouse" }
];

const weeklyOrders = {
  all: [64, 82, 78, 96, 112, 88, 104],
  north: [28, 32, 26, 38, 41, 34, 39],
  central: [22, 31, 34, 42, 48, 36, 45],
  south: [14, 19, 18, 16, 23, 18, 20]
};

function money(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
}

function getStatus(product) {
  if (product.stock <= Math.round(product.reorder * 0.5)) return "critical";
  if (product.stock < product.reorder) return "low";
  return "healthy";
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

function populateCategories() {
  const categories = [...new Set(products.map((product) => product.category))].sort();
  const current = categoryFilter.value;
  categoryFilter.value = categories.includes(current) ? current : "all";
  categoryOptions.innerHTML = `<button type="button" data-value="all" data-label="All categories">All categories</button>${categories.map((category) => (
    `<button type="button" data-value="${category}" data-label="${category}">${category}</button>`
  )).join("")}`;
  categoryPicker.querySelector(".custom-toggle span").textContent = categoryFilter.value === "all" ? "All categories" : categoryFilter.value;
}

function filteredProducts() {
  const query = productSearch.value.trim().toLowerCase();
  const stock = stockFilter.value;
  const category = categoryFilter.value;

  return products.filter((product) => {
    const matchesQuery = [product.name, product.sku, product.category, product.supplier]
      .join(" ")
      .toLowerCase()
      .includes(query);
    const status = getStatus(product);
    const matchesStock = stock === "all" || stock === status;
    const matchesCategory = category === "all" || product.category === category;
    return matchesQuery && matchesStock && matchesCategory;
  });
}

function renderProducts() {
  productsTable.innerHTML = filteredProducts().map((product) => {
    const status = getStatus(product);
    const statusText = status === "critical" ? "Critical" : status === "low" ? "Low stock" : "Healthy";
    return `
      <tr>
        <td>
          <span class="product-cell">
            <strong>${product.name}</strong>
            <small>${product.supplier}</small>
          </span>
        </td>
        <td>${product.sku}</td>
        <td>${product.category}</td>
        <td>${product.warehouse}</td>
        <td>${product.stock}</td>
        <td>${product.reorder}</td>
        <td>${money(product.stock * product.cost)}</td>
        <td><span class="badge ${status}">${statusText}</span></td>
        <td><button class="row-btn" type="button" data-restock="${product.id}">Restock</button></td>
      </tr>
    `;
  }).join("");
}

function renderMetrics() {
  const totalValue = products.reduce((sum, product) => sum + product.stock * product.cost, 0);
  const lowProducts = products.filter((product) => getStatus(product) !== "healthy");
  const urgentOrders = orders.filter((order) => order.priority === "High").length;
  const health = Math.max(0, Math.round(((products.length - lowProducts.length) / products.length) * 100));

  totalProducts.textContent = products.length;
  activeProductsLabel.textContent = `${new Set(products.map((product) => product.category)).size} categories tracked`;
  stockValue.textContent = money(totalValue);
  lowStock.textContent = lowProducts.length;
  openOrders.textContent = orders.length;
  urgentOrdersLabel.textContent = `${urgentOrders} urgent fulfillment`;
  warehouseHealth.textContent = `${health}%`;
  warehouseHealthBar.style.width = `${health}%`;
}

function renderChart() {
  const values = weeklyOrders[warehouseSelect.value];
  const max = Math.max(...values);
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  orderChart.innerHTML = values.map((value, index) => `
    <div class="bar">
      <div class="bar-fill" style="height: ${Math.max(16, (value / max) * 230)}px"></div>
      <strong>${value}</strong>
      <small>${days[index]}</small>
    </div>
  `).join("");
}

function renderAlerts() {
  const critical = products.filter((product) => getStatus(product) === "critical");
  const low = products.filter((product) => getStatus(product) === "low");
  const backorders = orders.filter((order) => order.status === "Backordered");
  const cards = [
    ...critical.map((product) => ({
      level: "critical",
      title: `${product.name} is critical`,
      text: `${product.stock} units left in ${product.warehouse}. Reorder point is ${product.reorder}.`
    })),
    ...low.slice(0, 3).map((product) => ({
      level: "",
      title: `${product.name} needs replenishment`,
      text: `${product.supplier} can restock this SKU. Current stock: ${product.stock}.`
    })),
    ...backorders.map((order) => ({
      level: "critical",
      title: `${order.id} is backordered`,
      text: `${order.customer} is waiting on ${order.items} from ${order.warehouse}.`
    }))
  ];

  alertList.innerHTML = cards.length ? cards.map((card) => `
    <article class="alert-card ${card.level}">
      <strong>${card.title}</strong>
      <p>${card.text}</p>
    </article>
  `).join("") : `
    <article class="alert-card good">
      <strong>No exceptions</strong>
      <p>Inventory coverage and fulfillment queues are operating normally.</p>
    </article>
  `;
}

function renderOrders() {
  const filter = orderFilter.value;
  const visibleOrders = orders.filter((order) => filter === "all" || order.status === filter);

  orderList.innerHTML = visibleOrders.map((order) => `
    <article class="order-card">
      <div>
        <h3>${order.id} · ${order.customer}</h3>
        <p>${order.items} from ${order.warehouse} · Due ${order.due}</p>
        <div class="meta">
          <span class="badge info">${order.status}</span>
          <span class="badge ${order.priority === "High" ? "critical" : "healthy"}">${order.priority}</span>
        </div>
      </div>
      <strong>${money(order.value)}</strong>
    </article>
  `).join("");
}

function renderPurchaseOrders() {
  purchaseList.innerHTML = purchaseOrders.map((order) => `
    <article class="purchase-card">
      <div>
        <h3>${order.id} · ${order.supplier}</h3>
        <p>${order.item} · ETA ${order.eta}</p>
      </div>
      <div class="progress-track"><span style="width: ${order.progress}%"></span></div>
      <div class="meta">
        <span class="badge info">${order.progress}% received</span>
        <span class="badge healthy">${money(order.value)}</span>
      </div>
    </article>
  `).join("");
}

function renderSuppliers() {
  supplierGrid.innerHTML = suppliers.map((supplier) => `
    <article class="supplier-card">
      <div>
        <strong>${supplier.name}</strong>
        <p>${supplier.country}</p>
      </div>
      <div class="progress-track"><span style="width: ${supplier.score}%"></span></div>
      <div class="supplier-stats">
        <span><small>Score</small><strong>${supplier.score}</strong></span>
        <span><small>Lead time</small><strong>${supplier.leadTime}</strong></span>
        <span><small>Fill rate</small><strong>${supplier.fillRate}</strong></span>
        <span><small>Spend</small><strong>${supplier.spend}</strong></span>
      </div>
    </article>
  `).join("");
}

function renderActivity() {
  activityTimeline.innerHTML = activities.map((activity) => `
    <article class="timeline-item">
      <strong>${activity.time}</strong>
      <div>
        <h3>${activity.type}</h3>
        <p>${activity.text}</p>
      </div>
      <span class="badge info">${activity.actor}</span>
    </article>
  `).join("");
}

function renderAll() {
  populateCategories();
  renderMetrics();
  renderProducts();
  renderChart();
  renderAlerts();
  renderOrders();
  renderPurchaseOrders();
  renderSuppliers();
  renderActivity();
}

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    setView(link.dataset.view);
  });
});

productSearch.addEventListener("input", renderProducts);
warehouseSelect.addEventListener("input", renderChart);
orderFilter.addEventListener("input", renderOrders);
stockFilter.addEventListener("input", renderProducts);
categoryFilter.addEventListener("input", renderProducts);

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

productsTable.addEventListener("click", (event) => {
  const button = event.target.closest("[data-restock]");
  if (!button) return;

  const productId = Number(button.dataset.restock);
  const product = products.find((item) => item.id === productId);
  product.stock += Math.max(20, product.reorder * 2);
  activities.unshift({
    time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    type: "Restock request",
    text: `${product.name} restocked to ${product.stock} units in ${product.warehouse}.`,
    actor: "Inventory"
  });
  showToast(`${product.name} has been restocked.`);
  renderAll();
});

openProductForm.addEventListener("click", () => {
  productForm.reset();
  productDialog.showModal();
});

closeProductForm.addEventListener("click", () => {
  productDialog.close();
});

productForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(productForm);
  const product = {
    id: Date.now(),
    name: formData.get("name").trim(),
    sku: formData.get("sku").trim().toUpperCase(),
    category: formData.get("category").trim(),
    warehouse: formData.get("warehouse"),
    stock: Number(formData.get("stock")),
    reorder: Number(formData.get("reorder")),
    cost: Number(formData.get("cost")),
    supplier: "New supplier review"
  };

  products.unshift(product);
  activities.unshift({
    time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    type: "New product",
    text: `${product.name} added to the catalog with SKU ${product.sku}.`,
    actor: "Catalog"
  });
  productDialog.close();
  showToast("Product added to inventory.");
  renderAll();
});

createPurchaseOrder.addEventListener("click", () => {
  const lowProduct = products.find((product) => getStatus(product) !== "healthy") || products[0];
  purchaseOrders.unshift({
    id: `PO-${Math.floor(9200 + Math.random() * 400)}`,
    supplier: lowProduct.supplier,
    item: lowProduct.name,
    eta: "Pending confirmation",
    progress: 8,
    value: lowProduct.reorder * lowProduct.cost * 3
  });
  activities.unshift({
    time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    type: "Purchase order",
    text: `A replenishment order was created for ${lowProduct.name}.`,
    actor: "Procurement"
  });
  showToast("Purchase order created.");
  renderAll();
});

exportButton.addEventListener("click", () => {
  const summary = `${products.length} SKUs · ${money(products.reduce((sum, product) => sum + product.stock * product.cost, 0))} stock value · ${orders.length} open orders`;
  showToast(`Report ready: ${summary}`);
});

renderAll();
