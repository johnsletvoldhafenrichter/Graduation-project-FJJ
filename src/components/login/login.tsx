import React from 'react';
import {requestSessionToken} from './loginFunctions'
import {Button, Input, DossierLogo, H1, FormLabel} from "@dossier/mithra-ui";
import '../../css/login.css';

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
        return (
            <div className={'loginContainer'}>
                <H1 className={'loginTitle'}>
                    Velkommen til brukerportalen
                </H1>

                {/* Inputs and login button */}
                <div className={'formDivContainer'}>
                    <form className={'loginForm'} onSubmit={this.handleSubmit.bind(this)}>

                        <Input
                            className={'loginFormElement'}
                            id="userName"
                            placeholder="Brukernavn"
                            onChange={(event) => {
                                this.handleChange('userName', event)
                            }}
                        />
                        <Input
                            className={'loginFormElement'}
                            id="password"
                            placeholder="Passord"
                            type='password'
                            onChange={(event) => {
                                this.handleChange('password', event)
                            }}
                        />
                        <Button
                          className={'loginFormElement loginButton'}
                          variant="primary" type="submit">
                            Logg inn
                        </Button>

                        {loginError && <h5 className={'loginErrorMessage'}>
                            Feil brukernavn eller passord
                        </h5>}
                    </form>
                </div>
                {/* END Inputs and login button */}


                <DossierLogo className={'dossierLogo'}
                             variant="color"
                />

            </div>
        );
    }
}