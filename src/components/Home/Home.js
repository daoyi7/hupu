import React, {Component} from 'react'
import Header from '../Header/Header'
import List from '../List/List'
import Footer from '../Footer/Footer'
import './home.less'

export default class Home extends Component {

  state = {
    home_data: []
  }

  componentDidMount() {
    fetch('/voice')
      .then(res => res.json())
      .then((json) => {
        console.log(json)
        this.setState({
          home_data: json
        })
      })
  }

  render() {
    const home_data = this.state.home_data
    return (
      <div className="home">
        <Header />
        {home_data.map((data,idx) => <List key={idx} list_data={data} />)}
        <Footer />
      </div>
    )
  }
}
