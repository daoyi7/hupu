import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import './static/footer.less'

export default class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <div className="btn">
          <NavLink to="/home">
            <i className="icon iconfont icon-home"></i>
            <p>新闻</p>
          </NavLink>
        </div>
        <div className="btn">
          <NavLink to="/game">
            <i className="icon iconfont icon-game"></i>
            <p>比赛</p>
          </NavLink>
        </div>
        <div className="btn">
          <NavLink to="/bbs">
            <i className="icon iconfont icon-bbs"></i>
            <p>社区</p>
          </NavLink>
        </div>
        <div className="btn">
          <NavLink to="/rank">
            <i className="icon iconfont icon-rank"></i>
            <p>排名</p>
          </NavLink>
        </div>
        <div className="btn">
          <NavLink to="/more">
            <i className="icon iconfont icon-more"></i>
            <p>更多</p>
          </NavLink>
        </div>
      </div>
    )
  }
}
