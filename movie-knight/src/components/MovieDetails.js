import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getMovieDetail } from '../actions/index';
import { connect } from 'react-redux'

const MovieDetails = props =>{

    const [movie, setMovie] = useState()

    useEffect(() =>{
      axios
      .post(`https://movieknight01.herokuapp.com/api/movies/moviedetails`, {'title': `${props.location.pathname.slice(9, )}` })
      .then(respone =>{
        setMovie(respone.data)
        // console.log('respon in useEffect ',respone.data.casts[0][0].name)
      })
      .catch(err =>{
        console.log(err)
      })
    }, [])

    if(!movie){
      return(
        <h1>Lodding...</h1>
      )
    }else{
      console.log(movie.videos)
      return (
          <div>
            <img src={`http://image.tmdb.org/t/p/w185/${movie.movie.poster_path}`} />
            <h5>{movie.movie.original_title}</h5>
            <p>Rating: {movie.movie.vote_average}</p>
            <p>{movie.movie.overview}</p>

              <h3>Cast</h3>
              {
                movie.casts[0].map(people =>(
                  <div key={people.cast_id}>
                    <img src={`http://image.tmdb.org/t/p/w185/${people.profile_path}`} />
                    <p>{people.name}</p>
                  </div>
                ))
              }
          </div>
      )
    }

}


const mapStateToProps = state => {
  return {
    movieDetails: state.movieDetails
  }
}

export default connect(mapStateToProps, { getMovieDetail })(MovieDetails);