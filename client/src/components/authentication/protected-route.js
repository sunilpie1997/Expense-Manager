import React, {useContext} from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthStateContext } from "../context/auth-context";

function ProtectedRoute({ component: Component, ...restOfProps }) {
  
    const { isLoggedIn, isLoading } = useContext(AuthStateContext);
    
    if(isLoading)
    {
        return (
            <h1>Loading ...</h1>
        )
    }
    else
    {
        return (
            <Route
                {...restOfProps}
        
                render={ props =>
                    isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />
                }
            />
        );
    }

}

export default ProtectedRoute;