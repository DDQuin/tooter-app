import { useMutation } from '@apollo/client';

import { SIGN_IN } from '../graphql/mutations';
import { useApolloClient } from '@apollo/client/react';

const useSignIn = () => {
    const apolloClient = useApolloClient();

    const [mutate, result] = useMutation(SIGN_IN);

    const signIn = async ({ username, password }) => {
        const vars = {
            username,
            password,
        };
        console.log(vars)
        // call the mutate function here with the right arguments
        const result = await mutate({ variables: vars });
        const token = result.data.login.value
        localStorage.setItem('toot-token', token)
        await apolloClient.resetStore();
        return result
    };

    return [signIn, result];
};

export default useSignIn;