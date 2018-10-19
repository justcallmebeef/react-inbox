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
    let firstData = await result.json()
    let data = firstData.map(item => {
      item.selected = false
      return item
    })
    this.setState({
      messages: [...data,]
    })
    console.log(data)
  }

  markStarred = async (event) => {
    var patch = {
      messageIds: [event.target.id],
      command: 'star',
      star: true,
    }

    console.log(patch)

    const response = await fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      body: JSON.stringify(patch),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    const posted = await response.json()
    this.setState({
      messages: posted
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
    
  // starClick = () => {
  //   if(this.state.starMessage === true) {
  //     this.setState({
  //       starMessage: false
  //     })
  //   } else {
  //     this.setState({
  //       starMessage: true 
  //     })
  //   }
  // }


  render() {
    return (
      <div className="bodyInbox">
      <Toolbar toggleMessage={this.toggleMessage} composeMessage={this.state.composeMessage}/>
      <Compose composeMessage={this.state.composeMessage}/>
      <Message messages={this.state.messages} starMessage={this.state.starMessage} markStarred={this.markStarred}/> 
      </div>
    );
  }
}

export default App;
