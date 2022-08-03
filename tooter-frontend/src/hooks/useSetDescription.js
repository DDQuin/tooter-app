import { useMutation } from '@apollo/client';

import { SET_DESC } from '../graphql/mutations';
import {ME} from "../graphql/queries";

const useSetDescription = () => {

    const [mutate, result] = useMutation(SET_DESC, {
        refetchQueries: [
            {query: ME}, // DocumentNode object parsed with gql
        ],
    });

    const setDescription = async ({ description }) => {
        const vars = {
            description: description
        };
        // call the mutate function here with the right arguments
        const result = await mutate({ variables: vars });
        return result
    };

    return [setDescription, result];
};

export default useSetDescription;