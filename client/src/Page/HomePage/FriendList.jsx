import React from 'react';
import { connect } from "react-redux";
import * as UserService from '../../ApiService/UserService';

class FriendList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

  }
}

const mapStateToProps = (state) => ({
  user: state.user.toJS(),
});

export default connect(
  mapStateToProps,
  null
)(FriendList);