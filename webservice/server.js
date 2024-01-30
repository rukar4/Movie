const express = require('express')
const axios = require('axios')
const movieServer = express();
require('dotenv').config()

const PORT = 8080;
const TMDB_URL = process.env.TMDB_URL
const apiKey = process.env.API_KEY
const apiToken= process.env.API_TOKEN

movieServer.get('/health', (req, res) => {
    res.send('we do be workin')
})

movieServer.get('/:query', async (req, res) => {
    try {
        const query = req.params.query

        const requestURL = `${TMDB_URL}&query=${query}&api_key=${apiKey}`

        const config = {
            headers: {
                Authorization: `Bearer ${apiToken}`
            }
        }

        const TMDBResponse = await axios.get(requestURL, config)

        res.json({results: TMDBResponse.data})
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: error.message
        })
    }
})

function processTmdbResponse(data) {
    const formattedData = data.results.map(result => ({

    }))
}

movieServer.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`)
})
