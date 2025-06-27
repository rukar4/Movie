const express = require('express')
const axios = require('axios')
const movieServer = express();
require('dotenv').config()

const PORT = 8080;
const TMDB_URL = 'https://api.themoviedb.org/3'
const OPENAI_URL = 'https://api.openai.com/v1/chat/completions'
const clientUrl = process.env.LOCAL ? 'http://localhost:3000' : 'https://rukar4.github.io/Movie/'

const openaiToken = process.env.OPENAI_API_KEY
const tmdbToken = process.env.TMDB_API_TOKEN

const imagePrefix = 'https://image.tmdb.org/t/p'

const maxResults = 10;

movieServer.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', clientUrl)
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
        Authorization: `Bearer ${tmdbToken}`
      }
    }

    const tmdbResponse = await axios.get(requestURL, config)

    const topMovies = getTopMovies(tmdbResponse.data.results)

    res.json({ results: topMovies })
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
        Authorization: `Bearer ${tmdbToken}`
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

movieServer.get('/movie/ai_review', async (req, res) => {
  const { title, release_date } = req.body

  if (!title || !release_date) {
    return res.status(400).json({ error: 'Title and release date are required.' })
  }

  try {
    const response = await axios.post(
      OPENAI_URL,
      {
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'You are a movie critic. Respond in a concise and engaging manner.'
          },
          {
            role: 'user',
            content: `Write a short review for the movie "${title}" released on ${release_date}.`
          }
        ],
        max_tokens: 150
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openaiToken}`
        }
      }
    )
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
    poster_image_url: movie.poster_path ? `${imagePrefix}/w500${movie.poster_path}` : "",
    backdrop_image_url: movie.backdrop_path ? `${imagePrefix}/original${movie.backdrop_path}` : "",
    popularity_summary: parseFloat(movie.vote_average.toFixed(1))
  }
}

movieServer.listen(PORT, () => {
  if (process.env.LOCAL) {
    console.log(`Server running at http://localhost:${PORT}/`)
  }
})
