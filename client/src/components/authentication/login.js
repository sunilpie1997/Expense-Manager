import React, { useContext, useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../graphql/mutations';
import LoadingComponent from '../loading';
import { validateLoginData } from '../../validation/login-data';
import { AuthUpdaterContext } from '../context/auth-context';
import Box from '@material-ui/core/Box';
import { useStyles } from '../../styles/material-styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';

const Login = () => {

    const authDispatch = useContext(AuthUpdaterContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError ] = useState('');

    const classes = useStyles();

    const onErrorOccur = ({graphQLErrors, networkError}) => {
        if(networkError) 
        setError("network error occurred");

        if(graphQLErrors.length)
        setError(graphQLErrors[0].message);
    }

    const onLoginSuccess = () => {
        authDispatch('login');
    }

    const [signIn, { loading:loginLoad }] = useMutation(LOGIN,{ 
        
        variables: {email:email, password:password  },
        onError:onErrorOccur,
        onCompleted: onLoginSuccess
    });

    const onLoginSubmit = (e) => {
        e.preventDefault();
        if(validateLoginData({email:email,password:password}))
        { signIn() } 
    }

    if(loginLoad) return <LoadingComponent/>

    return(
        <Box className={classes.box_margin}>

            { error ?  <Typography variant="body1" className={classes.error_text}>{error}</Typography> : ''}
            <Box className={classes.login_box}>

                <TextField id="standard-basic" label="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <br/><br/>
                <TextField id="standard-password-input" label="Password" value={password} type="password" onChange={(e) => setPassword(e.target.value)} />
                <br/><br/>

                <Fab variant="extended" color="primary" size="small" style={{margin:'1em'}} onClick={onLoginSubmit} >SIGN IN</Fab>
                
            </Box>
        </Box>
    );
}

export default Login;