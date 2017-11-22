import React, {Component} from 'react'
import './static/header.less'
import logo from './static/logo.png'

export default class Header extends Component {
  render() {
    return (
      <div className="header">
        <h2><img src={logo} alt="" /></h2>
      </div>
    )
  }
}
