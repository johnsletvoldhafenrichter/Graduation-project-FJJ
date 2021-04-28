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
      error: null,
      isLoggingIn: false
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

  handleSubmit(e: any) {
    e.preventDefault();
    const {
      userName,
      password
      // @ts-ignore
    } = this.state.loginInfo;
    requestSessionToken(userName, password)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <Input
            id="userName"
            placeholder="Enter username..."
            onChange={() => {
              this.handleChange('userName', event)
            }}
          />
          <Input
            id="password"
            placeholder="Enter password..."
            onChange={() => {
              this.handleChange('password', event)
            }}
          />
          <Button variant="primary" type="submit">
            Logg inn
          </Button>
        </form>
      </div>
    );
  }
}