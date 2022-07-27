import { gql } from '@apollo/client';
export const TOOT_DETAILS = gql`
  fragment TootDetails on Toot {
    content
    id
    createdAt
    user {
      username  
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