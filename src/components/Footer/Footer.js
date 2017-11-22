import React, {Component} from 'react'
import Home from '../Home/Home'
import './footer.less'

export default class Header extends Component {
  render() {
    return (
      <div className="footer">
        <div className="btn">
          <a href="/home">
            <i className="icon iconfont icon-home"></i>
            <p>新闻</p>
          </a>
        </div>
        <div className="btn">
          <a href="/home">
            <i className="icon iconfont icon-game"></i>
            <p>比赛</p>
          </a>
        </div>
        <div className="btn">
          <a href="/bbs">
            <i className="icon iconfont icon-bbs"></i>
            <p>社区</p>
          </a>
        </div>
        <div className="btn">
          <a href="/rank">
            <i className="icon iconfont icon-rank"></i>
            <p>排名</p>
          </a>
        </div>
        <div className="btn">
          <a href="/more">
            <i className="icon iconfont icon-more"></i>
            <p>更多</p>
          </a>
        </div>
      </div>
    )
  }
}
