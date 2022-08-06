import { useMutation } from '@apollo/client';

import {GET_ALL_TOOTS, GET_TOOT, GET_USER, ME} from "../graphql/queries";
import {ADD_TOOT} from "../graphql/mutations";

const useCreateToot = () => {

    const [mutate, result] = useMutation(ADD_TOOT, {
        refetchQueries: [
            {query: ME}, {query: GET_TOOT}, {query: GET_ALL_TOOTS}, "AllToots", {query: GET_USER} // DocumentNode object parsed with gql
        ],
    });

    const addToot = async (content) => {
        const vars = {
            content: content
        };
        // call the mutate function here with the right arguments
        const result = await mutate({ variables: vars });
        return result
    };

    return [addToot, result];
};

export default useCreateToot;