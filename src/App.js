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
      readMessage: true, 
    }
  }

  async componentDidMount() {
    let result = await fetch("http://localhost:8082/api/messages")
    let data = await result.json()
    this.setState({
      messages: [...data,]
    })
    console.log(data)
  }

  patch = async (id, command, attribute, value) => {
    var patch = {
      messageIds: [id],
      command: command,
      [attribute]: value,
    }

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

  markStarred = (event) => {
    this.patch([event.target.id], 'star', 'starred')
  }

  markSelect = (event) => {
    this.patch([event.target.id], 'select', 'selected')
  }

  // deleteMessage = (event) => {
  //   this.patch([event.target.id], 'delete', '')
  // }

  messageRead = (event) => {
    this.patch([event.target.id], 'read', 'read', true)
  }

  messageLabel = (event) => {
    let selected = this.state.messages.filter(item => item.selected === true)
    selected.map(item => this.patch([item.id], 'addLabel', 'label', event.target.value))
  }

  messageRemoveLabel = (event) => {
    let selected = this.state.messages.filter(item => item.selected === true)
    selected.map(item => this.patch([item.id], 'removeLabel', 'label', event.target.value))
  }

  // messageLabel = (event) => {
  //   this.state.messages.map(item => {
  //     if (item.selected === true) {
  //     return this.patch([item.id], 'addLabel', 'label', event.target.value)
  // }
  // })
  // }

  markAsRead = (event) => {
    event.preventDefault()
    let selected = this.state.messages.filter(item => item.selected === true)
    selected.map(item => this.patch(item.id, 'read', 'read', true))
  }

  markAsUnread = (event) => {
    event.preventDefault()
    let selected = this.state.messages.filter(item => item.selected === true)
    selected.map(item => this.patch(item.id, 'read', 'read', false))
  }

  toggleMessage = () => {
    this.setState({composeMessage: !(this.state.composeMessage)})
  }

  toggleBody = () => {
    if (this.state.readMessage === true) {
      this.setState({
        readMessage: false
      })
    } else {
        this.setState({
          readMessage: true
        })
      }
    }

  render() {
    return (
      <div className="bodyInbox">
      <Toolbar toggleMessage={this.toggleMessage} messageRead={this.messageRead} markAsRead={this.markAsRead} markAsUnread={this.markAsUnread} messageLabel={this.messageLabel} messageRemoveLabel={this.messageRemoveLabel} composeMessage={this.state.composeMessage}/>
      <Compose composeMessage={this.state.composeMessage}/>
      <Message messages={this.state.messages} markStarred={this.markStarred} markSelect={this.markSelect} messageRead={this.messageRead} toggleBody={this.toggleBody}/> 
      </div>
    );
  }
}

export default App;