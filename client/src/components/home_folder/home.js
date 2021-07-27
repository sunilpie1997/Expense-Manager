import React, {useContext, useState} from 'react';
import { Switch, Route, useRouteMatch, Link} from 'react-router-dom';
import { DataStoreProvider } from '../context/data-store-context';
import Dashboard from './dashboard';
import ExpenseList from './expense-list';
import ExpenseReport from './expense-report';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import {AuthUpdaterContext} from '../context/auth-context';
import {LOGOUT} from '../../graphql/mutations';
import { useMutation } from '@apollo/client';
import Typography from '@material-ui/core/Typography';


const HomeComponent = () => {

    let { path, url } = useRouteMatch();
    const authDispatch = useContext(AuthUpdaterContext);
    const [error, setError] = useState('');

    const onLogoutSuccess = () => {
        authDispatch('logout');
    }

    const onErrorOccur = ({graphQLErrors, networkError}) => {
        if(networkError) 
        setError("network error occurred");

        if(graphQLErrors.length)
        setError(graphQLErrors[0].message);
    }

    const [logoutUser, { loading:loading }] = useMutation(LOGOUT,{ 
        onError:onErrorOccur,
        onCompleted: onLogoutSuccess
    });

    return (
        <Box>
            <ul>
                <li>
                    <Link to={url}>Dashboard</Link>
                </li>
                <li>
                    <Link to={`${url}/expenses`}>ExpenseList</Link>
                </li>
                <li>
                    <Link to={`${url}/report`}>ExpenseReport</Link>
                </li>
                <li>
                    <Fab size="small" variant="extended" color="secondary" onClick={logoutUser}>Logout</Fab>
                </li>

            </ul>
        
            { error ?  <Typography variant="h5" color="secondary">{error}</Typography> : ''}

            <DataStoreProvider>
                <Switch>    
                    <Route exact path={path} render={ props => <Dashboard {...props} /> } />
                    <Route exact path={`${path}/expenses`} render={ props => <ExpenseList {...props} /> } />
                    <Route exact path={`${path}/report`} render={ props => <ExpenseReport {...props} /> } />
                </Switch>
            </DataStoreProvider>
        </Box>
    )
    
}

export default HomeComponent;