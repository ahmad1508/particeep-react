import React, { useEffect, useState } from 'react';
import { Grid, Container } from '@material-ui/core';
import MovieCard from '../components/MovieCard'
import { ContactSupportOutlined } from '@material-ui/icons';
import { FormControlLabel, FormLabel, FormControl, makeStyles, Radio, RadioGroup } from '@material-ui/core';
const movies = require('../Movies');

export default function MovieDisplay() {
  const [movie, setMovie] = useState([]);
  const [category, setCategory] = useState('All')
  /* we wait for data fetch to complete then aplly .json method 
  on fetch() to transform to redeable data */
  useEffect(async () => {
    const res = await movies.movies$;
    setMovie(res);
  }, [])

  const handleDelete = async (id) => {

    const newMovies = movie.filter(mov => mov.id != id)
    setMovie(newMovies)

  }

  const handleLike = async (id) => {
    const newMovie = movie;
    newMovie.likes += 1;
    setMovie(newMovie)
  }

  return (

    <Container>

      <FormControl>
        <FormLabel>Movies Category</FormLabel>
        <RadioGroup value={category} onChange={(e) => setCategory(e.target.value)}>
          <FormControlLabel value="All" control={<Radio />} label="All" />

          <FormControlLabel value="Comedy" control={<Radio />} label="Comedy" />
          <FormControlLabel value="Thriller" control={<Radio />} label="Thriller" />
          <FormControlLabel value="Drame" control={<Radio />} label="Drame" />
          <FormControlLabel value="Animation" control={<Radio />} label="Animation" />
        </RadioGroup>
      </FormControl>

      <Grid container spacing={3}>

        {category === 'All' && movie.map(mov => (
          <Grid item key={mov.id} xs={12} md={6} lg={4}>
            <MovieCard mov={mov} handleDelete={handleDelete} handleLike={handleLike} />
          </Grid>
          ))

        }
      </Grid>
    </Container>
  )
}
