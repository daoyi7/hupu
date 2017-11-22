import React, {Component} from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import Header from './Header/Header'
import Home from './Home/Home'

export default class App extends Component {

  componentDidMount() {
    fetch('/bxj')
      .then(res => res.json())
      .then((json) => {
        console.log(json)
      })
  }

  render() {
    return (
      <div className="hupu">
        <Header />
        <BrowserRouter>
          <Switch>
            <Route path = '/home' component = { Home }></Route>
            <Redirect from = "/" to = '/home' />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}
