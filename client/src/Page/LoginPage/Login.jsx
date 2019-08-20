import React from 'react';
import { Grid, Row, Cell } from '@material/react-layout-grid';
import Button from '@material/react-button';
import Card, {
  CardActions,
  CardActionButtons,
} from "@material/react-card";
import TabBar from '@material/react-tab-bar';
import Tab from '@material/react-tab';
import TextField, { Input } from '@material/react-text-field';

import './LoginStyle.scss';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
        };
    }

    componentDidMount() {
        if (this.props.match.params.verificationCode) {
            this.setState({ vCode: this.props.match.params.verificationCode, activeIndex: 1 });
        }
    }

    isButtonDisabled(index) {
        const { email, password, confirmedPassword } = this.state;
        switch (index) {
            case 0:
                return !(email && password);
            case 1:
                return this.state.vCode ? !(password && confirmedPassword && password === confirmedPassword) : !email;
            default:
                break;
        }
    }

    handleActiveIndexUpdate(index) {
        if (!this.state.vCode)
            this.setState({ activeIndex: index });
    }

    handleButtonClick(index) {
        const { email } = this.state;
    }

    renderInputForm(index) {
        const { email, password, confirmedPassword } = this.state;
        switch (index) {
            case 0:
                return (
                    <div className='inputForm'>
                        <div>
                            <TextField label='email' className='textField'>
                                <Input
                                    value={email}
                                    onChange={(e) => this.setState({ email: e.currentTarget.value })}
                                    className='input'
                                />
                            </TextField>
                        </div>
                        <div>
                            <TextField label='password' className='textField'>
                                <Input
                                    value={password}
                                    type='password'
                                    onChange={(e) => this.setState({ password: e.currentTarget.value })}
                                    className='input'
                                />
                            </TextField>
                        </div>
                    </div>
                );
            case 1:
                return (
                this.state.vCode ?
                    <div className='inputForm'>
                        <div>
                            <TextField label='password' className='textField'>
                                <Input
                                    value={password}
                                    onChange={(e) => this.setState({ password: e.currentTarget.value })}
                                    className='input'
                                />
                            </TextField>
                        </div>
                        <div>
                            <TextField label='confirm password' className='textField'>
                                <Input
                                    value={confirmedPassword}
                                    type='password'
                                    onChange={(e) => this.setState({ confirmedPassword: e.currentTarget.value })}
                                    className='input'
                                />
                            </TextField>
                        </div>
                    </div>
                    :
                    <div className='inputForm'>
                        <div>
                            <TextField label='email' className='textField'>
                                <Input
                                    value={email}
                                    onChange={(e) => this.setState({email: e.currentTarget.value})}
                                    className='input'
                                />
                            </TextField>
                        </div>
                    </div>
                );
            default:
                break;
        }
    }

    render() {
        const { activeIndex } = this.state;
        console.log(this.isButtonDisabled(activeIndex));
        return (
            <Grid>
                <Row>
                    <Cell columns={3} />
                    <Cell columns={6}>
                        <Card className='loginContainer'>
                            <div className='logoContainer'>GMS</div>
                            <TabBar
                                className='tabBar'
                                activeIndex={activeIndex} 
                                handleActiveIndexUpdate={(index) => this.handleActiveIndexUpdate(index)}
                            >
                                <Tab
                                    focusOnActivate={false}
                                    className='tab'
                                >
                                    <span className='tabText'>Sign In</span>
                                </Tab>
                                <Tab
                                    focusOnActivate={false}
                                    className='tab'
                                >
                                    <span className='tabText'>Sign Up</span>
                                </Tab>
                            </TabBar>
                            {this.renderInputForm(activeIndex)}
                            <Button
                                className='button'
                                onClick={() => this.handleButtonClick(activeIndex)}
                                disabled={this.isButtonDisabled(activeIndex)}
                            >
                                {activeIndex === 0 ? 'Sign in' : (this.state.vCode ? 'Submit' : 'Sign up')}
                            </Button>
                        </Card>
                    </Cell>
                </Row>
            </Grid>
        );
    }
}

export default Login;
