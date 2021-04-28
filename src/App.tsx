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

    const isAuthenticated = await checkSession();

    if (!isAuthenticated) {
      this.setState({ isAuthenticated: false });
    }

    this.setState({
      isAuthenticated: true,
    });
  }

  render() {
    // @ts-ignore
    const {isAuthenticated} = this.state
    return (
      // isLoading ? <div>loading...</div> :
      isAuthenticated ?
        <Main/> :
        <Login/>
    )
  }
}

export default App;
