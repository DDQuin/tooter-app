
import { useQuery } from '@apollo/client';

import {GET_USER} from '../graphql/queries';


const useUser = (id) => {
    const variables = {userId: id}
    const { data, loading, ...result } = useQuery(GET_USER, {
        fetchPolicy: 'cache-and-network',
        variables
    });



    return {
        user: data?.getUser,
        loading,
        ...result,
    };
};

export default useUser;