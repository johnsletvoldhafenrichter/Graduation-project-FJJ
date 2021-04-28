import React from 'react';
import './css/App.css';
import "@dossier/mithra-ui/dist/ds.css"
import Main from './components/main';
import {Login} from "./components/login/login";

class App extends React.Component {
    constructor(props: any) {
        super(props);

        this.state = {
            isAuthenticated: false,
            isLoading: false,
        };
    }

    render() {      
        // @ts-ignore
        const {isAuthenticated} = this.state;
        return (
            isAuthenticated ?
            <Main/> :
            <Login/>
        )
    }
}

export default App;
