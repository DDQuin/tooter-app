import { useMutation } from '@apollo/client';

import {GET_ALL_TOOTS, GET_TOOT, GET_USER, ME} from "../graphql/queries";
import {ADD_COMMENT} from "../graphql/mutations";


const useAddComment = () => {

    const [mutate, result] = useMutation(ADD_COMMENT, {
        refetchQueries: [
            {query: ME}, {query: GET_TOOT}, {query: GET_ALL_TOOTS}, {query: GET_USER} // DocumentNode object parsed with gql
        ],
    });

    const createComment = async (content, id) => {
        const vars = {
            content: content,
            tootId: id,
        };
        // call the mutate function here with the right arguments
        const result = await mutate({ variables: vars });
        return result
    };

    return [createComment, result];
};

export default useAddComment;