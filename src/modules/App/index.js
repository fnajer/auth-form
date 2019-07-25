import React from 'react';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from 'modules/Header';
import Main from 'modules/LocalesManager';
import SignIn from 'modules/Auth/SignIn';

import { loadInitialInfo } from './actions'

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(loadInitialInfo())
  }

  render() {
    return (
      <Router>
        <Header/>
        <Switch>
          <Route 
            exact 
            path='/' 
            component={(props) => <Main {...props} />}
          />
          <Route 
            path='/signin' 
            component={(props) => <SignIn {...props}/>}
          />
        </Switch>
      </Router>
    );
  }
}

export default connect()(App);
