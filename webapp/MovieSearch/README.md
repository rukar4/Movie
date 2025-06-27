# Movie Search Client

This is a simple movie search client that allows users to search for movies by title. It uses the Movie Database (TMDB) 
API to fetch movie data.

## Deployment
To deploy the Movie Search Client, generate the static files using ```npm run generate```. In the generated `.output/public`
directory, add an empty file named `.nojekyll` to force GitHub Pages to serve the static files correctly. Then, push the 
contents of the `.output/public` directory. Run the following from the root directory of the project:

```bash
npx gh-pages --dist .\webapp\MovieSearch\.output\public\ --branch gh-pages --message "Deploy static site with .nojekyll" --dotfiles
```