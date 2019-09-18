import React from 'react';
import { connect } from "react-redux";
import UserActions from "../../ReduxStore/User/Actions";
import List, { ListItem, ListItemText } from '@material/react-list';
import TextField, { Input } from '@material/react-text-field';
import Button from '@material/react-button';

import './FriendRequest.scss';

class FriendRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addFriendEmail: ''
    };
  }

  sendFriendRequest(toUserEmail) {
    this.setState({addFriendEmail: ''});
    this.props.sendFriendRequest(toUserEmail);
  }

  render() {
    return (
      <div className='friend-request-class'>
        <TextField label='Friend Email' className='add-friend-text-field'>
          <Input
            className='input'
            value={this.state.addFriendEmail}
            onChange={(e) => this.setState({ addFriendEmail: e.currentTarget.value })}
          />
        </TextField>
        <Button
          className='send-request-button'
          onClick={() => {this.sendFriendRequest(this.state.addFriendEmail)}}
        >
          Send Request
        </Button>
        <hr className='hr-line'/>
        <hr className='hr-line'/>
        <List className='friend-request-list-container'>
          {this.props.user.friendRequest.map((request) => {
            return (
              <ListItem activated={false} className='list-item'>
                <div className='list-item-text-container'>
                  <div className='list-item-text'>
                    <ListItemText primaryText={request.nickname}/>
                  </div>
                  <div className='list-item-text'>
                    <ListItemText primaryText={request.email}/>
                  </div>
                </div>
                <Button className='accept-button' onClick={() => this.props.acceptFriendRequest(request.id)}>Accept</Button>
              </ListItem>
            );
          })}
        </List>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user.toJS(),
});

const mapDispatchToProps = (dispatch) => ({
  sendFriendRequest: (toUserEmail) => dispatch(UserActions.sendFriendRequest(toUserEmail)),
  acceptFriendRequest: (fromUserId) => dispatch(UserActions.acceptFriendRequest(fromUserId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FriendRequest);