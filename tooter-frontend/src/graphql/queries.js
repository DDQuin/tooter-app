import { gql } from '@apollo/client';
import {TOOT_DETAILS} from "./fragments";
import {TOOT_COMMENT_DETAILS} from "./fragments";

export const GET_ALL_TOOTS = gql`
    query {
      allToots {
        ...TootDetails
      }
    }
    ${TOOT_DETAILS}   
`

export const GET_TOOT = gql`
 query GetToot($tootId: ID!) {
  getToot(tootId: $tootId) {
    ...TootAllDetails
  }
}
    ${TOOT_COMMENT_DETAILS}   
`

export const GET_USER = gql`
   query GetUser($userId: ID!) {
      getUser(userId: $userId) {
        username
        avatar
        name
        description
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
        followedBy {
            id
            username
            name
            avatar
            description
         }
          following {
            username
            name
            avatar
            id
            description
        }
        likes {
            toot {
             ...TootDetails
            }
        }
        toots {
            ...TootDetails
        }
  }
}
    ${TOOT_DETAILS}   
`