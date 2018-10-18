import React, { Component } from 'react';
import Toolbar from './components/Toolbar';
import Message from './components/Message';
import Compose from './components/Compose';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      messages: [],
      composeMessage: true,
      starMessage: true, 
    }
  }

  async componentDidMount() {
    let result = await fetch("http://localhost:8082/api/messages")
    let data = await result.json()
    console.log(data)
    this.setState({
      messages: data,
    })
  }

  toggleMessage = () => {
    if (this.state.composeMessage === true) {
      this.setState({
        composeMessage: false
      })
    } else {
        this.setState({
          composeMessage: true
        })
      }
    }
    
  starClick = () => {
    if(this.state.starMessage === true) {
      this.setState({
        starMessage: false
      })
    } else {
      this.setState({
        starMessage: true 
      })
    }
  }


  render() {
    return (
      <div className="bodyInbox">
      <Toolbar toggleMessage={this.toggleMessage} composeMessage={this.state.composeMessage}/>
      <Compose composeMessage={this.state.composeMessage}/>
      <Message messages={this.state.messages} starMessage={this.state.starMessage} starClick={this.starClick}/> 
      </div>
    );
  }
}

export default App;
