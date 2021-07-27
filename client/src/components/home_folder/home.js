import React from 'react';
import { Switch, Route, useRouteMatch, Link} from 'react-router-dom';
import { DataStoreProvider } from '../context/data-store-context';
import Dashboard from './dashboard';
import ExpenseList from './expense-list';
import ExpenseReport from './expense-report';
import Box from '@material-ui/core/Box';

const HomeComponent = () => {

    let { path, url } = useRouteMatch();

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
            </ul>
        
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