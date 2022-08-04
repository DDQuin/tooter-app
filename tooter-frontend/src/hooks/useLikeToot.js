import { useMutation } from '@apollo/client';

import {GET_ALL_TOOTS, GET_TOOT, GET_USER, ME} from "../graphql/queries";
import {LIKE_TOOT} from "../graphql/mutations";

const useLikeToot = () => {

    const [mutate, result] = useMutation(LIKE_TOOT, {
        refetchQueries: [
            {query: ME}, {query: GET_TOOT}, {query: GET_ALL_TOOTS}, {query: GET_USER} // DocumentNode object parsed with gql
        ],
    });

    const likeToot = async (id) => {
        const vars = {
            tootId: id
        };
        // call the mutate function here with the right arguments
        const result = await mutate({ variables: vars });
        return result
    };

    return [likeToot, result];
};

export default useLikeToot;