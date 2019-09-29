import React from 'react';
import { connect } from "react-redux";
import List, { ListItem, ListItemText } from '@material/react-list';

import './FriendList.scss';

class FriendList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log(this.props.user.friendTyping);
    return (
      <div>
        <List className='friend-list-container'>
          {this.props.user.friend.map((friend) => {
            return (
              <ListItem key={friend.id} onClick={() => this.props.setToUser(friend)} className='list-item'>
                <ListItemText primaryText={friend.nickname} />
                {this.props.user.friendTyping[friend.id] ?
                  <i className='material-icons'>keyboard</i>
                : null}
              </ListItem>
            )
          })}
        </List>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.toJS(),
});

export default connect(
  mapStateToProps,
  null
)(FriendList);