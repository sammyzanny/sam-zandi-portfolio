import React from 'react';
import {
  BrowserRouter as Router,
  Route, Switch
} from 'react-router-dom';
import NavBar from './components/NavBar';
import AboutMe from './containers/AboutMe';
import MyApps from './containers/MyApps';
import Research from './pages/Research';
import Blog from './pages/Blog'
import Home from './pages/Home'
import Button from '@material-ui/core/Button'

class App extends React.Component {
  
  render(){
    return (
    <Router >
      <React.Fragment>
      <NavBar currentUser={this.props.currentUser}/>
      <Switch >
        <Route exact path="/aboutme" render={(rp) => <AboutMe {...rp} currentUser={this.props.currentUser} items={this.props.items} type="items"/>} />
        <Route exact path="/apps" render={(rp) => <MyApps {...rp} />} />
        <Route exact path="/research" render={(rp) => <Research {...rp} currentUser={this.props.currentUser} items={this.props.customItems} type="items"/>} />
        <Route exact path="/blog" component={Blog} />
        <Route path='/' render={(rp) => <Home {...rp}/>} />
      </Switch>
      </ React.Fragment>
    </Router>
  )}
};



export default App