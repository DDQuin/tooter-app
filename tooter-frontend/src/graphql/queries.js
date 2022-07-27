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