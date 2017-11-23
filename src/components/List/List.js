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
    // console.log(list[0].urls.bbs_url.split("").slice(21,29).join(""))
    const bbs_id = list.urls.bbs_url === undefined ? '' : list.urls.bbs_url.split("").slice(21,29).join("")

    return (
      <div className="list">
        <Link to={`/t/${bbs_id}`} className="wrap">
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
