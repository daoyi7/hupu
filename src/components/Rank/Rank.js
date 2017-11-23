import React, {Component} from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import './rank.less'

export default class Rank extends Component {

  state = {
    rank_data: []
  }

  componentDidMount() {
    fetch('/rank')
      .then(res => res.json())
      .then((json) => {
        this.setState({
          rank_data: json
        })
      })
  }

  render() {
    const rank_data = this.state.rank_data
    console.log(rank_data);

    return (
      <div className="rank">
        <Header />
        <div className="area east">
          <table>
            <tbody>
              <tr className="rank_header">
                <th className="teamname">东部排名</th>
                <th>胜-负</th>
                <th>胜率</th>
                <th>胜场差</th>
                <th>教练</th>
              </tr>
              {
                rank_data.slice(0, 15).map(
                  (rank,idx) =>
                  <tr key={idx}>
                    <td className="teamname">{rank.team}</td>
                    <td className="win_lose">{rank.win} - {rank.lose}</td>
                    <td className="win_rate">{rank.win_rate}%</td>
                    <td className="field_difference">{rank.field_difference}</td>
                    <td className="coach">{rank.coach}</td>
                  </tr>
                )
              }
              <tr className="rank_header">
                <th className="teamname">西部排名</th>
                <th>胜-负</th>
                <th>胜率</th>
                <th>胜场差</th>
                <th>教练</th>
              </tr>
              {
                rank_data.slice(15).map(
                  (rank,idx) =>
                  <tr key={idx}>
                    <td className="teamname">{rank.team}</td>
                    <td className="win_lose">{rank.win} - {rank.lose}</td>
                    <td className="win_rate">{rank.win_rate}</td>
                    <td className="field_difference">{rank.field_difference}</td>
                    <td className="coach">{rank.coach}</td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
        <Footer />
      </div>
    )
  }
}
