import React from 'react';
import { connect } from "react-redux";
import {Cell, Grid, Row} from '@material/react-layout-grid';

import './Home.scss';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <Grid className='gridContainer'>
          <Row className='rowContainer'>
            <Cell columns={3} className='friendListContainer'></Cell>
            <Cell columns={8} className='chatContainer'></Cell>
            <Cell columns={1} className='settingsContainer'></Cell>
          </Row>
        </Grid>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user.toJS(),
});

export default connect(
  mapStateToProps,
  null
)(Home);