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


  render() {
    return (
      <div className="bodyInbox">
      <Toolbar />
      <Message /> 
      </div>
    );
  }
}

export default App;
