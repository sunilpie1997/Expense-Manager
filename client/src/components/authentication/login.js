import React, { useContext, useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../graphql/mutations';
import LoadingComponent from '../loading';
import { validateEmail, validatePassword } from '../../validation/login-data';
import { AuthUpdaterContext } from '../context/auth-context';

const Login = () => {

    const authDispatch = useContext(AuthUpdaterContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError ] = useState('');

    const onLoginOccur = ({graphQLErrors, networkError}) => {
        if(networkError) 
        setError("network error occurred");

        if(graphQLErrors.length)
        setError(graphQLErrors[0].message);
    }

    const onLoginSuccess = () => {
        authDispatch('login');
    }

    const [signIn, { data, loading }] = useMutation(LOGIN,{ 
        
        variables: {email:email, password:password  },
        onError:onLoginOccur,
        onCompleted: onLoginSuccess
    });

    const onFormSubmit = (e) => {
        e.preventDefault();
        if(validateEmail(email) && validatePassword(password))
        { signIn() } 
    }

    if(loading) return <LoadingComponent/>

    return(
        
        <React.Fragment>
            
            <form onSubmit={onFormSubmit}>

                <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <br/>
                <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <br/>
                <button type="submit">Submit</button>
            </form>

            { error ? error : ''}
        </React.Fragment>
    );
}

export default Login;