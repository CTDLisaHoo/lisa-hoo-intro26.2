const resultsEl = document.getElementById("results");
const searchInput = document.getElementById("searchInput");

// ======================================================
// VIEW 1: BREEDS (TEXT DATA ENDPOINT)
// GET /v1/breeds
// ======================================================
async function getBreeds() {
  resultsEl.innerHTML = "<p class='loading'>Loading breeds...</p>";

  try {
    const response = await fetch("https://api.thedogapi.com/v1/breeds", {
      headers: { "x-api-key": API_KEY }
    });

    const data = await response.json();

    //console.log(data[0]);

    if (!Array.isArray(data)) {
      resultsEl.innerHTML = "Invalid data received";
      return;
    }

    resultsEl.innerHTML = data.map(breed => `
      <div class="card">
        <h3>${breed.name}</h3>
        <p><span class="label">📝 Description: </span> ${breed.description || "N/A"}</p>
        <p><span class="label">🌍 Origin:</span> ${breed.origin || "N/A"}</p>
        <p><span class="label">🏷 Breed Group:</span> ${breed.breed_group || "N/A"}</p>
        <p><span class="label">🐾 Temperament:</span> ${breed.temperament || "N/A"}</p>
        <p><span class="label">⏳ Life Span:</span> ${breed.life_span || "N/A"}</p>
        <p><span class="label">⚖️ Weight: </span> ${breed?.weight?.metric || "N/A"}</p>
        <p><span class="label">📏 Height: </span> ${breed?.height?.metric || "N/A"}</p>
      </div>
    `).join("");
      
  } catch (error) {
    console.error(error);
    resultsEl.innerHTML = "Failed to load breeds.";
  }
}

// ======================================================
// VIEW 2: RANDOM DOG IMAGES (IMAGE ENDPOINT ONLY)
// GET /v1/images/search
// ======================================================
async function showRandomDogs() {
  resultsEl.innerHTML = "<p class='loading'>Loading dogs...</p>";

  try {
    const response = await fetch(
      "https://api.thedogapi.com/v1/images/search?limit=9",
      { headers: { "x-api-key": API_KEY } }
    );

    const data = await response.json();

    resultsEl.innerHTML = data.map(dog => `
      <div class="card">
        <img src="${dog.url}" alt="dog image" />
      </div>
    `).join("");

  } catch (error) {
    console.error(error);
    resultsEl.innerHTML = "Failed to load dogs.";
  }
}

// ======================================================
// VIEW 3: SEARCH (USES BREEDS ENDPOINT AGAIN)
// ======================================================
async function searchDogs() {
  const query = searchInput.value.toLowerCase().trim();

  if (!query) {
    resultsEl.innerHTML = "Please enter a breed name.";
    return;
  }

  resultsEl.innerHTML = "<p class='loading'>Searching...</p>";

  try {
    const response = await fetch(
      "https://api.thedogapi.com/v1/breeds",
      {
        headers: { "x-api-key": API_KEY }
      }
    );

    const breeds = await response.json();

    const matches = breeds.filter(breed =>
      breed.name.toLowerCase().includes(query)
    );

    if (matches.length === 0) {
      resultsEl.innerHTML = "No breeds found.";
      return;
    }

    resultsEl.innerHTML = "";

    for (const breed of matches) {
      const imgResponse = await fetch(
        `https://api.thedogapi.com/v1/images/search?limit=1&breed_id=${breed.id}`,
        {
          headers: { "x-api-key": API_KEY }
        }
      );

      const imgData = await imgResponse.json();
      const dog = imgData[0];

      resultsEl.innerHTML += `
        <div class="card">
          <img src="${dog?.url || ""}" alt="${breed.name}">
          <h3>${breed.name}</h3>
          <p><span class="label">📝 Description: </span> ${breed.description || "N/A"}</p>
          <p><span class="label">🌍 Origin:</span> ${breed.origin || "N/A"}</p>
          <p><span class="label">🏷 Breed Group:</span> ${breed.breed_group || "N/A"}</p>
          <p><span class="label">🐾 Temperament:</span> ${breed.temperament || "N/A"}</p>
          <p><span class="label">⏳ Life Span:</span> ${breed.life_span || "N/A"}</p>
          <p><span class="label">⚖️ Weight:</span> ${breed.weight?.metric || "N/A"} kg</p>
          <p><span class="label">📏 Height:</span> ${breed.height?.metric || "N/A"} cm</p>
        </div>
      `;
    }

  } catch (error) {
    console.error(error);
    resultsEl.innerHTML = "Search failed.";
  }
}

// ======================================================
// RESET VIEW
// ======================================================
function resetApp() {
  searchInput.value = "";   // clears search box
  searchInput.focus();      // puts cursor back
  resultsEl.innerHTML = ""; // clears displayed content
}