import React from 'react';
import UserActions from "../../../ReduxStore/User/Actions";
import { connect } from "react-redux";

import './Content.scss';

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.scrollHelper = null;
  }

  componentDidMount() {
    this.scrollHelper.scrollTop = this.scrollHelper.scrollHeight;
  }

  componentDidUpdate() {
    //console.log(this.scrollHelper.scrollHeight, this.scrollHelper.scrollTop);
    const closeToBottom = this.scrollHelper.scrollHeight - this.scrollHelper.scrollTop < 600;
    if (this.props.user.friendLastMessageAction[this.props.toUser.id] === 'append' && closeToBottom)
      this.scrollHelper.scrollTop = this.scrollHelper.scrollHeight;
    else if (this.props.user.friendLastMessageAction[this.props.toUser.id] === 'insert')
      this.scrollHelper.scrollTop = 200;
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return this.props.user.friendMessage[this.props.toUser.id].length
      !== nextProps.user.friendMessage[this.props.toUser.id].length;
  }

  handleScroll(e) {
    const messages = this.props.user.friendMessage[this.props.toUser.id];
    const isLoading = this.props.user.friendMessageLoading[this.props.toUser.id];

    if(!isLoading && messages.length > 0 && !messages[0].EOC && e.target.scrollTop === 0) {
      this.props.getFriendMessage(this.props.toUser.id, 20, messages.length, false);
    }
  }

  render() {
    const messages = this.props.user.friendMessage[this.props.toUser.id];

    return (
      <div className='content-container' onScroll={this.handleScroll.bind(this)} ref={ref => this.scrollHelper=ref}>
        <div className='padder' />
        {messages ? messages.map((message) => {

          if (message.EOC) {
            return (
              <div className='message-container' key='eoc'>
                <div className='eoc-message'>
                  no more messages
                </div>
              </div>
            )
          }

          return (
            <div className='message-container' key={message.id}>
              <div className={message.toUserId === this.props.toUser.id ? 'right-message' : 'left-message'}>
                {message.content}
              </div>
            </div>
          )
        }) : null}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user.toJS(),
});

const mapDispatchToProps = (dispatch) => ({
  getFriendMessage: (friendId, limit, skip, refresh) => dispatch(UserActions.getFriendMessage(friendId, limit, skip, refresh))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Content);