import { makeStyles } from '@material-ui/core'
import React from 'react'
import { Drawer } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { AddCircleOutlined, SubjectOutlined } from '@material-ui/icons';
import { useHistory, useLocation } from 'react-router-dom';
import { AppBar,Toolbar } from '@material-ui/core';
import format from 'date-fns/format';
import { Avatar } from '@material-ui/core';

const drawerWidth = 240;

const useStyles = makeStyles((theme)=>{
  return {
    root: {
      display: 'flex',
    },
    page: {
      background: '#f9f9f9',
      width: '100%',
      padding:theme.spacing(3)
    },
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    active: {
      background: "#f4f4f4"
    },
    title:{
      padding:theme.spacing(2)
    },
    appbar:{
      width: `calc(100% - ${drawerWidth}px)`
    },
    toolbar: theme.mixins.toolbar, //get the classes associated with the toolbar including the height
    date:{
      flexGrow:1,
    },
    avatar:{
      marginLeft:theme.spacing(2)
    }
  }
  
})

export default function Layout({ children }) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();// to determine what page we're on 

  const menuItems = [
    {
      text: 'Movies',
      icon: <SubjectOutlined color="secondary" />,
      path: '/'
    },
    {
      text: 'Add Movies',
      icon: <AddCircleOutlined color="secondary" />,
      path: '/create'
    }
  ]

  return (
    <div className={classes.root}>
      {/* App Bar */}
      <AppBar 
      className={classes.appbar}
      elevation={0}

      >
        <Toolbar>
          <Typography className={classes.date}>
            Today is the {format(new Date(), 'do MMMM Y')}
          </Typography>
          <Typography>
            Mario
          </Typography>
          <Avatar src="/mario.png" className={classes.avatar}/>
        </Toolbar>
      </AppBar>


      {/* Side drawer */}
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{ paper: classes.drawerPaper }}
      >
        <div>
          <Typography variant="h5" className={classes.title}>
          Movies Discovery
          </Typography>
        </div>
        {/* List / Links */}
        <List>
          {menuItems.map(item => (
            <ListItem button key={item.text}
              //the history.push redirects the user to the path indicated 
              onClick={() => history.push(item.path)}

              // we're gonna look if the location pathname is equal to the path of item
              className={location.pathname == item.path ? classes.active : null}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>

      </Drawer>

      <div className={classes.page}>
      <div className={classes.toolbar}></div>
        {children}
      </div>
    </div>
  )
}
