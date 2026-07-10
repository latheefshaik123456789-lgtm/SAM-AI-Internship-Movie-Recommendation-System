// ================================
// Show / Hide Password
// ================================

const togglePassword = document.getElementById("togglePassword");

if (togglePassword) {

    togglePassword.addEventListener("click", () => {

        const password = document.getElementById("password");

        if (password.type === "password") {

            password.type = "text";
            togglePassword.textContent = "🙈";

        } else {

            password.type = "password";
            togglePassword.textContent = "👁️";

        }

    });

}


// ================================
// Login
// ================================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();

        if (username === "" || email === "") {

            alert("Please fill all fields.");
            return;

        }

        localStorage.setItem("username", username);
        localStorage.setItem("email", email);

        window.location.href = "home.html";

    });

}


// ================================
// Welcome User
// ================================

const welcome = document.getElementById("welcome");

if (welcome) {

    const username = localStorage.getItem("username");

    if (username) {

        welcome.innerHTML = "👋 Welcome, " + username;

    } else {

        window.location.href = "index.html";

    }

}


// ================================
// Logout
// ================================

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", () => {

        localStorage.clear();

        window.location.href = "index.html";

    });

}


// ================================
// Movie Container
// ================================

const movieContainer = document.querySelector(".movie-container");

if (movieContainer) {

    fetch("movies.json")

        .then(response => response.json())

        .then(movies => {

            displayMovies(movies);
                        // Search Elements
            const searchInput = document.getElementById("searchInput");
            const genreFilter = document.getElementById("genreFilter");
            const languageFilter = document.getElementById("languageFilter");
            const ratingFilter = document.getElementById("ratingFilter");

            // Filter Function
            function filterMovies() {

                const search = searchInput.value.toLowerCase();
                const genre = genreFilter.value;
                const language = languageFilter.value;
                const rating = ratingFilter.value;

                const filteredMovies = movies.filter(movie => {

                    return movie.title.toLowerCase().includes(search) &&

                        (genre === "" || movie.genre === genre) &&

                        (language === "" || movie.language === language) &&

                        (rating === "" || movie.rating >= Number(rating));

                });

                displayMovies(filteredMovies);

            }

            // Live Search
            if (searchInput) searchInput.addEventListener("input", filterMovies);

            if (genreFilter) genreFilter.addEventListener("change", filterMovies);

            if (languageFilter) languageFilter.addEventListener("change", filterMovies);

            if (ratingFilter) ratingFilter.addEventListener("change", filterMovies);

        })

        .catch(error => {

            console.error("Error loading movies:", error);

        });

}


// ================================
// Display Movies
// ================================

function displayMovies(movies) {

    movieContainer.innerHTML = "";

    if (movies.length === 0) {

        movieContainer.innerHTML = "<h2>No Movies Found 😔</h2>";

        return;

    }

    movies.forEach(movie => {

        movieContainer.innerHTML += `

        <div class="movie-card">

            <img src="${movie.poster}" alt="${movie.title}">

            <div class="movie-info">

                <h3>${movie.title}</h3>

                <p>⭐ Rating : ${movie.rating}</p>

                <p>🎭 Genre : ${movie.genre}</p>

                <p>🌐 Language : ${movie.language}</p>
                
                <p>${movie.description}</p>

                <div class="buttons">

    <button onclick="window.open('${movie.trailer}','_blank')">

        🎥 Trailer

    </button>

    <button onclick="addFavorite('${movie.title}')">

        ❤️ Favorite

    </button>

</div>

        </div>

        `;

    });

}
// ================================
// Favorite Movies
// ================================

function addFavorite(movie) {

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (!favorites.includes(movie)) {

        favorites.push(movie);

        localStorage.setItem("favorites", JSON.stringify(favorites));

        alert(movie + " added to Favorites ❤️");

    } else {

        alert(movie + " is already in Favorites ❤️");

    }

}
// =========================
// Dark Mode
// =========================

const themeBtn = document.getElementById("themeBtn");

if(themeBtn){

    themeBtn.addEventListener("click",()=>{

        document.body.classList.toggle("light-mode");

    });

}