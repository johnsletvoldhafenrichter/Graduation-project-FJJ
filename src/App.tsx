import React from 'react';
import './css/App.css';
import "@dossier/mithra-ui/dist/ds.css"
import Main from './components/main';
import {Login} from "./components/login/login";
import {checkSession} from "./components/login/loginFunctions";

class App extends React.Component {
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
        // @ts-ignore
        <Main/> :
        <Login/>
    )
  }
}

export default App;
