import React, {useContext, useState} from 'react';
import { Switch, Route, useRouteMatch, Link} from 'react-router-dom';
import Dashboard from './dashboard';
import ExpenseList from './expense/expense-list';
import ExpenseReport from './report/expense-report';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import {GET_USER} from '../../graphql/queries';
import { useMutation, useQuery } from '@apollo/client';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { useStyles } from '../../styles/material-styles';
import Button from '@material-ui/core/Button';
import LoadingComponent from '../loading';
import Logout from '../authentication/logout';

export const MonthYearContext = React.createContext();

const HomeComponent = () => {

    const { path, url } = useRouteMatch();
    const [error, setError] = useState('');
    
    let currentDate = new Date();
    const [monthYear, setMonthYear] = useState({
        // 'getmonth()' returns 0-11, we want 1-12
        month:currentDate.getMonth() + 1,
        year:currentDate.getFullYear()
    });

    const classes = useStyles();

    const onErrorOccur = ({graphQLErrors, networkError}) => {
        if(networkError) 
        setError("network error occurred");

        if(graphQLErrors.length)
        setError(graphQLErrors[0].message);
    }

    const { loading } = useQuery(GET_USER, 
        { 
            variables: { limit:10, offset: 0, month: monthYear.month, year: monthYear.year },
            onError: onErrorOccur,
        });

    if(loading) return <LoadingComponent/>

    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <Button color="inherit">
                        <span className={classes.nav_item}>Expense Manager</span>
                    </Button>

                    <Button color="inherit">
                        <Link to={url} className={classes.nav_item}>Dashboard</Link>
                    </Button>

                    <Button color="inherit">
                        <Link to={`${url}/expenses`} className={classes.nav_item}>Expenses</Link>
                    </Button>

                    <Button color="inherit">
                        <Link to={`${url}/report`} className={classes.nav_item}>Report</Link>
                    </Button>
                    
                    <Logout/>
                </Toolbar>
            </AppBar>
            <Box className={classes.box_margin}>
            {
                !error ? (
                    <MonthYearContext.Provider value={monthYear}>
                        <Switch>    
                            <Route exact path={path} render={ props => <Dashboard {...props} /> } />
                            <Route exact path={`${path}/expenses`} render={ props => <ExpenseList {...props} /> } />
                            <Route exact path={`${path}/report`} render={ props => <ExpenseReport {...props} /> } />
                        </Switch>
                    </MonthYearContext.Provider>
                ):
                (
                    <Typography variant="body1" className={classes.error_text}>{error}</Typography>
                )
            }
            </Box>
        </Box>
    )
    
}

export default HomeComponent;