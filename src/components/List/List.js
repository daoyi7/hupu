import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './list.less'

export default class List extends Component {
  render() {
    const list = this.props.list_data

    return (
      <div className="list">
        <Link to={`/t/${list.id}`} className="wrap">
          <h2 className="title">{list.title}</h2>
          <p>
            <span className="up_time">{list.upTime}</span>
            <span className="source">{list.via}</span>
          </p>
        </Link>
      </div>
    )
  }
}
