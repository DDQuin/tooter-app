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