
import { useQuery } from '@apollo/client';

import {GET_TOOT} from '../graphql/queries';


const useToot = (id) => {
    const variables = {tootId: id}
    const { data, loading, ...result } = useQuery(GET_TOOT, {
        fetchPolicy: 'cache-and-network',
        variables
    });



    return {
        toot: data?.getToot,
        loading,
        ...result,
    };
};

export default useToot;