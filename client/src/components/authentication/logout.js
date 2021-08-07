import React, {useState, useContext} from 'react';
import {AuthUpdaterContext} from '../context/auth-context';
import {LOGOUT} from '../../graphql/mutations';
import { useMutation } from '@apollo/client';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const Logout = () => {

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

    const [logoutUser] = useMutation(LOGOUT,{ 
        onError:onErrorOccur,
        onCompleted: onLogoutSuccess
    });

    return (
        <React.Fragment>
        {
            error ? (
                <Tooltip title={ error}>
                    <Button color="inherit"  onClick={logoutUser} style={{marginLeft:'auto'}}>
                        Logout
                    </Button>
                </Tooltip>
            ):
            (
                <Button color="inherit"  onClick={logoutUser} style={{marginLeft:'auto'}}>
                        Logout
                </Button>
            )
        }

        </React.Fragment>
    )
}

export default Logout;