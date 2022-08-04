import { useMutation } from '@apollo/client';

import {GET_ALL_TOOTS, GET_TOOT, GET_USER, ME} from "../graphql/queries";
import {FOLLOW_USER} from "../graphql/mutations";

const useFollowUser = () => {

    const [mutate, result] = useMutation(FOLLOW_USER, {
        refetchQueries: [
            {query: ME}, {query: GET_TOOT}, {query: GET_ALL_TOOTS}, {query: GET_USER}, 'GetUser' // DocumentNode object parsed with gql
        ],
    });

    const followUser = async (id) => {
        const vars = {
            id: id
        };
        // call the mutate function here with the right arguments
        const result = await mutate({ variables: vars });
        return result
    };

    return [followUser, result];
};

export default useFollowUser;