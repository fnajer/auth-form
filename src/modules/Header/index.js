import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import LanguageSelector from './components/LanguageSelector'

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
    ul: {
      margin: 0,
      padding: 0,
    },
    li: {
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
}));


function Header(props) {
  const classes = useStyles();
  const { token } = props
  return (
    <>
      <CssBaseline />
      <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
            WhTest
          </Typography>
          <LanguageSelector />
          <nav>
            <Link to='/'>Main</Link>
            {!token && <Link to='/signin'>Login</Link>}
          </nav>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default connect(state => ({
  token: state.auth.token
}))(Header);