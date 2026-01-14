
const API_KEY = 'ae45b35'; 
const BASE_URL = 'https://www.omdbapi.com/';


const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const randomBtn = document.getElementById('randomBtn');
const yearFilter = document.getElementById('yearFilter');
const typeFilter = document.getElementById('typeFilter');
const movieGrid = document.getElementById('movieGrid');
const movieCount = document.getElementById('movieCount');
const loading = document.getElementById('loading');
const movieModal = document.getElementById('movieModal');
const modalBody = document.getElementById('modalBody');
const closeBtn = document.querySelector('.close-btn');


let currentSearch = 'action';
let currentPage = 1;
let totalResults = 0;


document.addEventListener('DOMContentLoaded', () => {
   
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= currentYear - 50; year--) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearFilter.appendChild(option);
    }

    
    searchMovies('action');
    
    
    searchBtn.addEventListener('click', () => {
        if (searchInput.value.trim()) {
            currentSearch = searchInput.value.trim();
            currentPage = 1;
            searchMovies(currentSearch);
        }
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && searchInput.value.trim()) {
            currentSearch = searchInput.value.trim();
            currentPage = 1;
            searchMovies(currentSearch);
        }
    });

    randomBtn.addEventListener('click', getRandomMovie);

    yearFilter.addEventListener('change', applyFilters);
    typeFilter.addEventListener('change', applyFilters);

    closeBtn.addEventListener('click', () => {
        movieModal.classList.add('hidden');
    });

    movieModal.addEventListener('click', (e) => {
        if (e.target === movieModal) {
            movieModal.classList.add('hidden');
        }
    });

    
    window.addEventListener('scroll', () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
            if (currentPage * 10 < totalResults) {
                currentPage++;
                loadMoreMovies();
            }
        }
    });
});


async function searchMovies(query) {
    showLoading();
    clearResults();

    const year = yearFilter.value;
    const type = typeFilter.value;

    try {
        const response = await fetch(
            `${BASE_URL}?s=${encodeURIComponent(query)}&apikey=${API_KEY}&page=${currentPage}${year ? `&y=${year}` : ''}${type ? `&type=${type}` : ''}`
        );
        const data = await response.json();

        if (data.Response === 'True') {
            totalResults = parseInt(data.totalResults);
            displayMovies(data.Search);
            displayMovieCount(totalResults, query);
        } else {
            showError(data.Error);
        }
    } catch (error) {
        showError('Failed to fetch movies. Please try again.');
        console.error('Error:', error);
    } finally {
        hideLoading();
    }
}


async function loadMoreMovies() {
    showLoading();

    const year = yearFilter.value;
    const type = typeFilter.value;

    try {
        const response = await fetch(
            `${BASE_URL}?s=${encodeURIComponent(currentSearch)}&apikey=${API_KEY}&page=${currentPage}${year ? `&y=${year}` : ''}${type ? `&type=${type}` : ''}`
        );
        const data = await response.json();

        if (data.Response === 'True') {
            displayMovies(data.Search, true);
        }
    } catch (error) {
        console.error('Error:', error);
    } finally {
        hideLoading();
    }
}


async function getRandomMovie() {
    showLoading();
    
    
    const randomTerms = ['love', 'action', 'comedy', 'drama', 'sci', 'horror', 'war', 'music'];
    const randomTerm = randomTerms[Math.floor(Math.random() * randomTerms.length)];
    
    try {
        const response = await fetch(
            `${BASE_URL}?s=${randomTerm}&apikey=${API_KEY}&page=${Math.floor(Math.random() * 5) + 1}`
        );
        const data = await response.json();

        if (data.Response === 'True') {
            const randomMovie = data.Search[Math.floor(Math.random() * data.Search.length)];
            showMovieDetails(randomMovie.imdbID);
        }
    } catch (error) {
        showError('Failed to get random movie. Please try again.');
        console.error('Error:', error);
    } finally {
        hideLoading();
    }
}


function displayMovies(movies, append = false) {
    if (!append) {
        movieGrid.innerHTML = '';
    }

    movies.forEach(movie => {
        const movieCard = createMovieCard(movie);
        movieGrid.appendChild(movieCard);
    });
}


function createMovieCard(movie) {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.innerHTML = `
        ${movie.Poster !== 'N/A' 
            ? `<img src="${movie.Poster}" alt="${movie.Title}" class="poster" loading="lazy">`
            : `<div class="no-poster"><i class="fas fa-film fa-3x"></i><p>No Poster Available</p></div>`
        }
        <div class="movie-info">
            <h3 class="movie-title" title="${movie.Title}">${movie.Title}</h3>
            <div class="movie-details">
                <span>${movie.Year}</span>
                <span class="movie-type type-${movie.Type}">${movie.Type}</span>
            </div>
            <button class="view-btn" onclick="showMovieDetails('${movie.imdbID}')">
                <i class="fas fa-info-circle"></i> View Details
            </button>
        </div>
    `;
    return card;
}


async function showMovieDetails(imdbID) {
    showLoading();
    
    try {
        const response = await fetch(`${BASE_URL}?i=${imdbID}&apikey=${API_KEY}&plot=full`);
        const movie = await response.json();

        if (movie.Response === 'True') {
            displayMovieDetails(movie);
        } else {
            showError('Movie details not found.');
        }
    } catch (error) {
        showError('Failed to load movie details.');
        console.error('Error:', error);
    } finally {
        hideLoading();
    }
}


function displayMovieDetails(movie) {
    modalBody.innerHTML = `
        <div class="modal-details">
            <div class="modal-poster-section">
                ${movie.Poster !== 'N/A' 
                    ? `<img src="${movie.Poster}" alt="${movie.Title}" class="modal-poster">`
                    : `<div class="no-poster" style="height: 450px;"><i class="fas fa-film fa-4x"></i><p>No Poster Available</p></div>`
                }
            </div>
            <div class="modal-info">
                <h2>${movie.Title} (${movie.Year})</h2>
                
                <div class="meta-info">
                    <span class="meta-item"><i class="fas fa-star"></i> ${movie.imdbRating}/10</span>
                    <span class="meta-item"><i class="fas fa-clock"></i> ${movie.Runtime}</span>
                    <span class="meta-item"><i class="fas fa-film"></i> ${movie.Genre}</span>
                    <span class="meta-item"><i class="fas fa-globe"></i> ${movie.Language}</span>
                    <span class="meta-item"><i class="fas fa-calendar"></i> ${movie.Released}</span>
                </div>

                <div class="plot">
                    <h3><i class="fas fa-book-open"></i> Plot</h3>
                    <p>${movie.Plot}</p>
                </div>

                <div class="ratings">
                    ${movie.Ratings.map(rating => `
                        <div class="rating-item">
                            <div class="rating-value">${rating.Value}</div>
                            <div class="rating-source">${rating.Source}</div>
                        </div>
                    `).join('')}
                </div>

                <div class="details-grid">
                    <div class="detail-item">
                        <div class="detail-label">Director</div>
                        <div class="detail-value">${movie.Director}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Writer</div>
                        <div class="detail-value">${movie.Writer}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Actors</div>
                        <div class="detail-value">${movie.Actors}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Awards</div>
                        <div class="detail-value">${movie.Awards}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Box Office</div>
                        <div class="detail-value">${movie.BoxOffice || 'N/A'}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Production</div>
                        <div class="detail-value">${movie.Production || 'N/A'}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Country</div>
                        <div class="detail-value">${movie.Country}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Rated</div>
                        <div class="detail-value">${movie.Rated}</div>
                    </div>
                </div>
            </div>
        </div>
    `;

    movieModal.classList.remove('hidden');
}


function applyFilters() {
    currentPage = 1;
    searchMovies(currentSearch);
}


function displayMovieCount(count, query) {
    movieCount.innerHTML = `
        <i class="fas fa-video"></i> Found ${count} results for "${query}"
        ${yearFilter.value ? ` in ${yearFilter.value}` : ''}
        ${typeFilter.value ? ` (${typeFilter.value})` : ''}
    `;
}


function showError(message) {
    movieGrid.innerHTML = `
        <div class="error-message" style="grid-column: 1 / -1; text-align: center; padding: 50px;">
            <i class="fas fa-exclamation-triangle fa-3x" style="color: #e52e71; margin-bottom: 20px;"></i>
            <h3 style="color: #ff6b9d;">${message}</h3>
            <p style="color: #b0b0d0; margin-top: 10px;">Please try a different search term.</p>
        </div>
    `;
    movieCount.innerHTML = `<i class="fas fa-exclamation-circle"></i> No movies found`;
}


function showLoading() {
    loading.classList.remove('hidden');
}

function hideLoading() {
    loading.classList.add('hidden');
}

function clearResults() {
    movieGrid.innerHTML = '';
}