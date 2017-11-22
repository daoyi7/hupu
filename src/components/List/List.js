import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './list.less'

export default class List extends Component {
  render() {
    const list = this.props.list_data

    return (
      <div className="list">
        <div className="wrap">
          <Link to={`/t/${list.index}`}></Link>
          <h2 className="title">{list.title}</h2>
        </div>
      </div>
    )
  }
}
