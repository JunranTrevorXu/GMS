import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Cell } from '@material/react-layout-grid';
import Button from '@material/react-button';
import Card from "@material/react-card";
import TabBar from '@material/react-tab-bar';
import Tab from '@material/react-tab';
import TextField, { Input } from '@material/react-text-field';
import UserAction from '../../ReduxStore/User/Actions';

import * as UserService from '../../ApiService/UserService';

import './LoginStyle.scss';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
            loading: false
        };
    }

    componentDidMount() {
        console.log(this.props.user);
        if (this.props.submit) {
            this.setState({ submit: true, activeIndex: 1 });
        }
    }

    isButtonDisabled(index) {
        const { email, password, confirmedPassword } = this.state;
        switch (index) {
            case 0:
                return !(email && password);
            case 1:
                return this.state.submit ? !(password && confirmedPassword && password === confirmedPassword) : !email;
            default:
                break;
        }
    }

    handleActiveIndexUpdate(index) {
        if (!this.state.submit)
            this.setState({ activeIndex: index });
    }

    async handleButtonClick(index) {
        if (this.state.submit) {
            const { nickname, password } = this.state;

            this.setState({loading: true});
            const response = await UserService.submit(nickname, password);
            this.setState({loading: false});

            if (response.data.OK) {
              // navigate to home
            }
            else {
              alert('error: ', response.data.code || response.data);
              console.log(response);
            }
        }
        else {
            const { email, password } = this.state;

            this.setState({loading: true});
            if (index === 0) {
                const response = await UserService.signin(email, password);
                this.setState({loading: false});

                if (response.data.OK) {
                  // navigate to home
                }
                else {
                  alert('error: incorrect email or password');
                  this.setState({password: ''});
                  console.log(response);
                }
            }
            else {
                const response = await UserService.signup(email);
                this.setState({loading: false});

                if (response.data.OK) {
                  this.setState({email: ''});
                  alert('email sent');
                }
                else {
                  alert('error: ', response.data.code || response.data);
                  console.log(response);
                }
            }
        }
    }

    renderInputForm(index) {
        const { email, nickname, password, confirmedPassword } = this.state;
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
                this.state.submit ?
                    <div className='inputForm'>
                        <div>
                            <TextField label='nickname' className='textField'>
                                <Input
                                    value={nickname}
                                    onChange={(e) => this.setState({ nickname: e.currentTarget.value })}
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
                                {activeIndex === 0 ? 'Sign in' : (this.state.submit ? 'Submit' : 'Sign up')}
                            </Button>
                        </Card>
                    </Cell>
                </Row>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user.toJS(),
});

export default connect(
  mapStateToProps,
  null
)(Login);
