const API_KEY = 'e95bf065a5c8f6f431aa2ec8f4e8b7a8'; // Replace this with your real API key

async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data.weather[0].main;
  } catch (err) {
    alert("Invalid city or network error.");
    return null;
  }
}

async function getRecommendations() {
  const city = document.getElementById('city').value;
  const mood = document.getElementById('mood').value;
  const language = document.getElementById('language').value;
  const weather = await getWeather(city);
  if (!weather) return;

  const response = await fetch('movies.json');
  const movies = await response.json();

  const weatherMoodMap = {
    Clear: "Happy",
    Rain: "Romantic",
    Clouds: "Sad",
    Thunderstorm: "Adventurous",
    Snow: "Romantic",
    Drizzle: "Sad"
  };

  const adjustedMood = weatherMoodMap[weather] || mood;

  const filtered = movies.filter(
    (movie) =>
      movie.language === language &&
      movie.mood.includes(mood) &&
      movie.mood.includes(adjustedMood)
  );

  renderMovies(filtered);
}

function renderMovies(movies) {
  const grid = document.getElementById('movieGrid');
  grid.innerHTML = "";

  if (movies.length === 0) {
    grid.innerHTML = "<p>No movies found for this combination.</p>";
    return;
  }

  movies.forEach((movie) => {
    const card = document.createElement("div");
    card.className = "movie-card";
    card.innerHTML = `
      <img src="${movie.image}" alt="${movie.title}" />
      <h3>${movie.title}</h3>
    `;
    grid.appendChild(card);
  });
}
