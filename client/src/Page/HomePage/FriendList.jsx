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
    return (
      <div>
        <List className='friend-list-container'>
          {this.props.user.friend.map((friend) => {
            return (
              <ListItem>
                <ListItemText primaryText={friend.nickname} />
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