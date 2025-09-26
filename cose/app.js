$(document).ready(function() {
    // Movie data - using the provided sample data
    let movies = [
        {
            "id": 1,
            "title": "The Shawshank Redemption",
            "year": 1994,
            "genre": "Drama",
            "director": "Frank Darabont",
            "plot": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
            "poster": "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg",
            "rating": 9.3,
            "reviews": [
                {
                    "id": 1,
                    "user": "MovieBuff2023",
                    "rating": 10,
                    "comment": "A masterpiece that touches the soul. Morgan Freeman's narration is unforgettable."
                },
                {
                    "id": 2,
                    "user": "CinemaLover",
                    "rating": 9,
                    "comment": "Brilliantly crafted story about hope and friendship. A must-watch!"
                }
            ]
        },
        {
            "id": 2,
            "title": "The Godfather",
            "year": 1972,
            "genre": "Crime, Drama",
            "director": "Francis Ford Coppola",
            "plot": "An aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
            "poster": "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
            "rating": 9.2,
            "reviews": [
                {
                    "id": 3,
                    "user": "ClassicFilmFan",
                    "rating": 10,
                    "comment": "The ultimate crime saga. Brando's performance is legendary."
                }
            ]
        },
        {
            "id": 3,
            "title": "The Dark Knight",
            "year": 2008,
            "genre": "Action, Crime, Drama",
            "director": "Christopher Nolan",
            "plot": "Batman faces the Joker, a criminal mastermind who wants to bring chaos to Gotham City.",
            "poster": "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg",
            "rating": 9.0,
            "reviews": [
                {
                    "id": 4,
                    "user": "SuperheroFan",
                    "rating": 10,
                    "comment": "Heath Ledger's Joker is absolutely terrifying and brilliant. RIP to a legend."
                },
                {
                    "id": 5,
                    "user": "ActionMovieAddict",
                    "rating": 9,
                    "comment": "Nolan created a masterpiece. The practical effects are incredible."
                }
            ]
        },
        {
            "id": 4,
            "title": "Pulp Fiction",
            "year": 1994,
            "genre": "Crime, Drama",
            "director": "Quentin Tarantino",
            "plot": "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
            "poster": "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
            "rating": 8.9,
            "reviews": [
                {
                    "id": 6,
                    "user": "TarantinoFan",
                    "rating": 9,
                    "comment": "Non-linear storytelling at its finest. Iconic dialogue and characters."
                }
            ]
        },
        {
            "id": 5,
            "title": "Forrest Gump",
            "year": 1994,
            "genre": "Drama, Romance",
            "director": "Robert Zemeckis",
            "plot": "The presidencies of Kennedy and Johnson through the eyes of an Alabama man with an IQ of 75.",
            "poster": "https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
            "rating": 8.8,
            "reviews": [
                {
                    "id": 7,
                    "user": "HeartStrings",
                    "rating": 9,
                    "comment": "Tom Hanks delivers an incredible performance. Life is like a box of chocolates!"
                }
            ]
        },
        {
            "id": 6,
            "title": "Inception",
            "year": 2010,
            "genre": "Action, Sci-Fi, Thriller",
            "director": "Christopher Nolan",
            "plot": "A thief who enters the dreams of others to steal their secrets gets a chance to have his criminal record erased.",
            "poster": "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
            "rating": 8.7,
            "reviews": [
                {
                    "id": 8,
                    "user": "SciFiGeek",
                    "rating": 9,
                    "comment": "Mind-bending masterpiece! Nolan's best work in my opinion."
                }
            ]
        }
    ];

    let filteredMovies = [...movies];
    let currentMovie = null;
    let selectedRating = 0;

    // Initialize the application
    function init() {
        populateGenreFilter();
        renderMovies(filteredMovies);
        updateMovieCount(filteredMovies.length);
        bindEvents();
    }

    // Populate genre filter dropdown
    function populateGenreFilter() {
        const genres = new Set();
        movies.forEach(movie => {
            movie.genre.split(', ').forEach(g => genres.add(g.trim()));
        });

        const genreSelect = $('#genreFilter');
        genreSelect.html('<option value="">All Genres</option>');
        
        Array.from(genres).sort().forEach(genre => {
            genreSelect.append(`<option value="${genre}">${genre}</option>`);
        });
    }

    // Render movies grid
    function renderMovies(moviesToRender) {
        const moviesGrid = $('#moviesGrid');
        const noResults = $('#noResults');

        if (moviesToRender.length === 0) {
            moviesGrid.empty();
            noResults.removeClass('d-none');
            return;
        }

        noResults.addClass('d-none');
        moviesGrid.empty();

        moviesToRender.forEach(movie => {
            const movieCard = createMovieCard(movie);
            moviesGrid.append(movieCard);
        });
    }

    // Create individual movie card
    function createMovieCard(movie) {
        const stars = generateStars(Math.round(movie.rating / 2));
        const genres = movie.genre.split(', ').map(g => 
            `<span class="movie-genre">${g.trim()}</span>`
        ).join(' ');

        return `
            <div class="col-lg-4 col-md-6">
                <div class="card movie-card" data-movie-id="${movie.id}">
                    <img src="${movie.poster}" class="movie-poster" alt="${movie.title}">
                    <div class="card-body">
                        <h5 class="movie-title">${movie.title}</h5>
                        <div class="movie-meta">
                            <span>${movie.year}</span>
                            <span>•</span>
                            <span>${movie.director}</span>
                        </div>
                        <div class="mb-3">
                            ${genres}
                        </div>
                        <div class="movie-rating mb-3">
                            <span class="rating-value">${movie.rating}</span>
                            <div class="stars">${stars}</div>
                            <span class="text-muted">(${movie.reviews.length} reviews)</span>
                        </div>
                        <p class="movie-plot">${movie.plot}</p>
                    </div>
                </div>
            </div>
        `;
    }

    // Generate star ratings
    function generateStars(rating) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars += '<i class="fas fa-star"></i>';
            } else {
                stars += '<i class="far fa-star"></i>';
            }
        }
        return stars;
    }

    // Update movie count
    function updateMovieCount(count) {
        $('#movieCount').text(`${count} movie${count !== 1 ? 's' : ''}`);
    }

    // Search functionality
    function searchMovies(query) {
        const searchTerm = query.toLowerCase();
        filteredMovies = movies.filter(movie => 
            movie.title.toLowerCase().includes(searchTerm) ||
            movie.director.toLowerCase().includes(searchTerm) ||
            movie.genre.toLowerCase().includes(searchTerm)
        );
        
        applyGenreFilter();
    }

    // Genre filter functionality
    function applyGenreFilter() {
        const selectedGenre = $('#genreFilter').val();
        
        if (selectedGenre) {
            filteredMovies = filteredMovies.filter(movie => 
                movie.genre.includes(selectedGenre)
            );
        }
        
        renderMovies(filteredMovies);
        updateMovieCount(filteredMovies.length);
    }

    // Show movie details in modal
    function showMovieDetails(movieId) {
        currentMovie = movies.find(movie => movie.id === movieId);
        
        if (!currentMovie) return;

        // Populate modal with movie details
        $('#movieModalTitle').text(currentMovie.title);
        $('#modalPoster').attr('src', currentMovie.poster).attr('alt', currentMovie.title);
        $('#modalDirector').text(currentMovie.director);
        $('#modalYear').text(currentMovie.year);
        $('#modalGenre').text(currentMovie.genre);
        $('#modalRating').text(currentMovie.rating);
        $('#modalStars').html(generateStars(Math.round(currentMovie.rating / 2)));
        $('#modalPlot').text(currentMovie.plot);

        // Reset review form
        resetReviewForm();

        // Populate reviews
        renderReviews();

        // Show modal
        $('#movieModal').modal('show');
    }

    // Render reviews in modal
    function renderReviews() {
        const reviewsList = $('#reviewsList');
        const reviewCount = $('#reviewCount');
        
        reviewCount.text(currentMovie.reviews.length);
        reviewsList.empty();

        if (currentMovie.reviews.length === 0) {
            reviewsList.html('<p class="text-muted">No reviews yet. Be the first to write one!</p>');
            return;
        }

        currentMovie.reviews.forEach(review => {
            const reviewCard = createReviewCard(review);
            reviewsList.append(reviewCard);
        });
    }

    // Create individual review card
    function createReviewCard(review) {
        const stars = generateStars(Math.round(review.rating / 2));
        
        return `
            <div class="review-card">
                <div class="review-header">
                    <span class="review-author">${review.user}</span>
                    <div class="review-rating">
                        <span class="rating-number">${review.rating}/10</span>
                        <div class="stars">${stars}</div>
                    </div>
                </div>
                <p class="review-comment">${review.comment}</p>
            </div>
        `;
    }

    // Handle star rating selection
    function handleStarRating() {
        const stars = $('#starRating i');
        
        stars.on('mouseenter', function() {
            const rating = $(this).data('rating');
            highlightStars(rating);
        });

        stars.on('mouseleave', function() {
            highlightStars(selectedRating);
        });

        stars.on('click', function() {
            selectedRating = $(this).data('rating');
            highlightStars(selectedRating);
        });
    }

    // Highlight stars based on rating
    function highlightStars(rating) {
        $('#starRating i').each(function(index) {
            if (index < rating) {
                $(this).addClass('active');
            } else {
                $(this).removeClass('active');
            }
        });
    }

    // Reset review form
    function resetReviewForm() {
        $('#reviewForm')[0].reset();
        selectedRating = 0;
        highlightStars(0);
    }

    // Handle review submission
    function submitReview(event) {
        event.preventDefault();
        
        const reviewerName = $('#reviewerName').val().trim();
        const reviewComment = $('#reviewComment').val().trim();
        
        if (!reviewerName || !reviewComment || selectedRating === 0) {
            alert('Please fill in all fields and select a rating.');
            return;
        }

        // Create new review
        const newReview = {
            id: Date.now(), // Simple ID generation
            user: reviewerName,
            rating: selectedRating * 2, // Convert 5-star to 10-point scale
            comment: reviewComment
        };

        // Add review to current movie
        currentMovie.reviews.push(newReview);

        // Update the movie in the main array
        const movieIndex = movies.findIndex(m => m.id === currentMovie.id);
        if (movieIndex !== -1) {
            movies[movieIndex] = currentMovie;
        }

        // Re-render reviews
        renderReviews();

        // Reset form
        resetReviewForm();

        // Show success message
        showSuccessMessage('Review submitted successfully!');
    }

    // Show success message
    function showSuccessMessage(message) {
        // Create and show a temporary success alert
        const alert = $(`
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                <i class="fas fa-check-circle me-2"></i>${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `);
        
        $('.modal-body').prepend(alert);
        
        // Auto-remove after 3 seconds
        setTimeout(() => {
            alert.fadeOut(() => alert.remove());
        }, 3000);
    }

    // Bind all events
    function bindEvents() {
        // Search input
        $('#searchInput').on('input', function() {
            const query = $(this).val();
            filteredMovies = [...movies]; // Reset to all movies
            searchMovies(query);
        });

        // Genre filter
        $('#genreFilter').on('change', function() {
            const searchQuery = $('#searchInput').val();
            filteredMovies = [...movies]; // Reset to all movies
            if (searchQuery) {
                searchMovies(searchQuery);
            } else {
                applyGenreFilter();
            }
        });

        // Movie card click
        $(document).on('click', '.movie-card', function() {
            const movieId = parseInt($(this).data('movie-id'));
            showMovieDetails(movieId);
        });

        // Star rating
        handleStarRating();

        // Review form submission
        $('#reviewForm').on('submit', submitReview);

        // Modal hidden event - reset form
        $('#movieModal').on('hidden.bs.modal', function() {
            resetReviewForm();
        });
    }

    // Initialize the application
    init();
});
