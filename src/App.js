import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import About from './components/layout/About';
import Users from './components/user/Users';
import User from './components/user/User';
import axios from 'axios';
import Search from './components/user/Search';

let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !== 'production') {
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  githubClientId = process.env.GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
}



class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null,
  }

  // Search User
  searchUser = async text => {
    this.setState({ loading: true })
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret=${githubClientSecret}`);
    this.setState({ users: res.data.items, loading: false })
  }

  // Get a single user
  getUser = async (username) => {
    this.setState({ loading: true })
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${githubClientId}&client_secret=${githubClientSecret}`);
    this.setState({ user: res.data, loading: false })
  }

  // Get User Repos
  getUserRepos = async (username) => {
    this.setState({ loading: true })
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`);
    this.setState({ repos: res.data, loading: false })
  }

  // Clear Users from state
  clearUser = () => this.setState({ users: [], loading: false })

  // Alert Message
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } })
    setTimeout(() => {
      this.setState({ alert: null })
    }, 3000)
  }

  render() {
    const { users, loading, user, repos } = this.state;
    return (
      <Router>
        <div>
          <Navbar />
          <div className='container'>
            <Alert alert={this.state.alert} />
            <Switch >
              <Route exact path='/' render={props =>
                <Fragment>
                  <Search
                    searchUser={this.searchUser}
                    clearUser={this.clearUser}
                    showUser={this.state.users.length > 0 ? true : false}
                    setAlert={this.setAlert}
                  />
                  <Users loading={loading} users={users} />
                </Fragment>
              } />
              <Route exact path='/user/:login' render={props => (
                <User
                  {...props}
                  getUser={this.getUser}
                  user={user}
                  loading={loading}
                  getUserRepos={this.getUserRepos}
                  repos={repos} />
              )} />
              <Route exact path='/about' component={About} />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

export default App;
