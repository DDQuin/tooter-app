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

export const TOOT_COMMENT_DETAILS = gql`
  fragment TootAllDetails on Toot {
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
      createdAt
      user {
        username
        id
        avatar
        name
      }
      toot {
        user {
          username
        }
        id
      }
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