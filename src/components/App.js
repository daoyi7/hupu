import React, {Component} from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import Home from './Home/Home'
import Game from './Game/Game'
import BBS from './BBS/BBS'
import Rank from './Rank/Rank'
import More from './More/More'

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
        <BrowserRouter>
          <Switch>
            <Route exact path = '/home' component = { Home }></Route>
            <Route exact path = '/game' component = { Game }></Route>
            <Route exact path = '/bbs' component = { BBS }></Route>
            <Route exact path = '/rank' component = { Rank }></Route>
            <Route exact path = '/more' component = { More }></Route>
            <Redirect from = "/" to = '/home' />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}
