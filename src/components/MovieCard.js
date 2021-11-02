import React from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { Avatar, IconButton, makeStyles, Typography } from '@material-ui/core';
import { DeleteOutlined } from '@material-ui/icons';
import { blue, pink, yellow, green } from '@material-ui/core/colors';
import CardActions from '@material-ui/core/CardActions';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';

const useStyles = makeStyles({
  avatar: {
    backgroundColor: (mov) => {
      if (mov.category[0].toUpperCase() == 'C') {
        return yellow[700]
      }
      if (mov.category[0].toUpperCase() == 'D') {
        return pink[500]
      }
      if (mov.category[0].toUpperCase() == 'T') {
        return blue[500]
      }
      return green[500]

    }
  },
  margin: {
    marginLeft: "15px"
  }

})

export default function MovieCard({ mov, handleDelete,handleLike }) {
  const classes = useStyles(mov)
  let likes = mov.likes;
  return (
    <div>
      <Card elevation={1} className={classes.test}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              {mov.category[0].toUpperCase()}
            </Avatar>
          }
          action={
            <IconButton onClick={() => handleDelete(mov.id)}>
              <DeleteOutlined />
            </IconButton>
          }
          title={mov.title}
          subheader={mov.category}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            {mov.details}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton onClick={() => handleLike(mov.id)}>
            <ThumbUpOutlinedIcon onClick />{likes}
          </IconButton>
          <IconButton>
            <ThumbDownOutlinedIcon className={classes.margin} />{mov.dislikes}
          </IconButton>
        </CardActions>
      </Card>

    </div >
  )
}
