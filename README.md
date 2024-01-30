# Movie

This is a simple app that displays a list of movies with their titles and ratings. The webservice folder holds the
code for the backend, and the webapp folder holds the code for the frontend.

## Prerequisites

- Node.js and npm should be installed on your machine.

## Install dependencies

You will need to install dependencies for the client and the server. Use npm install for both cases.

- Install dependencies for the server in the root directory.
- Install dependencies for the client in the [MovieSearch directory](webapp/MovieSearch).

## Running the server

Run `node server.js` in the [webservice directory](./webservice).

## Running the client

Run `npm run dev` in the [MovieSearch directory](webapp/MovieSearch).

## Comments

I thoroughly enjoyed this challenge, even though I ended up running out of time to implement everything I wanted to.
Although I have debugged many of BYU's APIs and frontend services, I have never had to build something from the ground
up like this.

If I were to come back to this, I would have left myself more time for the frontend development. I ran out
of time before I could make it look how I wanted. The goal was to have the list be a series of containers with the
poster on the left and the ratings on the right.

I didn't quite pace myself as well as I should have. I also could not figure out how to bring in the pictures from the
TMDB. I copied the provided path, but none of the combinations I tried with the base URL worked, so I'm not sure where
they were supposed to take me to. One thing that I will definitely be doing is figuring out how to point both the client
and the server to the same node_modules repository. I couldn't figure it out because I was on a time crunch when I made
it to that point, but I will revisit that after I submit this challenge.

In any case, it was a great challenge and I hope this demonstrates my capabilities. Best of luck to you hiring officers!