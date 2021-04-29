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
        }
        if (!result.token) {
            this.setState({
                loginError: 'Unauthorized!'
            })
            return;
        }
        localStorage.setItem('dossier_session_token', result.token);
        window.location.reload();
    }

    render() {
        // @ts-ignore
        const {loginError} = this.state
        return (
            <div>
                <form onSubmit={this.handleSubmit.bind(this)}>
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
                {loginError && <h1>{loginError}!</h1>}
            </div>
        );
    }
}