import { useMutation } from '@apollo/client';

import {SET_AVATAR} from '../graphql/mutations';
import {ME} from "../graphql/queries";

const useSetAvatar = () => {

    const [mutate, result] = useMutation(SET_AVATAR, {
        refetchQueries: [
            {query: ME}, // DocumentNode object parsed with gql
        ],
    });

    const setAvatar = async ({ avatar }) => {
        const vars = {
            url: avatar
        };
        // call the mutate function here with the right arguments
        const result = await mutate({ variables: vars });
        return result
    };

    return [setAvatar, result];
};

export default useSetAvatar;