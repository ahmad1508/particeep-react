import React from 'react'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import TextField from '@material-ui/core/TextField';
import { FormControlLabel, FormLabel, FormControl, makeStyles, Radio, RadioGroup } from '@material-ui/core';
import { useState } from 'react';
import { useHistory } from 'react-router';

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block',
  }
})


export default function Create() {
  const classes = useStyles();
  const history = useHistory();
  const [title, setTilte] = useState('')
  const [details, setDetails] = useState('')
  const [titleError, setTilteError] = useState(false)
  const [detailsError, setDetailsError] = useState(false)
  const [category, setCategory] = useState('todos')

  const handleSubmit = (e) => {
    e.preventDefault()

    setTilteError(false)
    setDetailsError(false)

    if (title == '') {
      setTilteError(true)
    }
    if (details == '') {
      setDetailsError(true)
    }

    if (title && details) {
      fetch('http://localhost:8000/notes', {
        method: 'POST',
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ title, details, category })
      }).then(() => history.push('/'))

    }
  }

  return (
    <Container disabled>
      <Typography
        variant="h6"
        color="textSecondary"
        component="h2"
        gutterBottom
      >
        Add a New Movie
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          onChange={(e) => setTilte(e.target.value)}
          className={classes.field}
          label="Movie Title"
          variant="outlined"
          fullWidth
          required
          error={titleError}
        />
        <FormControl className={classes.field}>
          <FormLabel>Movies Category</FormLabel>
          <RadioGroup value={category} onChange={(e) => setCategory(e.target.value)}>
            <FormControlLabel value="Comedy" control={<Radio />} label="Comedy" />
            <FormControlLabel value="Thriller" control={<Radio />} label="Thriller" />
            <FormControlLabel value="Drame" control={<Radio />} label="Drame" />
            <FormControlLabel value="Animation" control={<Radio />} label="Animation" />
          </RadioGroup>
        </FormControl>


        <Button
          className={classes.btn}
          variant='contained'
          type='submit'
          disableElevation
          endIcon={<KeyboardArrowRightIcon />}
        >
          Submit
        </Button>
      </form>




    </Container>
  )
}
