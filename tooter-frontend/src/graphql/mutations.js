import { gql } from '@apollo/client';

export const SIGN_IN = gql`
mutation signIn ($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

export const CREATE_USER = gql`
mutation CreateUser($username: String!, $password: String!, $name: String!) {
  createUser(username: $username, password: $password, name: $name) {
    username
  }
}
`