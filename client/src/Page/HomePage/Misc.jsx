import React from 'react';
import { connect } from "react-redux";
import List, { ListItem } from '@material/react-list';

import './Misc.scss';

import * as UserService from '../../ApiService/UserService';

class Misc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	index: 0
    };
  }

  handleSelect(index) {
  	this.setState({ index });
  }

  render() {

  	console.log(this.state);

  	return (
  		<div>
			<List singleSelection selectedIndex={this.state.index} handleSelect={(index) => this.handleSelect(index)}>
				<ListItem className='list-item'>
					<i className='material-icons'>people</i>
				</ListItem>
				<ListItem className='list-item'>
					<i className='material-icons'>add</i>
				</ListItem>
				<ListItem className='list-item'>
					<i className='material-icons'>person_pin</i>
				</ListItem>
				<ListItem className='list-item'>
					<i className='material-icons'>settings_applications</i>
				</ListItem>
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
)(Misc);