// prevent user from accessing login page until he logouts out
import React, {useContext} from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthStateContext } from "../context/auth-context";
import LoadingComponent from "../loading";

function LoginRoute({ component: Component, ...restOfProps }) {
  
    const { isLoggedIn, isLoading } = useContext(AuthStateContext);
    
    if(isLoading)
    {
        return (
            <LoadingComponent/>
        )
    }
    else
    {
        return (
            <Route
                {...restOfProps}
        
                render={ props =>
                    isLoggedIn ? <Redirect to="/" /> : <Component {...props} />
                }
            />
        );
    }

}

export default LoginRoute;