import React, {Component} from 'react'
import Header from '../Header/Header'
import List from '../List/List'
import Footer from '../Footer/Footer'
import './home.less'
import loading_img from './loading.png'

export default class Home extends Component {

  state = {
    home_data: [],
    loading: true
  }

  componentDidMount() {
    fetch('/voice')
      .then(res => {
        if(res.ok) {
          res.json()
            .then((json) => {
              this.setState({
                home_data: json,
                loading: false
              })
            })
        } else {
          console.error('Network response was not ok.');
        }
      })
      .catch((err) => {
        console.error('There has been a problem with your fetch operation: ' + err.message);
      })
  }

  render() {
    const home_data = this.state.home_data
    const loading = this.state.loading

    if(loading) {
      return (
        <div className="loading">
          <img src={loading_img} alt="" />
        </div>
      )
    }

    return (
      <div className="home">
        <Header />
        {home_data.map((data,idx) => <List key={idx} list_data={data} />)}
        <Footer />
      </div>
    )
  }
}
