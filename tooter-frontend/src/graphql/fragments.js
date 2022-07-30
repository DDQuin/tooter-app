import { gql } from '@apollo/client';
export const TOOT_DETAILS = gql`
  fragment TootDetails on Toot {
    content
    id
    createdAt
    user {
      username
      name
      avatar
      id
    }
    comments {
      content  
    }
    likes {
      user {
        username
      }  
    }
  }
`

export const USER_SIMPLE = gql`
    fragment UserSimpleDetails on User {
        username
        avatar
        name
        description
    }
`