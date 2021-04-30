import React from 'react';
import {requestSessionToken} from './loginFunctions'
import {Button, Input} from "@dossier/mithra-ui";

export class Login extends React.Component {
    constructor(props: any) {
        super(props);

        this.state = {
            loginInfo: {
                userName: '',
                password: '',
            },
            loginError: '',
        }
    }

    handleChange(inputField: any, event: any) {
        this.setState({
            loginInfo: {
                // @ts-ignore
                ...this.state.loginInfo,
                [inputField]: event.target.value,
            }
        })
    }

    async handleSubmit(e: any) {
        e.preventDefault();
        const {
            userName,
            password
            // @ts-ignore
        } = this.state.loginInfo;


        const result = await requestSessionToken(
            userName,
            password
        )
        if (result.error) {
            this.setState({
                loginError: 'Something went wrong!'
            })
            return;
        }
        if (!result.token) {
            this.setState({
                loginError: 'Unauthorized!'
            })
            return;
        }
        localStorage.setItem('dossier_session_token', result.token);
        localStorage.setItem('session_user_id', result.id);
        window.location.reload();
    }

    render() {
        // @ts-ignore
        const {loginError} = this.state
        const containerStyle = {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            width: '100vw'
        }
        const formStyle = {
            flex: 1,
            margin: 'auto'
        }
        const elementStyle = {
            textAlign: 'center',
            margin: 'auto'
        }

        return (
            <div style={containerStyle}>
                <div style={formStyle}>
                    {/* @ts-ignore*/}
                    <form style={elementStyle} onSubmit={this.handleSubmit.bind(this)}>
                        <Input
                            id="userName"
                            placeholder="Enter username..."
                            onChange={(event) => {
                                this.handleChange('userName', event)
                            }}
                        />
                        <Input
                            id="password"
                            placeholder="Enter password..."
                            onChange={(event) => {
                                this.handleChange('password', event)
                            }}
                        />
                        <Button variant="primary" type="submit">
                            Logg inn
                        </Button>
                    </form>
                </div>
                {loginError && <h1>{loginError}!</h1>}
            </div>
        );
    }
}