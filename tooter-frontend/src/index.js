import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css";
import client from "./utils/apolloClient";
//import {ApolloProvider} from "@apollo/client";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

        <App />

);


