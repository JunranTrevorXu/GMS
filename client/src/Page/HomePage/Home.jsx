import React from 'react';
import { connect } from "react-redux";
import {Cell, Grid, Row} from '@material/react-layout-grid';
import Misc from './Misc';
import FriendRequest from './FriendRequest';
import FriendList from "./FriendList";

import UserActions from '../../ReduxStore/User/Actions';
import * as UserService from '../../ApiService/UserService';
import wsocket from '../../ApiService/WebSocket';

import './Home.scss';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 'friendList'
    }
  }

  askPermission() {
    // use both promise and callback because which one will work depends on browser API version
    return new Promise(function(resolve, reject) {
      const permissionResult = Notification.requestPermission(function(result) {
        resolve(result);
      });

      if (permissionResult) {
        permissionResult.then(resolve, reject);
      }
    })
      .then(function(permissionResult) {
        if (permissionResult !== 'granted') {
          console.log('We weren\'t granted permission.');
        }
      });
  }

  async componentDidMount() {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      alert('Your browser sucks, use another one');
      return;
    }

    const subscribeOptions = {
      userVisibleOnly: true,
      applicationServerKey: 'BM6SiAnaGYckcmbztRXz5h2eC65gHcMZH-0NOrqEQ6OlAtJUDsRPX-nbeRhHANpZBzLuhHVPXVYNTRhRFB4-KYY',
    };

    try {
      await this.askPermission();
      // here we must use the process.env.PUBLIC_URL for some wired reasons...
      const registration = await navigator.serviceWorker.register(`${process.env.PUBLIC_URL}/custom-service-worker.js`);

      console.log(registration);
      await navigator.serviceWorker.ready;

      navigator.serviceWorker.addEventListener('message', (event) => {
        const msg = event.data.msg;
        if (msg === 'New friend request') {
          this.props.getFriendRequest();
        }
        else if (msg === 'Friend request accepted') {
          this.props.getFriend();
        }
      });

      let pushSubscription = await registration.pushManager.subscribe(subscribeOptions);
      console.log(JSON.stringify(pushSubscription));
      pushSubscription = JSON.parse(JSON.stringify(pushSubscription));

      const subscribeResult = await UserService.subscribe(pushSubscription.endpoint, pushSubscription.keys.p256dh, pushSubscription.keys.auth);
    } catch (e) {
      // if permission not granted
      console.log(e);
    }

    await UserService.online();

    this.props.getUserInfo();
    this.props.getFriend();
    this.props.getFriendRequest();
  }

  handleSelectTab(tab) {
    this.setState({ tab });
  }

  renderList() {
    switch(this.state.tab) {
      case "friendList":
        return <FriendList />;
      case "friendRequest":
        return <FriendRequest />;
      case "userProfile":
        break;
      case "settings":
        break;
      default:
        break;
    }
  }

  render() {
    if (this.props.user.id) {
      wsocket.emit("register", {userId: this.props.user.id});
    }

    return (
        <Grid className='gridContainer'>
          <Row className='rowContainer'>
            <Cell columns={1} className='settingsContainer'>
              <Misc
                tab={this.state.tab}
                selectTab={(tab) => this.handleSelectTab(tab)}
              />
            </Cell>
            <Cell columns={3} className='friendListContainer'>
              {this.renderList()}
            </Cell>
            <Cell columns={8} className='chatContainer'></Cell>
          </Row>
        </Grid>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user.toJS(),
});

const mapDispatchToProps = (dispatch) => ({
  getUserInfo: () => dispatch(UserActions.getUserInfo()),
  getFriend: () => dispatch(UserActions.getFriend()),
  getFriendRequest: () => dispatch(UserActions.getFriendRequest())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);