const locationSearch = document.querySelector("#locationSearch");
const locationToggle = document.querySelector("#locationToggle");
const locationLabel = document.querySelector("#locationLabel");
const locationOptions = document.querySelector("#locationOptions");
const locationPicker = document.querySelector(".location-picker");
const customPickers = document.querySelectorAll(".custom-picker");
const typeFilter = document.querySelector("#typeFilter");
const priceFilter = document.querySelector("#priceFilter");
const bedFilter = document.querySelector("#bedFilter");
const listingCount = document.querySelector("#listingCount");
const averagePrice = document.querySelector("#averagePrice");
const savedCount = document.querySelector("#savedCount");
const propertyGrid = document.querySelector("#propertyGrid");
const detailTitle = document.querySelector("#detailTitle");
const detailAddress = document.querySelector("#detailAddress");
const detailPrice = document.querySelector("#detailPrice");
const detailBeds = document.querySelector("#detailBeds");
const detailArea = document.querySelector("#detailArea");
const detailZone = document.querySelector("#detailZone");
const detailFeatures = document.querySelector("#detailFeatures");
const sortButtons = document.querySelectorAll(".view-btn");
const homePrice = document.querySelector("#homePrice");
const downPayment = document.querySelector("#downPayment");
const interestRate = document.querySelector("#interestRate");
const loanYears = document.querySelector("#loanYears");
const monthlyPayment = document.querySelector("#monthlyPayment");
const savedList = document.querySelector("#savedList");
const contactForm = document.querySelector("#contactForm");
const message = document.querySelector("#message");
const toast = document.querySelector("#toast");
const propertyDialog = document.querySelector("#propertyDialog");
const closeDialog = document.querySelector("#closeDialog");
const galleryMain = document.querySelector("#galleryMain");
const galleryThumbs = document.querySelector("#galleryThumbs");
const modalTitle = document.querySelector("#modalTitle");
const modalAddress = document.querySelector("#modalAddress");
const modalPrice = document.querySelector("#modalPrice");
const roomList = document.querySelector("#roomList");
const amenityList = document.querySelector("#amenityList");
const modalViewing = document.querySelector("#modalViewing");

const properties = [
  {
    id: 1,
    title: "Dubai Marina Sky Residence",
    type: "Apartment",
    city: "Dubai",
    neighborhood: "Dubai Marina",
    price: 1180000,
    beds: 3,
    baths: 2,
    area: 1760,
    score: 94,
    featured: 98,
    theme: "dubai",
    features: ["Marina view", "Concierge service", "Private balcony", "Smart home system"],
    amenities: ["Pool", "Gym", "Valet parking", "24/7 concierge"],
    rooms: ["Living room", "Primary bedroom", "Chef kitchen", "Balcony lounge"]
  },
  {
    id: 2,
    title: "Kensington Garden Townhouse",
    type: "House",
    city: "London",
    neighborhood: "Kensington",
    price: 1850000,
    beds: 4,
    baths: 3,
    area: 2680,
    score: 91,
    featured: 92,
    theme: "london",
    features: ["Private garden", "Home office", "Period facade", "Renovated interiors"],
    amenities: ["Garden", "Fireplace", "Office", "Security"],
    rooms: ["Drawing room", "Garden suite", "Family kitchen", "Study"]
  },
  {
    id: 3,
    title: "Paris Left Bank Residence",
    type: "Villa",
    city: "Paris",
    neighborhood: "Saint-Germain-des-Pres",
    price: 1320000,
    beds: 3,
    baths: 3,
    area: 1980,
    score: 96,
    featured: 99,
    theme: "paris",
    features: ["Historic district", "High ceilings", "Juliet balconies", "Gallery-style living"],
    amenities: ["Elevator", "Wine storage", "Library", "Underfloor heating"],
    rooms: ["Salon", "Primary suite", "Dining room", "Reading room"]
  },
  {
    id: 4,
    title: "Tribeca Penthouse Loft",
    type: "Penthouse",
    city: "New York",
    neighborhood: "Tribeca",
    price: 1960000,
    beds: 3,
    baths: 3,
    area: 2380,
    score: 97,
    featured: 95,
    theme: "newyork",
    features: ["Private elevator", "Skyline views", "Designer kitchen", "Rooftop lounge"],
    amenities: ["Doorman", "Roof deck", "Storage", "Smart lighting"],
    rooms: ["Open loft", "Rooftop lounge", "Primary bedroom", "Media room"]
  },
  {
    id: 5,
    title: "Barcelona Eixample Apartment",
    type: "House",
    city: "Barcelona",
    neighborhood: "Eixample",
    price: 640000,
    beds: 3,
    baths: 2,
    area: 1560,
    score: 88,
    featured: 83,
    theme: "barcelona",
    features: ["Corner balcony", "Restored flooring", "Walkable district", "Natural light"],
    amenities: ["Balcony", "Elevator", "Bike storage", "Air conditioning"],
    rooms: ["Living room", "Terrace", "Kitchen", "Guest room"]
  },
  {
    id: 6,
    title: "Miami Brickell Waterfront Condo",
    type: "Apartment",
    city: "Miami",
    neighborhood: "Brickell",
    price: 875000,
    beds: 2,
    baths: 2,
    area: 1320,
    score: 86,
    featured: 78,
    theme: "miami",
    features: ["Waterfront view", "Resort amenities", "Floor-to-ceiling glass", "Rental potential"],
    amenities: ["Pool deck", "Spa", "Gym", "Marina access"],
    rooms: ["Living room", "Waterfront bedroom", "Kitchen", "Terrace"]
  },
  {
    id: 7,
    title: "Singapore Marina Bay Suite",
    type: "Apartment",
    city: "Singapore",
    neighborhood: "Marina Bay",
    price: 1450000,
    beds: 3,
    baths: 3,
    area: 1840,
    score: 95,
    featured: 94,
    theme: "singapore",
    features: ["Bay view", "Integrated mall access", "Concierge", "Business district"],
    amenities: ["Sky pool", "Club lounge", "Metro access", "Security"],
    rooms: ["Bay living room", "Primary suite", "Study", "Dining space"]
  },
  {
    id: 8,
    title: "Amsterdam Canal House",
    type: "House",
    city: "Amsterdam",
    neighborhood: "Jordaan",
    price: 980000,
    beds: 4,
    baths: 2,
    area: 2020,
    score: 90,
    featured: 87,
    theme: "amsterdam",
    features: ["Canal frontage", "Restored beams", "Private courtyard", "Historic charm"],
    amenities: ["Courtyard", "Storage", "Bike room", "Water view"],
    rooms: ["Canal salon", "Loft bedroom", "Kitchen", "Courtyard"]
  },
  {
    id: 9,
    title: "Tokyo Minato Smart Residence",
    type: "Penthouse",
    city: "Tokyo",
    neighborhood: "Minato",
    price: 1260000,
    beds: 3,
    baths: 2,
    area: 1680,
    score: 93,
    featured: 90,
    theme: "tokyo",
    features: ["Smart automation", "City skyline", "Minimalist interiors", "Transit access"],
    amenities: ["Smart home", "Lounge", "Parking", "Security"],
    rooms: ["Minimal living", "Tatami guest room", "Kitchen", "Sky balcony"]
  },
  {
    id: 10,
    title: "Zurich Lakeside Residence",
    type: "Villa",
    city: "Zurich",
    neighborhood: "Enge",
    price: 1720000,
    beds: 4,
    baths: 4,
    area: 2920,
    score: 92,
    featured: 89,
    theme: "zurich",
    features: ["Lake access", "Wellness suite", "Private terrace", "Energy-efficient build"],
    amenities: ["Sauna", "Lake view", "Garage", "Wine cellar"],
    rooms: ["Lake living room", "Wellness room", "Primary suite", "Terrace dining"]
  }
];

let saved = new Set([1]);
let activePropertyId = 1;
let currentSort = "featured";

function money(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
}

function showToast(text) {
  toast.textContent = text;
  toast.classList.add("is-visible");
  window.setTimeout(() => toast.classList.remove("is-visible"), 2400);
}

function filteredProperties() {
  const query = locationSearch.value.trim().toLowerCase();
  const type = typeFilter.value;
  const maxPrice = priceFilter.value;
  const beds = bedFilter.value;

  const filtered = properties.filter((property) => {
    const locationText = `${property.city} ${property.neighborhood} ${property.title}`.toLowerCase();
    const matchesLocation = locationText.includes(query);
    const matchesType = type === "all" || property.type === type;
    const matchesPrice = maxPrice === "all" || property.price <= Number(maxPrice);
    const matchesBeds = beds === "all" || property.beds >= Number(beds);
    return matchesLocation && matchesType && matchesPrice && matchesBeds;
  });

  return filtered.sort((a, b) => {
    if (currentSort === "price-low") return a.price - b.price;
    if (currentSort === "price-high") return b.price - a.price;
    return b.featured - a.featured;
  });
}

function renderStats(list) {
  const average = list.length ? list.reduce((sum, property) => sum + property.price, 0) / list.length : 0;
  listingCount.textContent = list.length;
  averagePrice.textContent = money(average);
  savedCount.textContent = saved.size;
}

function renderProperties() {
  const list = filteredProperties();
  renderStats(list);

  propertyGrid.innerHTML = list.map((property) => `
    <article class="property-card">
      <button class="property-image ${property.theme}" type="button" data-gallery="${property.id}" aria-label="Open ${property.title} gallery">
        <span class="photo-count">${property.rooms.length + 1} photos</span>
      </button>
      <div class="property-body">
        <div class="property-top">
          <div>
            <h3>${property.title}</h3>
            <p>${property.neighborhood}, ${property.city} · ${property.type}</p>
          </div>
          <span class="price">${money(property.price)}</span>
        </div>
        <div class="features">
          <span>${property.beds} beds</span>
          <span>${property.baths} baths</span>
          <span>${property.area.toLocaleString()} sq ft</span>
          <span>${property.score}% area score</span>
        </div>
        <div class="property-actions">
          <button class="details-btn" type="button" data-details="${property.id}">View details</button>
          <button class="save-btn ${saved.has(property.id) ? "is-saved" : ""}" type="button" data-save="${property.id}">
            ${saved.has(property.id) ? "Saved" : "Save"}
          </button>
        </div>
      </div>
    </article>
  `).join("") || `<article class="property-card"><div class="property-body"><h3>No properties found</h3><p>Try adjusting your search filters.</p></div></article>`;
}

function renderDetails() {
  const property = properties.find((item) => item.id === activePropertyId) || properties[0];
  detailTitle.textContent = property.title;
  detailAddress.textContent = `${property.neighborhood}, ${property.city} · ${property.type}`;
  detailPrice.textContent = money(property.price);
  detailBeds.textContent = property.beds;
  detailArea.textContent = property.area.toLocaleString();
  detailZone.textContent = `${property.score}% neighborhood score`;
  detailFeatures.innerHTML = property.features.map((feature) => `<li>${feature}</li>`).join("");
  homePrice.value = property.price;
  message.value = `I am interested in ${property.title} in ${property.neighborhood}.`;
  calculatePayment();
}

function renderPropertyModal(property) {
  modalTitle.textContent = property.title;
  modalAddress.textContent = `${property.neighborhood}, ${property.city} · ${property.type}`;
  modalPrice.textContent = money(property.price);
  galleryMain.className = "gallery-main living";
  galleryThumbs.innerHTML = property.rooms.map((room, index) => {
    const themes = ["living", "bedroom", "kitchen", "bath"];
    return `<button class="gallery-thumb ${themes[index % themes.length]}" type="button" data-room="${themes[index % themes.length]}">${room}</button>`;
  }).join("");

  roomList.innerHTML = property.rooms.map((room, index) => {
    const themes = ["living", "bedroom", "kitchen", "bath"];
    return `
      <article class="room-card">
        <span class="room-preview ${themes[index % themes.length]}"></span>
        <span><strong>${room}</strong><span>${property.type} room preview</span></span>
      </article>
    `;
  }).join("");

  amenityList.innerHTML = property.amenities.map((amenity) => `<span>${amenity}</span>`).join("");
}

function openPropertyModal(propertyId) {
  const property = properties.find((item) => item.id === propertyId) || properties[0];
  activePropertyId = property.id;
  renderDetails();
  renderPropertyModal(property);
  propertyDialog.showModal();
}

function renderSaved() {
  const savedProperties = properties.filter((property) => saved.has(property.id));
  savedList.innerHTML = savedProperties.length ? savedProperties.map((property) => `
    <div class="saved-item">
      ${property.title}
      <span>${property.neighborhood}, ${property.city} · ${money(property.price)}</span>
    </div>
  `).join("") : `<div class="saved-item">No saved homes yet.<span>Save listings to compare them later.</span></div>`;
  savedCount.textContent = saved.size;
}

function calculatePayment() {
  const principal = Math.max(0, Number(homePrice.value) - Number(downPayment.value));
  const monthlyRate = Number(interestRate.value) / 100 / 12;
  const payments = Number(loanYears.value) * 12;
  const payment = monthlyRate === 0
    ? principal / payments
    : principal * (monthlyRate * (1 + monthlyRate) ** payments) / ((1 + monthlyRate) ** payments - 1);
  monthlyPayment.textContent = money(Number.isFinite(payment) ? payment : 0);
}

function renderAll() {
  renderProperties();
  renderDetails();
  renderSaved();
}

locationToggle.addEventListener("click", () => {
  const isOpen = locationPicker.classList.toggle("is-open");
  locationToggle.setAttribute("aria-expanded", String(isOpen));
  customPickers.forEach((picker) => closeCustomPicker(picker));
});

locationOptions.addEventListener("click", (event) => {
  const option = event.target.closest("[data-location]");
  if (!option) return;

  locationSearch.value = option.dataset.location;
  locationLabel.textContent = option.dataset.label;
  locationOptions.querySelectorAll("button").forEach((button) => {
    button.classList.toggle("is-selected", button === option);
  });
  locationPicker.classList.remove("is-open");
  locationToggle.setAttribute("aria-expanded", "false");
  renderProperties();
});

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
    locationPicker.classList.remove("is-open");
    locationToggle.setAttribute("aria-expanded", "false");
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

    if ([typeFilter, priceFilter, bedFilter].includes(input)) {
      renderProperties();
    }
  });
});

document.addEventListener("click", (event) => {
  if (locationPicker.contains(event.target) || event.target.closest(".custom-picker")) return;
  locationPicker.classList.remove("is-open");
  locationToggle.setAttribute("aria-expanded", "false");
  customPickers.forEach((picker) => closeCustomPicker(picker));
});

sortButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentSort = button.dataset.sort;
    sortButtons.forEach((item) => item.classList.toggle("is-active", item === button));
    renderProperties();
  });
});

propertyGrid.addEventListener("click", (event) => {
  const galleryButton = event.target.closest("[data-gallery]");
  const detailsButton = event.target.closest("[data-details]");
  const saveButton = event.target.closest("[data-save]");

  if (galleryButton) {
    openPropertyModal(Number(galleryButton.dataset.gallery));
  }

  if (detailsButton) {
    activePropertyId = Number(detailsButton.dataset.details);
    renderDetails();
    document.querySelector("#listings").scrollIntoView({ behavior: "smooth" });
  }

  if (saveButton) {
    const propertyId = Number(saveButton.dataset.save);
    if (saved.has(propertyId)) {
      saved.delete(propertyId);
      showToast("Property removed from saved homes.");
    } else {
      saved.add(propertyId);
      showToast("Property saved to shortlist.");
    }
    renderProperties();
    renderSaved();
  }
});

galleryThumbs.addEventListener("click", (event) => {
  const thumb = event.target.closest("[data-room]");
  if (!thumb) return;
  galleryMain.className = `gallery-main ${thumb.dataset.room}`;
});

closeDialog.addEventListener("click", () => propertyDialog.close());

modalViewing.addEventListener("click", () => {
  propertyDialog.close();
  document.querySelector("#contact").scrollIntoView({ behavior: "smooth" });
});

[homePrice, downPayment, interestRate, loanYears].forEach((input) => {
  input.addEventListener("input", calculatePayment);
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const property = properties.find((item) => item.id === activePropertyId) || properties[0];
  showToast(`Viewing request sent for ${property.title}.`);
  contactForm.reset();
  message.value = `I am interested in ${property.title} in ${property.neighborhood}.`;
});

renderAll();
