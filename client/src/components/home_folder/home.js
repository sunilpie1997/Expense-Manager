import React, {useContext, useState} from 'react';
import { Switch, Route, useRouteMatch, Link} from 'react-router-dom';
import { DataStoreProvider } from '../context/data-store-context';
import Dashboard from './dashboard';
import ExpenseList from './expense/expense-list';
import ExpenseReport from './report/expense-report';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import {AuthUpdaterContext} from '../context/auth-context';
import {LOGOUT} from '../../graphql/mutations';
import { useMutation } from '@apollo/client';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { useStyles } from '../../styles/material-styles';
import Button from '@material-ui/core/Button';

const HomeComponent = () => {

    let { path, url } = useRouteMatch();
    const authDispatch = useContext(AuthUpdaterContext);
    const [error, setError] = useState('');

    const classes = useStyles();

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
            <AppBar position="static">
                <Toolbar>
                    <Button color="inherit">
                        <Link to={url} className={classes.nav_item}>Dashboard</Link>
                    </Button>

                    <Button color="inherit">
                        <Link to={`${url}/expenses`} className={classes.nav_item}>Expenses</Link>
                    </Button>

                    <Button color="inherit">
                        <Link to={`${url}/report`} className={classes.nav_item}>Report</Link>
                    </Button>
                    
                    <Button onClick={logoutUser} color="inherit" style={{marginLeft:'auto'}}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>

            { error ?  <Typography variant="body1" className={classes.error_text}>{error}</Typography> : ''}

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