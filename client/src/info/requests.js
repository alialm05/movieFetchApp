let options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: import.meta.env.VITE_API_KEY
    }
};

let recomendationsURL= 'https://api.themoviedb.org/3/movie/movie_id/recommendations?language=en-US&page=1'
export const imgUrl = "https://image.tmdb.org/t/p/original/";

export default options