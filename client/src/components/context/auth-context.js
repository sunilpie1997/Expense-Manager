import React,{ useReducer, useEffect} from 'react';
import { apolloClient } from '../../graphql/apollo-client';


export const AuthStateContext = React.createContext();
export const AuthUpdaterContext = React.createContext();

const initialAuthState = { isLoggedIn:false, isLoading:true };

export const authReducer = (state, action) => {
  
    switch(action)
    {
      case 'login':
        localStorage.setItem("isLoggedIn", true);
        return { ...state, isLoggedIn:true, isLoading:false };
  
      case 'logout':
        localStorage.clear();
        apolloClient.clearStore()
        .then(() => console.log("cache cleared"))
        .catch((err) => console.log(err));
        
        return { ...state, isLoggedIn:false, isLoading:false };
        
    }
  }

export const AuthProvider = ({children}) => {

  const [authState, authDispatch ] = useReducer(authReducer,initialAuthState);

  useEffect(()=>{
    
    // whenever user refreshes page check localStorage if logged in
    const isLoggedIn =  localStorage.getItem("isLoggedIn");
    console.log("isLoggedIn",isLoggedIn);
    
    isLoggedIn ? authDispatch('login') : authDispatch('logout')
  },[]);


  return (
    
    <AuthStateContext.Provider value={authState}>
      <AuthUpdaterContext.Provider value={authDispatch}>
        {children}
      </AuthUpdaterContext.Provider>
    </AuthStateContext.Provider>
  );

} 