import React, { useContext, useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN, REGISTER } from '../../graphql/mutations';
import LoadingComponent from '../loading';
import { validateLoginData, validateRegisterData } from '../../validation/login-data';
import { AuthUpdaterContext } from '../context/auth-context';
import Box from '@material-ui/core/Box';
import { useStyles } from '../../styles/style';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';

const Login = () => {

    const authDispatch = useContext(AuthUpdaterContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError ] = useState('');

    // whether user is using this page to login or registering
    const [login, setLogin] = useState(true);

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

    const onRegisterSuccess = () => {
        setError('');
        alert("registered successfully");
    }

    const [signIn, { loading:loginLoad }] = useMutation(LOGIN,{ 
        
        variables: {email:email, password:password  },
        onError:onErrorOccur,
        onCompleted: onLoginSuccess
    });

    const [register, { loading:registerLoad }] = useMutation(REGISTER,{ 
        
        variables: {email:email, password:password, firstName:firstName, lastName:lastName  },
        onError:onErrorOccur,
        onCompleted: onRegisterSuccess
    });

    const onLoginSubmit = (e) => {
        e.preventDefault();
        if(validateLoginData({email:email,password:password}))
        { signIn() } 
    }

    const onRegisterSubmit = (e) => {
        e.preventDefault();
        if(validateRegisterData({email:email,password:password, firstName: firstName}))
        { register() } 
    }

    if(loginLoad || registerLoad) return <LoadingComponent/>

    return(
        
        <Box className={classes.login_box}>
            
            {/* use can choose to 'login' or 'register' based on button click */}

            <Fab variant="extended" size="small" color="secondary" className={classes.action_button} 
                onClick={()=>{ setLogin(true); setError('')} } style={{marginRight:'2em'}}>
                Want to Login
            </Fab>

            <Fab variant="extended" size="small" color="secondary" className={classes.action_button} 
                onClick={()=> { setLogin(false);setError('') }}>
                Want to Register
            </Fab>

            
            <br/><br/>
            <TextField id="standard-basic" label="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <br/>
            <TextField id="standard-password-input" label="Password" value={password} type="password" onChange={(e) => setPassword(e.target.value)} />
            <br/>

            {   // display additional fields if user tries to register
                !login && (
                    <React.Fragment>
                        <TextField id="standard-basic" label="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                        <br/>
                        <TextField id="standard-basic" label="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                        <br/>
                    </React.Fragment>
                ) 
            }
            
            {
                login ? (
                    <Fab variant="extended" color="primary" size="small" style={{margin:'1em'}} onClick={onLoginSubmit} >Login</Fab>
                ):
                (
                    <Fab variant="extended" color="primary" size="small" style={{margin:'1em'}} onClick={onRegisterSubmit} >Register</Fab>
                )
            }
            

            { error ?  <Typography variant="h5" color="secondary">{error}</Typography> : ''}
        </Box>
    );
}

export default Login;