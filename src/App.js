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
      bodyMessage: true, 
      selectButton: false,
      subject: "", 
      body: "",
    }
  }

  async componentDidMount() {
    let result = await fetch("http://localhost:8082/api/messages")
    let data = await result.json()
    this.setState({
      messages: [...data,]
    })
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

  postMessage = () => {
      var post = {
        body: this.state.body, 
        id: this.state.messages.length,
        labels: [],
        read: false, 
        selected: false,
        show: false, 
        starred: false, 
        subject: this.state.subject,
      }
      fetch('http://localhost:8082/api/messages', {
      method: 'POST',
      body: JSON.stringify(post),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then (response => response.json())
    .then ((response) => {
      this.setState({
      messages: [...this.state.messages, response], 
    })
  })
  }

  subject = (event) => {
    this.setState ({
      subject: event.target.value
    })
  }

  body = (event) => {
    this.setState ({
      body: event.target.value
    })
  }

  markStarred = (event) => {
    this.patch([event.target.id], 'star', 'starred')
  }

  markSelect = (event) => {
    this.patch([event.target.id], 'select', 'selected')
  }

  deleteMessage = (event) => {
    let selected = this.state.messages.filter(item => item.selected === true)
    selected.map(item => this.patch([item.id], 'delete'))
  }

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

  toggleBody = (event) => {
    this.patch(event, 'read', 'read', true)
  }

  toggleMessage = () => {
    this.setState({composeMessage: !(this.state.composeMessage)})
  }

  showBody = (event) => {
    this.patch(event, 'show', 'show', false)
  }

  bulkSelect = () => {
    let messages = this.state.messages 
    let selected = this.state.messages.filter(item => item.selected === true)
    let notSelected = this.state.messages.filter(item => item.selected === false)

    if (selected.length === messages.length) {
      selected.map(item => { this.patch([item.id], 'select', 'selected') })
    } else if (notSelected.length <= messages.length) {
      notSelected.map(item => { this.patch([item.id], 'select', 'selected') })
    }

    if (selected.length === messages.length) {
      this.setState({
        checkButton: true
      })
    } else if (notSelected.length <= messages.length) {
      this.setState({
        checkButton: false
      })
    }
  }

  // selectButton = () => {
  //   let messages = this.state.messages 
  //   let selected = this.state.messages.filter(item => item.selected === true)
  //   let notSelected = this.state.messages.filter(item => item.selected === false)

  //   if (selected.length === messages.length) {
  //     this.setState({
  //       checkButton: true
  //     })
  //   } else if (notSelected.length === messages.length) {
  //     this.setState({
  //       checkButton: false
  //     })
  //   }
  // }

  render() {
    return (
      <div className="bodyInbox">
      <Toolbar checkButton={this.state.checkButton} selectButton={this.selectButton} bulkSelect={this.bulkSelect} deleteMessage={this.deleteMessage} messages={this.state.messages} unreadMessages={this.unreadMessages} toggleMessage={this.toggleMessage} messageRead={this.messageRead} markAsRead={this.markAsRead} markAsUnread={this.markAsUnread} messageLabel={this.messageLabel} messageRemoveLabel={this.messageRemoveLabel} composeMessage={this.state.composeMessage}/>
      <Compose postMessage={this.postMessage} subject={this.subject} body={this.body} composeMessage={this.state.composeMessage}/>
      <Message bodyMessage={this.state.bodyMessage} showBody={this.showBody} toggleBody={this.toggleBody} messages={this.state.messages} markStarred={this.markStarred} markSelect={this.markSelect} messageRead={this.messageRead}/> 
      </div>
    );
  }
}

export default App;