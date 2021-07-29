import React, { useContext, useState } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER } from '../../graphql/mutations';
import LoadingComponent from '../loading';
import { validateRegisterData } from '../../validation/login-data';
import Box from '@material-ui/core/Box';
import { useStyles } from '../../styles/material-styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';

const Register = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError ] = useState('');

    const classes = useStyles();

    const onErrorOccur = ({graphQLErrors, networkError}) => {
        if(networkError) 
        setError("network error occurred");

        if(graphQLErrors.length)
        setError(graphQLErrors[0].message);
    }

    const onRegisterSuccess = () => {
        setError('');
        alert("registered successfully");
    }

    const [register, { loading:registerLoad }] = useMutation(REGISTER,{ 
        
        variables: {email:email, password:password, firstName:firstName, lastName:lastName  },
        onError:onErrorOccur,
        onCompleted: onRegisterSuccess
    });

    const onRegisterSubmit = (e) => {
        e.preventDefault();
        if(validateRegisterData({email:email,password:password, firstName: firstName}))
        { register() } 
    }

    if(registerLoad) return <LoadingComponent/>

    return(
        <Box className={classes.box_margin}>

            { error ?  <Typography variant="body1" className={classes.error_text}>{error}</Typography> : ''}

            <Box className={classes.login_box}>

                <TextField id="standard-basic" label="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <br/><br/>
                <TextField id="standard-password-input" label="Password" value={password} type="password" onChange={(e) => setPassword(e.target.value)} />
                <br/><br/>
                <TextField id="standard-basic" label="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                <br/><br/>
                <TextField id="standard-basic" label="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                <br/><br/>
                
                <Fab variant="extended" color="primary" size="small" style={{margin:'1em'}} onClick={onRegisterSubmit} >Register</Fab>

            </Box>
        </Box>
    );
}

export default Register;