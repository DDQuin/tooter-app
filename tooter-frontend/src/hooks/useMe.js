
import { useQuery } from '@apollo/client';

import {ME} from '../graphql/queries';


const useMe = () => {
    const { data, loading, ...result } = useQuery(ME, {
        fetchPolicy: 'cache-and-network'
    });



    return {
        me: data?.me,
        loading,
        ...result,
    };
};

export default useMe;