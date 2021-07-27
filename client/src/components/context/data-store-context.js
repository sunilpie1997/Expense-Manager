import React, {useState} from 'react';
import { GET_USER } from '../../graphql/queries';
import { useQuery } from '@apollo/client';
import LoadingComponent from '../loading';


export const DataStoreContext = React.createContext();

export const DataStoreProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [error, setError ] = useState('');

    const onErrorOccur = ({graphQLErrors, networkError}) => {
        if(networkError) 
        setError("network error occurred");

        if(graphQLErrors.length)
        setError(graphQLErrors[0].message);
    }

    const onSuccess = () => {
        console.log(data.getUser);
        const { getUser } = data;
        setUser(getUser);
    }

    const { loading, data } = useQuery(GET_USER, 
        { 
            variables: { limit:10, offset: 0, todayDate: 1627308284523 },
            onError: onErrorOccur,
            onCompleted: onSuccess 
        });

    if(loading) return <LoadingComponent/>

    if(error) return <h1>{error}</h1>
 
    return (
        <React.Fragment>
            {   user ? (
                            <DataStoreContext.Provider value={user}>
                                {children}
                            </DataStoreContext.Provider>
                        ):
                        (
                            null
                        )
    
            }
        </React.Fragment>
    );
}