const express = require('express')
const axios = require('axios')
const movieServer = express();
require('dotenv').config()

const PORT = 8080;
const TMDB_URL = `https://api.themoviedb.org/3`
const apiKey = process.env.TMDB_API_KEY
const apiToken= process.env.TMDB_API_TOKEN

const imagePrefix = 'https://image.tmdb.org/t/p'

const maxResults = 10;

movieServer.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.header('Access-Control-Allow-Methods', 'GET')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    res.header('Access-Control-Allow-Credentials', true)
    next();
});

movieServer.get('/health', (req, res) => {
    res.send('healthy')
})

movieServer.get('/top_movies', async (req, res) => {
    try {
        const query = req.query.search

        if (!query) {
            return res.status(400).json({ error: 'Search query parameter is required.' });
        }

        const requestURL = `${TMDB_URL}/search/movie?include_adult=false&language=en-US&page=1&query=${query}`

        const config = {
            headers: {
                Authorization: `Bearer ${apiToken}`
            }
        }

        const tmdbResponse = await axios.get(requestURL, config)

        const topTenMovies = getTopMovies(tmdbResponse.data.results)

        res.json({results: topTenMovies})
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: error.message
        })
    }
})

movieServer.get('/movie/:id', async (req, res) => {
    try {
        const movieId = req.params.id

        if (!movieId) {
            return res.status(400).json({ error: 'Movie ID is required.' })
        }

        const requestUrl = `${TMDB_URL}/movie/${movieId}?language=en-US`

        const config = {
            headers: {
                Authorization: `Bearer ${apiToken}`
            }
        }

        const tmdbResponse = await axios.get(requestUrl, config)
        if (tmdbResponse.status !== 200) {
            return res.status(tmdbResponse.status).json({ error: 'Failed to fetch movie details.' })
        }

        const movieDetails = parseMovieDetails(tmdbResponse.data)
        res.json(movieDetails)
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: error.message
        })
    }
})

function getTopMovies(data) {
    const sortedMovies = data.sort((a, b) => b.vote_average - a.vote_average)
    const topMovies = sortedMovies.slice(0, maxResults)
    return topMovies.map(movie => ({
        movie_id: movie.id,
        title: movie.title,
        // TODO: implement default image
        poster_image_url: movie.poster_path ? `${imagePrefix}/w500${movie.poster_path}` : "",
        popularity_summary: parseFloat(movie.vote_average.toFixed(1))
    }))
}

function parseMovieDetails(movie) {
    let runtimeHours = 0;
    let runtimeMinutes = 0;

    if (movie.runtime) {
        runtimeHours = Math.floor(movie.runtime / 60);
        runtimeMinutes = movie.runtime % 60;
    }

    return {
        movie_id: movie.id,
        title: movie.title,
        overview: movie.overview,
        release_date: movie.release_date,
        runtime_hours: runtimeHours,
        runtime_minutes: runtimeMinutes,
        genres: movie.genres.map(genre => genre.name) || [],
        // TODO: implement default image
        poster_image_url: movie.poster_path ? `${imagePrefix}/w500${movie.poster_path}` : "",
        backdrop_image_url: movie.backdrop_path ? `${imagePrefix}/original${movie.backdrop_path}` : "",
        popularity_summary: parseFloat(movie.vote_average.toFixed(1))
    }
}

movieServer.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`)
})
