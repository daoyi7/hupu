import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './list.less'

export default class List extends Component {


  info() {
    let info = this.props.list_data.info.split("")

    info.splice(23, 0, '...')

    return info.slice(0, 24).join("")
  }

  render() {
    const list = this.props.list_data

    return (
      <div className="list">
        <Link to={`/t/${list.id}`} className="wrap">
          <div className="item">
            <div className="thumb">
              <img src={list.thumb} alt="" />
            </div>
            <div className="content">
              <h2 className="title">{list.title}</h2>
              <p className="info">{this.info()}</p>
              <p className="time_source">
                <span className="up_time">{list.upTime}</span>
              </p>
            </div>
          </div>
        </Link>
      </div>
    )
  }
}
