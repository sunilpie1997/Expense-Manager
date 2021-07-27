import React, {useContext} from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthStateContext } from "../context/auth-context";
import LoadingComponent from "../loading";


function ProtectedRoute({ component: Component, ...restOfProps }) {
  
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
                    isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />
                }
            />
        );
    }

}

export default ProtectedRoute;