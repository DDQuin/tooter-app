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

export const SET_DESC = gql`
    mutation SetDescription($description: String!) {
  setDescription(description: $description) {
    description
  }
}    
`

export const SET_AVATAR = gql`
    mutation SetAvatar($url: String!) {
      setAvatar(url: $url) {
        username
      }
    }    
`

export const LIKE_TOOT = gql`
    mutation LikeToot($tootId: ID!) {
        likeToot(tootId: $tootId)
    }
`

export const FOLLOW_USER = gql`
    mutation FollowUser($id: ID!) {
  followUser(id: $id) {
    username
  }
}
`