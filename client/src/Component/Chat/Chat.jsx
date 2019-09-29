import React from 'react';
import { connect } from "react-redux";

import EditPanel from './EditPanel/EditPanel';

import './Chat.scss';

class Chat extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.toUser) {
      return null;
    }
    else {
      return (
        <div className='chat-container'>
          <div className='chat-header'>{this.props.toUser.nickname}</div>
          <div className='chat-content'></div>
          <div className='chat-edit-panel'>
            <EditPanel toUser={this.props.toUser} />
          </div>
        </div>
      );
    }
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
)(Chat);