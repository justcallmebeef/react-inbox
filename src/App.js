import React, { Component } from 'react';
import Toolbar from './components/Toolbar';
import Message from './components/Message';
import Compose from './components/Compose';
import './App.css';

class App extends Component {
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
