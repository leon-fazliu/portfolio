const ordersTable = document.querySelector("#ordersTable");
const statusFilter = document.querySelector("#statusFilter");
const productSearch = document.querySelector("#productSearch");
const productGrid = document.querySelector("#productGrid");

const orders = [
  { id: "#CO-1048", customer: "Emma Carter", status: "paid", total: "$420.00" },
  { id: "#CO-1047", customer: "Northline Studio", status: "pending", total: "$189.50" },
  { id: "#CO-1046", customer: "BrightMart Supply", status: "shipped", total: "$760.00" },
  { id: "#CO-1045", customer: "Urban Brew", status: "paid", total: "$248.90" },
  { id: "#CO-1044", customer: "Tech Line", status: "pending", total: "$1,120.00" }
];

const products = [
  { name: "Wireless Headset", sku: "AUD-241", stock: 84, sold: 72 },
  { name: "Smart Watch Pro", sku: "WCH-118", stock: 28, sold: 89 },
  { name: "USB-C Hub", sku: "ACC-432", stock: 136, sold: 54 },
  { name: "Mechanical Keyboard", sku: "KEY-710", stock: 16, sold: 92 },
  { name: "Laptop Stand", sku: "DSK-205", stock: 67, sold: 61 },
  { name: "Portable SSD", sku: "DRV-903", stock: 42, sold: 79 },
  { name: "Webcam 4K", sku: "CAM-440", stock: 23, sold: 68 },
  { name: "Ergonomic Mouse", sku: "MOU-331", stock: 91, sold: 47 }
];

function renderOrders() {
  const status = statusFilter.value;
  const visibleOrders = status === "all" ? orders : orders.filter((order) => order.status === status);

  ordersTable.innerHTML = visibleOrders
    .map((order) => `
      <tr>
        <td>${order.id}</td>
        <td>${order.customer}</td>
        <td><span class="badge ${order.status}">${order.status}</span></td>
        <td>${order.total}</td>
      </tr>
    `)
    .join("");
}

function renderProducts() {
  const query = productSearch.value.trim().toLowerCase();
  const visibleProducts = products.filter((product) => (
    product.name.toLowerCase().includes(query) || product.sku.toLowerCase().includes(query)
  ));

  productGrid.innerHTML = visibleProducts
    .map((product) => `
      <article class="product-card">
        <div class="product-top">
          <div>
            <h3>${product.name}</h3>
            <p>${product.sku}</p>
          </div>
          <span class="stock">${product.stock} left</span>
        </div>
        <div class="progress" aria-label="${product.name} sales progress">
          <span style="width: ${product.sold}%"></span>
        </div>
        <p>${product.sold}% of monthly target sold</p>
      </article>
    `)
    .join("");
}

statusFilter.addEventListener("change", renderOrders);
productSearch.addEventListener("input", renderProducts);

renderOrders();
renderProducts();
