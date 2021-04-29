import React from 'react';
import {checkSession} from "../login/loginFunctions";
import {Profile} from './profil';
import {Login} from "../login/login";

export class Profilauth extends React.Component {
  constructor(props: any) {
    super(props);

    this.state = {
      isAuthenticated: false,
    };
  }

  async componentDidMount() {

    const checkForAuthentication = await checkSession();

    if (checkForAuthentication) {
      this.setState({ isAuthenticated: true });
    }
  }

  render() {
    // @ts-ignore
    const {isAuthenticated} = this.state
    return (
      isAuthenticated ?
        <Profile/> :
        <Login/>
    )
  }
}