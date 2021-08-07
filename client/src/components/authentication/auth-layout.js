import React, {useContext, useState} from 'react';
import { Switch, Route, useRouteMatch, Link} from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import Login from './login';
import Register from './register';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { useStyles } from '../../styles/material-styles';
import Button from '@material-ui/core/Button';

const AuthLayout = () => {

    let { path, url } = useRouteMatch();
    const classes = useStyles();

    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <Button color="inherit">
                        <span className={classes.nav_item}>Expense Manager</span>
                    </Button>
                    
                    <Button color="inherit">
                        <Link to={url} className={classes.nav_item}>Login</Link>
                    </Button>

                    <Button color="inherit">
                        <Link to={`${url}/register`} className={classes.nav_item}>Register</Link>
                    </Button>
                </Toolbar>
            </AppBar>

            <Switch>    
                <Route exact path={path} render={ props => <Login {...props} /> } />
                <Route exact path={`${path}/register`} render={ props => <Register {...props} /> } />
            </Switch>
        </Box>
    )
    
}

export default AuthLayout;