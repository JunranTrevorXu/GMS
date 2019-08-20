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

    handleActiveIndexUpdate(index) {
        // console.log(index);
        this.setState({ activeIndex: index });
    }

    renderInputForm(index) {
        const { email, password } = this.state;
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
                            <Button className='button'>{activeIndex === 0 ? 'Sign in' : 'Sign up'}</Button>
                        </Card>
                    </Cell>
                </Row>
            </Grid>
        );
    }
}

export default Login;
