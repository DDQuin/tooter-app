import { gql } from '@apollo/client';
import {TOOT_DETAILS} from "./fragments";

export const GET_ALL_TOOTS = gql`
    query {
      allToots {
        ...TootDetails
      }
    }
    ${TOOT_DETAILS}   
`

export const GET_USER = gql`
   query GetUser($userId: ID!) {
      getUser(userId: $userId) {
        username
        avatar
        name
        description
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