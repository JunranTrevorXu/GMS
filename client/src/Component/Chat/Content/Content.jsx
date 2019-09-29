import React from 'react';
import UserActions from "../../../ReduxStore/User/Actions";
import { connect } from "react-redux";

import './Content.scss';

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.scrollHelper = null;
    this.latestMessage = null;
  }

  componentDidMount() {
    this.latestMessage.scrollIntoView({ behavior: "smooth" });
  }

  handleScroll(e) {
    console.log(e.target.scrollTop);
    const messages = this.props.user.friendMessage[this.props.toUser.id];
    if(messages.length > 0 && !messages[0].EOC && e.target.scrollTop === 0) {
      this.props.getFriendMessage(this.props.toUser.id, 20, messages.length, false);
      this.scrollHelper.scrollIntoView({ behavior: "smooth" });
    }
  }

  render() {
    const messages = this.props.user.friendMessage[this.props.toUser.id];

    console.log(messages);

    return (
      <div className='content-container' onScroll={this.handleScroll.bind(this)}>
        <div className='padder' />
        <div className='scrollHelper' ref={(el) => this.scrollHelper = el} />
        {messages.map((message) => {

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
            <div className='message-container' key={message.id}
               ref={(el) => {
                  this.latestMessage = el;
                }}
            >
              <div className={message.fromUserId === this.props.user.id ? 'right-message' : 'left-message'}>
                {message.content}
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user.toJS(),
});

const mapDispatchToProps = (dispatch) => ({
  getFriendMessage: (friendId, limit, skip, refresh) => dispatch(UserActions.getFriendMessage(friendId, limit, skip, refresh)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Content);