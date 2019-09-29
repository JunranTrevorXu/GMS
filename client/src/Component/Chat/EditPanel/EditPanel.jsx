import React from 'react';
import { connect } from "react-redux";
import TextField, { Input } from "@material/react-text-field";
import Button from '@material/react-button';

import socket from '../../../ApiService/WebSocket';

import './EditPanel.scss';

class EditPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    }
  }

  handleTextChange(value) {
    this.setState({message: value});
    socket.emit('typing', { fromUserId: this.props.user.id, toUserId: this.props.toUser.id });
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      if (e.ctrlKey) {
        const { message } = this.state;
        this.setState({ message: message + '\n' });
      }
      else {
        this.send();
      }
    }
  }

  send() {
    let { message } = this.state;
    message = message.replace(/\n$/, "");
    this.setState({ message: '' });

    if (message.length > 0)
      socket.emit('message', { fromUserId: this.props.user.id, toUserId: this.props.toUser.id, message });
  }

  render() {
    return (
      <div className='edit-panel-container'>
        <TextField className='text-field' textarea  onKeyUp={this.handleKeyPress.bind(this)}>
          <Input
            value={this.state.message}
            onChange={(e) => this.handleTextChange(e.currentTarget.value)}
            className='input'
          />
        </TextField>
        <Button className='button' onClick={() => this.send()}>
          Send
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.toJS(),
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPanel);