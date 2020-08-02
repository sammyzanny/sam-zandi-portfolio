import React from 'react';
import {
  BrowserRouter as Router,
  Route, Switch
} from 'react-router-dom';
import NavBar from './components/NavBar';
import Items from './containers/Items';
import Profile from './components/Profile';
import ItemForm from './components/ItemForm';
import Home from './components/Home'
import {connect} from 'react-redux';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { login } from './actions/items'
import  UserSearch from './containers/UserSearch'
import Button from '@material-ui/core/Button'

class App extends React.Component {
  
  render(){
    return (
    <Router >
      <React.Fragment>
      <NavBar currentUser={this.props.currentUser}/>
     { this.props.currentUser ? <Button onClick={this.signOut} variant="contained" color="primary" style={{float: "right"}}>Sign Out</Button> : null}
      <Switch >
        <Route exact path="/aboutme" render={(rp) => <Items {...rp} currentUser={this.props.currentUser} items={this.props.items} type="items"/>} />
        {this.props.currentUser ? 
        <Route exact path="/apps" render={(rp) => <Profile {...rp} loggedIn={!!this.props.currentUser}/>} />
        <Route exact path="/research" render={(rp) => <Items {...rp} currentUser={this.props.currentUser} items={this.props.customItems} type="items"/>} />
        <Route exact path="/blog" component={Blog} />
        <Route exact path="/blog" render={(rp) => <Login {...rp} loggedIn={!!this.props.currentUser}/>} />
        <Route exact path="/sign-up" render={(rp) => <SignUp {...rp} loggedIn={!!this.props.currentUser}/> } />
        <Route exact path="/users/with/:itemname" render={(rp) => <UserSearch {...rp} currentUser={this.props.currentUser}/> } />
        <Route exact path="/users/named/:username" render={(rp) => <UserSearch {...rp} currentUser={this.props.currentUser}/> } />
        <Route path='/' render={(rp) => <Home {...rp}/>} />
      </Switch>
      </ React.Fragment>
    </Router>
  )}
};



export default App