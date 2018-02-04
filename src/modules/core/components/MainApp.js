import React, { PureComponent } from "react";
import injectSheet from "react-jss";
import { connect } from "react-redux";
import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:3001');

const styles = {};

class MainApp extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      messageBox: '',
    };

    socket.on('message output', messages => {
      if (messages.length) {
        this.setState({ 
          messages: [
            ...this.state.messages,
            ...messages
          ],
        });
      }
    });

    socket.on('messages cleared', () => this.setState({ messages: [] }));
  }

  handleChange = e => this.setState({ messageBox: e.target.value });

  clearMessages = () => socket.emit('clear messages');

  sendMessage = () => {
    if (this.state.messageBox) {
      socket.emit('message input', {
        name: 'Bob',
        message: this.state.messageBox,
      });
      this.setState({ messageBox: '' });
    }
  }

  handleInputKeyDown = e => {
    if (e.which === 13 && e.shiftKey == false) {
      socket.emit('message input', {name: 'Bob', message: this.state.messageBox});
      e.preventDefault();
    }
  }

  render() {
    return (
      <div>
        {this.state.messages.map(({ _id, name, message }) => {
          return (
            <p key={_id}><b>{name}:</b> {message}</p>
          );
        })}
        <input type="text" onChange={this.handleChange} placeholder="Message" value={this.state.messageBox} onKeyDown={this.handleInputKeyDown}/>
        <input type="button" onClick={this.sendMessage} value="Submit" />
        <input type="button" onClick={this.clearMessages} value="Clear" />
      </div>
    );
  }
}

export default injectSheet(styles)(MainApp);
