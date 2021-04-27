import React from 'react';
import './css/App.css';
import "@dossier/mithra-ui/dist/ds.css"
import {Button} from "@dossier/mithra-ui";

function App() {
    return (
        <div className="App ds-typography-body">
            <Button variant="primary">
                test
            </Button>
            <div>Mithra is imported !!!!</div>
        </div>
    );
}

export default App;
