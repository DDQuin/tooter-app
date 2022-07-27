import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css";

import {ApolloProvider} from "@apollo/client";
import {
    ApolloClient,
    HttpLink,
    InMemoryCache,
} from "@apollo/client";

import { setContext } from "@apollo/client/link/context";

import axios from "axios";

axios
    .get('/api/test/test')
    .then(response => {
        let port = response.data.port

        const authLink = setContext((_, { headers }) => {
            const token = localStorage.getItem('phonenumbers-user-token')
            return {
                headers: {
                    ...headers,
                    authorization: token ? `bearer ${token}` : null,
                }
            }
        })

        const httpLink = new HttpLink({ uri: `http://localhost:${port}` })

        const client = new ApolloClient({
            cache: new InMemoryCache(),
            link: authLink.concat(httpLink)
        })

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(
            <ApolloProvider client={client}>
                <App />
            </ApolloProvider>,
        );
    })










