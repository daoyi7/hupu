import React, {Component} from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

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
    return (
      <div>
        <Header />
        Here is Home
        <Footer />
      </div>
    )
  }
}
