const manaliPlaces = [
  {
    name: "Solang Valley",
    category: "adventure",
    type: "Valley",
    distance: "13 km",
    image: "images/solang-valley.jpg",
    description: "Famous for paragliding, skiing and beautiful mountain views.",
  },
  {
    name: "Jogini Waterfall",
    category: "waterfall",
    type: "Waterfall",
    distance: "4 km",
    image: "images/jogini-waterfall.jpg",
    description: "A beautiful waterfall surrounded by lush green forests.",
  },
  {
    name: "Hampta Pass",
    category: "trekking",
    type: "Trek",
    distance: "Trek route",
    image: "images/hampta-pass.jpg",
    description: "A popular Himalayan trek with breathtaking mountain scenery.",
  },
  {
    name: "Sethan Village",
    category: "hidden gem",
    type: "Village",
    distance: "14 km",
    image: "images/sethan-village.jpg",
    description: "A peaceful mountain village known for its scenic beauty.",
  },
];

// =================================
// DESTINATION DETAILS
// =================================

const destinationDetails = {
  "Solang Valley": {
    tagline: "Adventure Meets the Himalayas",

    overview:
      "Located near Manali, Solang Valley is one of Himachal Pradesh's most popular mountain destinations. Surrounded by snow-covered peaks and beautiful landscapes, it attracts adventure lovers and nature enthusiasts throughout the year.",

    highlights: [
      "Paragliding and scenic mountain views",
      "Winter skiing and snow activities",
      "Mountain photography",
      "Gondola rides, subject to operation",
    ],

    bestTime:
      "December to February for snow experiences. May to June for pleasant weather and outdoor activities.",

    activities:
      "Paragliding, skiing, snow activities and sightseeing. Availability depends on weather and local operators.",

    travelTips:
      "Carry warm clothes, wear comfortable shoes and check weather conditions before visiting. Confirm activity prices and safety arrangements with local operators.",

    howToReach:
      "Solang Valley is approximately 13 km from Manali town. Visitors can reach it by taxi or local transport, depending on availability.",
  },

  "Jogini Waterfall": {
    tagline: "A Hidden Escape into Nature",

    overview:
      "Nestled in the beautiful mountains near Vashisht, Jogini Waterfall is a peaceful natural attraction surrounded by forests and Himalayan scenery. The journey to the waterfall is just as memorable as the destination itself.",

    highlights: [
      "Beautiful cascading waterfall",
      "Scenic forest walking trail",
      "Panoramic Himalayan views",
      "Peaceful natural surroundings",
    ],

    bestTime:
      "March to June for pleasant weather and greenery. September to November can also offer beautiful mountain views, depending on weather conditions.",

    activities:
      "Nature walks, photography, sightseeing and enjoying the scenic trekking route.",

    travelTips:
      "Wear comfortable trekking shoes, carry drinking water and avoid visiting during heavy rainfall. Be careful on slippery sections of the trail.",

    howToReach:
      "Reach Vashisht village from Manali and follow the walking trail towards Jogini Waterfall. The final approach is on foot.",
  },

  "Hampta Pass": {
    tagline: "Journey Beyond the Mountains",

    overview:
      "Hampta Pass is a spectacular Himalayan trekking route connecting the Kullu Valley with the Lahaul region. Famous for its dramatic landscape changes, the trek takes visitors through green valleys, mountain streams and high-altitude terrain.",

    highlights: [
      "Breathtaking Himalayan mountain views",
      "Beautiful alpine meadows",
      "High-altitude mountain crossing",
      "Unique landscapes of Kullu and Lahaul",
    ],

    bestTime:
      "Generally June to September, depending on snow conditions and local trekking arrangements.",

    activities:
      "Multi-day trekking, camping, mountain photography and exploring Himalayan landscapes.",

    travelTips:
      "This is a challenging high-altitude trek. Choose a reputable trekking operator, carry proper equipment and follow acclimatization and safety instructions. Check permits and local conditions before departure.",

    howToReach:
      "Most organised treks begin from the Jobra area near Manali. Trekkers usually travel to the starting point by road before beginning the multi-day trek.",
  },

  "Sethan Village": {
    tagline: "Discover the Quiet Side of the Himalayas",

    overview:
      "Sethan is a peaceful mountain village near Manali, known for its beautiful landscapes, quiet surroundings and winter snow experiences. Away from the busy tourist areas, it offers visitors a chance to enjoy a slower mountain getaway.",

    highlights: [
      "Beautiful Himalayan valley views",
      "Peaceful village atmosphere",
      "Winter snow experiences",
      "Scenic photography opportunities",
    ],

    bestTime:
      "December to February for snow experiences. April to June for pleasant weather and mountain scenery.",

    activities:
      "Snow activities, sightseeing, photography and nature walks. Activities depend on seasonal conditions and local operators.",

    travelTips:
      "Carry warm clothing during winter, check road and weather conditions before travelling and arrange local transport in advance when needed.",

    howToReach:
      "Sethan Village is accessible by road from Manali via the Hamta region. Local taxi arrangements are a practical option.",
  },
};

// =================================
// HTML ELEMENTS
// =================================

const searchInput = document.getElementById("placeSearch");
const searchButton = document.getElementById("searchButton");
const placesContainer = document.getElementById("placesContainer");
const filterButtons = document.querySelectorAll(".filter-btn");

const modal = document.getElementById("destinationModal");
const modalDetails = document.getElementById("modalDetails");
const closeModal = document.getElementById("closeModal");

let selectedCategory = "all";

// =================================
// DISPLAY DESTINATIONS
// =================================

function displayPlaces(places) {
  placesContainer.innerHTML = "";

  if (places.length === 0) {
    placesContainer.innerHTML =
      "<p>No destinations found. Try another search.</p>";
    return;
  }

  places.forEach(function (place) {
    placesContainer.innerHTML += `
      <div class="place-card">

        <img
          src="${place.image}"
          alt="${place.name}"
          onerror="this.alt='Image unavailable'; this.style.display='none';"
        >

        <h3>${place.name}</h3>

        <span>${place.type}</span>

        <p>${place.description}</p>

        <p>Distance: ${place.distance}</p>

        <button
          class="explore-btn"
          onclick="openDestination('${place.name}')"
        >
          Explore Details
        </button>

      </div>
    `;
  });
}

// =================================
// OPEN DESTINATION POPUP
// =================================

function openDestination(placeName) {
  const details = destinationDetails[placeName];

  const place = manaliPlaces.find(function (item) {
    return item.name === placeName;
  });

  if (!details || !place) {
    alert("Details coming soon!");
    return;
  }

  modalDetails.innerHTML = `
    <div class="destination-hero">

      <img
        src="${place.image}"
        alt="${placeName}"
        onerror="this.alt='Image unavailable';"
      >

      <div class="destination-overlay">

        <span class="destination-tag">
          EXPLORE MANALI
        </span>

        <h2>${placeName}</h2>

        <p>${details.tagline}</p>

      </div>
    </div>

    <div class="destination-info">

      <div class="info-heading">

        <span>DESTINATION GUIDE</span>

        <h3>Discover the Experience</h3>

        <p>${details.overview}</p>

      </div>

      <div class="detail-section">

        <h3>✦ Top Highlights</h3>

        <ul>
          ${details.highlights
            .map(function (item) {
              return `<li>${item}</li>`;
            })
            .join("")}
        </ul>

      </div>

      <div class="detail-grid">

        <div class="detail-section">
          <h3>☀ Best Time to Visit</h3>
          <p>${details.bestTime}</p>
        </div>

        <div class="detail-section">
          <h3>◆ Activities</h3>
          <p>${details.activities}</p>
        </div>

        <div class="detail-section">
          <h3>✧ Travel Tips</h3>
          <p>${details.travelTips}</p>
        </div>

        <div class="detail-section">
          <h3>⌖ How to Reach</h3>
          <p>${details.howToReach}</p>
        </div>

      </div>

    </div>
  `;

  // Open popup in center
  modal.style.display = "flex";

  // Prevent background scrolling
  document.body.style.overflow = "hidden";
}

// =================================
// CLOSE DESTINATION POPUP
// =================================

function closeDestination() {
  modal.style.display = "none";
  document.body.style.overflow = "";
}

// Close button
closeModal.addEventListener("click", closeDestination);

// Close by clicking outside
modal.addEventListener("click", function (event) {
  if (event.target === modal) {
    closeDestination();
  }
});

// Close using Escape key
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && modal.style.display === "flex") {
    closeDestination();
  }
});

// =================================
// SEARCH AND FILTER
// =================================

function searchPlaces() {
  const searchValue = searchInput.value.toLowerCase().trim();

  const filteredPlaces = manaliPlaces.filter(function (place) {
    const matchesSearch =
      place.name.toLowerCase().includes(searchValue) ||
      place.category.toLowerCase().includes(searchValue) ||
      place.type.toLowerCase().includes(searchValue);

    const matchesCategory =
      selectedCategory === "all" || place.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  displayPlaces(filteredPlaces);
}

// Search button
searchButton.addEventListener("click", searchPlaces);

// Live search
searchInput.addEventListener("input", searchPlaces);

// Category filter
filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    selectedCategory = button.dataset.category;

    filterButtons.forEach(function (btn) {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    searchPlaces();
  });
});

// Enter key search
searchInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    searchPlaces();
  }
});

// =================================
// INITIAL PAGE LOAD
// =================================

displayPlaces(manaliPlaces);
