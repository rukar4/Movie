# Movie

This is a simple app that displays a list of movies with their titles and ratings. The webservice folder holds the
code for the backend, and the webapp folder holds the code for the frontend. Special thanks
to [TMDB](https://www.themoviedb.org/)
for providing the movie data on a public API to make this project possible.

Access the client [here](https://rukar4.github.io/Movie/). Please note that the server may take some time to start as it spins down after 
15 minutes of inactivity.
___

## Running the Application Locally

### Prerequisites

- Node.js and npm should be installed on your machine.

### Install dependencies

You will need to install dependencies for the client and the server.

- Run `npm install` for the server in the root directory.
- Run `npm install` for the client in the [MovieSearch directory](webapp/MovieSearch).

### Running the server

#### Environment Variables

| Variable       | Description                                                                                                             |
|----------------|-------------------------------------------------------------------------------------------------------------------------|
| TMDB_API_KEY   | The API key for the TMDB API. You can get one by creating an account on [TMDB](https://www.themoviedb.org/).            |
| OPENAI_API_KEY | The API key for the OpenAI API. You can get one by creating an account on [OpenAI](https://platform.openai.com/signup). |
| PORT           | The port on which the server will run. Default is 8080.                                                                 |

Run `node server.js` in the [webservice directory](./webservice).

### Running the client

#### Environment Variables

| Variable | Description                                                                                                             |
|----------|-------------------------------------------------------------------------------------------------------------------------|
| API_URL  | The URL of the API server. Default is `http://localhost:8080`. This should point to the server running on your machine. |

Run `npm run dev` in the [MovieSearch directory](webapp/MovieSearch).
___

## Movie Search Client

This is a simple movie search client that allows users to search for movies by title. It uses the Movie Database (TMDB)
API to fetch movie data.

### Deployment

To deploy the Movie Search Client, first run ```npm run generate``` in the [MovieSearch directory](webapp/MovieSearch)
to generate the
static files. This will create a `.output/public` directory, and add an empty file `.nojekyll` to it. This allows GitHub
Pages to serve the static files correctly. Then, run ```npm run deploy``` in
the [MovieSearch directory](webapp/MovieSearch) or
```npm run deploy-client``` from the root directory to deploy the web app.
___

## Movie Search Server

This is a simple movie search server that provides an API for the Movie Search Client. It consumes the TMDB API to fetch
movie data and serves it to the client.

### Deployment

The server is deployed on Render. Once the `master` branch is pushed, Render will automatically build and deploy the
server.

> Note: The OpenAI API key is used for generating movie summaries. However, the deployed server does not currently
> have an active license for OpenAI, so it cannot generate summaries.
___
