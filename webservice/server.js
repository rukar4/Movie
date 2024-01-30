const express = require('express')
const axios = require('axios')
const movieServer = express();
require('dotenv').config()

const PORT = 8080;
const TMDB_URL = `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1`
const apiKey = process.env.API_KEY
const apiToken= process.env.API_TOKEN

movieServer.get('/health', (req, res) => {
    res.send('healthy')
})

movieServer.get('/movie', async (req, res) => {
    try {
        const query = req.query.search

        if (!query) {
            return res.status(400).json({ error: 'Search query parameter is required.' });
        }

        const requestURL = `${TMDB_URL}&query=${query}&api_key=${apiKey}`

        const config = {
            headers: {
                Authorization: `Bearer ${apiToken}`
            }
        }

        const tmdbResponse = await axios.get(requestURL, config)

        const topTenMovies = getTopTenMovies(tmdbResponse.data.results)

        res.json({results: topTenMovies})
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: error.message
        })
    }
})

function getTopTenMovies(data) {
    const sortedMovies = data.sort((a, b) => b.vote_average - a.vote_average)
    console.log('sorted movies\n' + sortedMovies.toString())

    const topTenMovies = sortedMovies.slice(0, 10)
    console.log('list length = ' + topTenMovies.length)

    return formatMovieData(topTenMovies)
}

function formatMovieData(movieList){
    return movieList.map(movie => ({
        movie_id: movie.id,
        title: movie.title,
        poster_image_url: movie.poster_path,
        popularity_summary: movie.popularity
    }))
}

movieServer.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`)
})
