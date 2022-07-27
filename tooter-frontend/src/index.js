import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css";

import {ApolloProvider} from "@apollo/client";
import {
    ApolloClient,
    HttpLink,
    split,
    InMemoryCache,
} from "@apollo/client";

import { setContext } from "@apollo/client/link/context";

import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
import axios from "axios";

axios
    .get('/api/test/test')
    .then(response => {
        let port = response.data.port

        const authLink = setContext((_, { headers }) => {
            const token = localStorage.getItem("phonenumbers-user-token");
            return {
                headers: {
                    ...headers,
                    authorization: token ? `bearer ${token}` : null,
                },
            };
        });

        const httpLink = new HttpLink({ uri: `https://tooter-app.herokuapp.com/ ` });

        const wsLink = new WebSocketLink({
            uri: `https://tooter-app.herokuapp.com/graphql`,
            options: {
                reconnect: true,
            },
        });

        const splitLink = split(
            ({ query }) => {
                const definition = getMainDefinition(query);
                return (
                    definition.kind === "OperationDefinition" &&
                    definition.operation === "subscription"
                );
            },
            wsLink,
            authLink.concat(httpLink)
        );

        const client = new ApolloClient({
            cache: new InMemoryCache(),
            link: splitLink,
        });


        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(
            <ApolloProvider client={client}>
                <App />
            </ApolloProvider>,
        );
    })










