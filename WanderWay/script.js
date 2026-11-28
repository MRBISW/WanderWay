
document.addEventListener("DOMContentLoaded", () => {
  // ELEMENTS
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const bookingTabs = document.querySelectorAll(".booking-tab");
  const bookingForm = document.getElementById("bookingForm");
  const bookingMessage = document.getElementById("bookingMessage");
  const fromInput = document.getElementById("fromInput");
  const toInput = document.getElementById("toInput");
  const swapButton = document.getElementById("swapButton");

  // FOOTER YEAR
  document.getElementById("year").textContent = new Date().getFullYear();

  // MOBILE NAVIGATION
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
    });
  });

  // BOOKING TABS
  const bookingSettings = {
    flights: {
      title: "Book your flights",
      subtitle: "Find the best routes for your next journey.",
      from: "FROM",
      to: "TO",
      fromPlaceholder: "Departure city",
      toPlaceholder: "Destination city",
      date: "TRAVEL DATE"
    },
    hotels: {
      title: "Find your perfect stay",
      subtitle: "Discover places to stay around the world.",
      from: "DESTINATION",
      to: "HOTEL / AREA",
      fromPlaceholder: "City or destination",
      toPlaceholder: "Optional hotel or area",
      date: "CHECK-IN DATE"
    },
    holidays: {
      title: "Plan your holiday",
      subtitle: "Find inspiration for your next getaway.",
      from: "STARTING FROM",
      to: "DESTINATION",
      fromPlaceholder: "Your city",
      toPlaceholder: "Where to?",
      date: "TRAVEL DATE"
    },
    buses: {
      title: "Search bus journeys",
      subtitle: "Plan your next road journey.",
      from: "FROM",
      to: "TO",
      fromPlaceholder: "Starting city",
      toPlaceholder: "Destination city",
      date: "JOURNEY DATE"
    },
    cabs: {
      title: "Book a cab",
      subtitle: "Find a ride for your next journey.",
      from: "PICKUP",
      to: "DROP",
      fromPlaceholder: "Pickup location",
      toPlaceholder: "Drop location",
      date: "PICKUP DATE"
    }
  };

  let currentBookingType = "flights";

  bookingTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      bookingTabs.forEach(item => item.classList.remove("active"));
      tab.classList.add("active");

      currentBookingType = tab.dataset.type;
      const settings = bookingSettings[currentBookingType];

      document.getElementById("bookingTitle").textContent = settings.title;
      document.getElementById("bookingSubtitle").textContent = settings.subtitle;
      document.getElementById("fromLabel").textContent = settings.from;
      document.getElementById("toLabel").textContent = settings.to;
      document.getElementById("dateLabel").textContent = settings.date;
      fromInput.placeholder = settings.fromPlaceholder;
      toInput.placeholder = settings.toPlaceholder;

      bookingMessage.textContent = "";
    });
  });

  // SWAP LOCATIONS
  swapButton.addEventListener("click", () => {
    const oldFrom = fromInput.value;
    fromInput.value = toInput.value;
    toInput.value = oldFrom;
  });

  // DATE MINIMUM = TODAY
  const today = new Date();
  const localToday = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0")
  ].join("-");

  const travelDate = document.getElementById("travelDate");
  travelDate.min = localToday;

  // BOOKING DEMO FORM
  bookingForm.addEventListener("submit", event => {
    event.preventDefault();

    const from = fromInput.value.trim();
    const to = toInput.value.trim();
    const date = travelDate.value;
    const travellers = document.getElementById("travellers").value;

    if (!from || !to || !date) {
      bookingMessage.textContent = "Please complete all required fields.";
      return;
    }

    if (date < localToday) {
      bookingMessage.textContent = "Please select today or a future date.";
      return;
    }

    bookingMessage.textContent =
      `${bookingSettings[currentBookingType].title}: ${from} → ${to}, ${date}, ${travellers}. This is a demo search; live booking is not connected yet.`;
  });

  // DESTINATION FILTERS
  const filterButtons = document.querySelectorAll(".filter-btn");
  const destinationCards = document.querySelectorAll(".destination-card");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      filterButtons.forEach(item => item.classList.remove("active"));
      button.classList.add("active");

      const selectedCategory = button.dataset.filter;

      destinationCards.forEach(card => {
        const matches =
          selectedCategory === "all" ||
          card.dataset.category === selectedCategory;

        card.classList.toggle("hidden-card", !matches);
      });
    });
  });

  // SAVE FAVOURITE DESTINATIONS
  const savedKey = "wanderwaySavedPlaces";

  function getSavedPlaces() {
    try {
      return JSON.parse(localStorage.getItem(savedKey)) || [];
    } catch {
      return [];
    }
  }

  function updateSaveButtons() {
    const saved = getSavedPlaces();

    document.querySelectorAll(".destination-card").forEach(card => {
      const button = card.querySelector(".save-card");
      const name = card.dataset.name;
      const isSaved = saved.includes(name);

      button.classList.toggle("saved", isSaved);
      button.textContent = isSaved ? "♥" : "♡";
      button.setAttribute("aria-pressed", String(isSaved));
    });
  }

  document.querySelectorAll(".save-card").forEach(button => {
    button.addEventListener("click", () => {
      const card = button.closest(".destination-card");
      const name = card.dataset.name;
      let saved = getSavedPlaces();

      if (saved.includes(name)) {
        saved = saved.filter(place => place !== name);
      } else {
        saved.push(name);
      }

      localStorage.setItem(savedKey, JSON.stringify(saved));
      updateSaveButtons();
    });
  });

  document.getElementById("savedButton").addEventListener("click", () => {
    const saved = getSavedPlaces();

    if (saved.length === 0) {
      alert("You haven't saved any destinations yet.");
      return;
    }

    alert("Your saved destinations:\n\n" + saved.join("\n"));
  });

  updateSaveButtons();

  // SEARCH FROM DESTINATION CARDS
  document.querySelectorAll(".explore-search").forEach(link => {
    link.addEventListener("click", () => {
      const place = link.dataset.place;
      document.getElementById("destinationSearch").value = place;
    });
  });

  // WORLDWIDE LOCATION SEARCH - OPEN-METEO
  const worldSearchForm = document.getElementById("worldSearchForm");
  const destinationSearch = document.getElementById("destinationSearch");
  const apiResults = document.getElementById("apiResults");
  const apiStatus = document.getElementById("apiStatus");

  let activeSearchController = null;

  async function getWikipediaImage(placeName) {
    try {
      const searchUrl =
        "https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=" +
        encodeURIComponent(placeName) +
        "&gsrnamespace=0&gsrlimit=1&prop=pageimages&piprop=thumbnail&pithumbsize=500&format=json&origin=*";

      const response = await fetch(searchUrl);

      if (!response.ok) return "";

      const data = await response.json();
      const pages = data.query?.pages;

      if (!pages) return "";

      const firstPage = Object.values(pages)[0];
      return firstPage?.thumbnail?.source || "";
    } catch {
      return "";
    }
  }

  function createPlaceCard(place, imageUrl) {
    const card = document.createElement("article");
    card.className = "api-place-card";

    const image = document.createElement("img");
    image.alt = place.name;
    image.loading = "lazy";
    image.src = imageUrl ||
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=700&q=75";

    const info = document.createElement("div");
    info.className = "api-place-info";

    const heading = document.createElement("h3");
    heading.textContent = place.name;

    const description = document.createElement("p");
    description.textContent = [
      place.admin1,
      place.country
    ].filter(Boolean).join(", ");

    const mapLink = document.createElement("a");
    mapLink.textContent = "View on Google Maps →";
    mapLink.href =
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent(`${place.name}, ${place.country || ""}`);
    mapLink.target = "_blank";
    mapLink.rel = "noopener noreferrer";

    info.append(heading, description, mapLink);
    card.append(image, info);

    return card;
  }

  worldSearchForm.addEventListener("submit", async event => {
    event.preventDefault();

    const query = destinationSearch.value.trim();

    if (query.length < 2) {
      apiStatus.textContent = "Please enter at least 2 characters.";
      return;
    }

    if (activeSearchController) {
      activeSearchController.abort();
    }

    activeSearchController = new AbortController();
    const signal = activeSearchController.signal;

    apiResults.replaceChildren();
    apiStatus.textContent = "Searching worldwide destinations...";

    try {
      const url =
        "https://geocoding-api.open-meteo.com/v1/search?name=" +
        encodeURIComponent(query) +
        "&count=8&language=en&format=json";

      const response = await fetch(url, { signal });

      if (!response.ok) {
        throw new Error("Location search is currently unavailable.");
      }

      const data = await response.json();

      if (!data.results || data.results.length === 0) {
        apiStatus.textContent = "No places found. Try another city or country.";
        return;
      }

      apiStatus.textContent = `Found ${data.results.length} places matching "${query}".`;

      const places = data.results.slice(0, 8);

      for (const place of places) {
        if (signal.aborted) return;

        const imageUrl = await getWikipediaImage(
          `${place.name} ${place.country || ""}`
        );

        if (signal.aborted) return;

        apiResults.appendChild(createPlaceCard(place, imageUrl));
      }

    } catch (error) {
      if (error.name === "AbortError") return;

      apiStatus.textContent =
        "Something went wrong. Please check your internet connection and try again.";
    }
  });

  // LOGIN / SIGNUP MODAL
  const authModal = document.getElementById("authModal");
  const loginButton = document.getElementById("loginButton");
  const closeModal = document.getElementById("closeModal");
  const modalBackdrop = document.getElementById("modalBackdrop");
  const authForm = document.getElementById("authForm");
  const authTitle = document.getElementById("authTitle");
  const authDescription = document.getElementById("authDescription");
  const authSubmit = document.getElementById("authSubmit");
  const authSwitch = document.getElementById("authSwitch");
  const switchAuth = document.getElementById("switchAuth");
  const nameField = document.getElementById("nameField");
  const authName = document.getElementById("authName");
  const authEmail = document.getElementById("authEmail");
  const authPassword = document.getElementById("authPassword");
  const authMessage = document.getElementById("authMessage");
  const togglePassword = document.getElementById("togglePassword");

  let isSignup = false;

  function openAuthModal() {
    authModal.classList.add("show");
    authModal.setAttribute("aria-hidden", "false");
    authMessage.textContent = "";
    document.body.style.overflow = "hidden";
  }

  function closeAuthModal() {
    authModal.classList.remove("show");
    authModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  loginButton.addEventListener("click", openAuthModal);
  closeModal.addEventListener("click", closeAuthModal);
  modalBackdrop.addEventListener("click", closeAuthModal);

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeAuthModal();
  });

  function updateAuthMode() {
    isSignup = !isSignup;
    authTitle.textContent = isSignup ? "Create your account" : "Welcome back!";
    authDescription.textContent = isSignup
      ? "Join WanderWay and save places you love."
      : "Sign in to your WanderWay demo account.";

    authSubmit.textContent = isSignup ? "Create account" : "Login";
    nameField.classList.toggle("hidden", !isSignup);
    authName.required = isSignup;

    authSwitch.innerHTML = isSignup
      ? 'Already have an account? <button type="button" id="switchAuth">Login</button>'
      : 'New to WanderWay? <button type="button" id="switchAuth">Create an account</button>';

    document.getElementById("switchAuth").addEventListener("click", updateAuthMode);
    authMessage.textContent = "";
  }

  switchAuth.addEventListener("click", updateAuthMode);

  togglePassword.addEventListener("click", () => {
    const isPassword = authPassword.type === "password";
    authPassword.type = isPassword ? "text" : "password";
    togglePassword.textContent = isPassword ? "Hide" : "Show";
  });

  authForm.addEventListener("submit", event => {
    event.preventDefault();

    const email = authEmail.value.trim();
    const password = authPassword.value;

    if (password.length < 6) {
      authMessage.textContent = "Password must contain at least 6 characters.";
      return;
    }

    // Frontend demo only: password is never stored.
    if (isSignup) {
      const name = authName.value.trim();

      if (!name) {
        authMessage.textContent = "Please enter your name.";
        return;
      }

      localStorage.setItem("wanderwayDemoUser", JSON.stringify({
        name,
        email
      }));

      authMessage.textContent = "Demo account created! You can now explore WanderWay.";
    } else {
      localStorage.setItem("wanderwayDemoUser", JSON.stringify({
        name: email.split("@")[0],
        email
      }));

      authMessage.textContent = "Demo login successful! Welcome to WanderWay.";
    }

    const user = JSON.parse(localStorage.getItem("wanderwayDemoUser"));
    loginButton.textContent = user.name;

    setTimeout(() => {
      closeAuthModal();
      authForm.reset();
      isSignup = true;
      updateAuthMode();
    }, 1200);
  });

  // SHOW SAVED DEMO USER
  try {
    const existingUser = JSON.parse(localStorage.getItem("wanderwayDemoUser"));

    if (existingUser?.name) {
      loginButton.textContent = existingUser.name;
    }
  } catch {
    localStorage.removeItem("wanderwayDemoUser");
  }
});
