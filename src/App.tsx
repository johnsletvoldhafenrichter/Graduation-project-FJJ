import React from 'react';
import './css/App.css';
import "@dossier/mithra-ui/dist/ds.css"
import Main from './components/main';

class App extends React.Component {
    constructor(props: any) {
        super(props);

        this.state = {
            isAuthenticated: true,
            isLoading: false,
        };
    }

    render() {      
        // @ts-ignore
        const {isAuthenticated} = this.state;
        return (
            isAuthenticated ?
            <Main/> :
            <div>Ikke Logget Inn!!!</div>
        )
    }
}

export default App;
