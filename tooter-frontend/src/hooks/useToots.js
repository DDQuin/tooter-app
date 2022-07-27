
import { useQuery } from '@apollo/client';

import { GET_ALL_TOOTS } from '../graphql/queries';


const useToots = () => {
    const { data, loading, ...result } = useQuery(GET_ALL_TOOTS, {
        fetchPolicy: 'cache-and-network',
    });



    return {
        toots: data?.allToots,
        loading,
        ...result,
    };
};

export default useToots;