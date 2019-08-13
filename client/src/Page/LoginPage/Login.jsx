import React from 'react';
import { Grid, Row, Cell } from '@material/react-layout-grid';
import Button from '@material/react-button';

import './LoginStyle.scss';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            option: 'SignIn',
        };
    }

    render() {
        const { option } = this.state;
        return (
            <Grid>
                <Row>
                    <Cell columns={4} />
                    <Cell columns={4} className="logoContainer">
                        <div className="logo">
                            GMS
                        </div>
                    </Cell>
                </Row>
                <Row>
                    {/*
                        这里换成card + tab bar的组合
                    */}
                    <Cell columns={4} />
                    <Cell columns={2} className="buttonContainer">
                        <Button outlined className={option === 'SignIn' ? 'buttonSelected' : ''}>Sign in</Button>
                    </Cell>
                    <Cell columns={2} className="buttonContainer">
                        <Button className={option === 'SignUp' ? 'buttonSelected' : ''}>Sign up</Button>
                    </Cell>
                </Row>
            </Grid>
        );
    }
}

export default Login;
