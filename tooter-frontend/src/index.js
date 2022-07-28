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

import {setContext} from "@apollo/client/link/context";


const authLink = setContext((_, {headers}) => {
    const token = localStorage.getItem('toot-token')
    return {
        headers: {
            ...headers,
            authorization: token ? `bearer ${token}` : null,
        }
    }
})

// for deploy
// /const httpLink = new HttpLink({ uri: `https://tooter-app.herokuapp.com/` })
const httpLink = new HttpLink({uri: `http://localhost:4000`})

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink)
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>,
);










