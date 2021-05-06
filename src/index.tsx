import React from 'react';
import ReactDOM from 'react-dom';
import {config} from 'dotenv';
import './css/index.css';
import App from './App';
import "@dossier/mithra-ui/dist/ds.css"
import {MithraProvider} from "@dossier/mithra-ui";

config();

ReactDOM.render(
    <React.StrictMode>
        <MithraProvider>
                <App/>
        </MithraProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
