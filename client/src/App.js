import React from 'react';
import {
  ApolloProvider,
} from "@apollo/client";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { apolloClient } from './graphql/apollo-client';
import { AuthProvider } from './components/context/auth-context';
import ProtectedRoute from './components/authentication/protected-route';
import AuthRoute from './components/authentication/auth-route';
import MatchNotFound from './components/match-not-found';
import Login from './components/authentication/login';
import './App.css';
import HomeComponent from './components/home_folder/home';
import Box from '@material-ui/core/Box';
import AuthLayout from './components/authentication/auth-layout';


const App = () => {
  return (
    <Box className="App">
      <ApolloProvider client={apolloClient}>
        <AuthProvider>

          <Router>
            <Switch>
              <Redirect exact from="/" to="/home" />
              <AuthRoute path="/auth" component={AuthLayout} />
              <ProtectedRoute path="/home" component={HomeComponent} />
              <Route path="*" render={props => <MatchNotFound {...props} />} />
            </Switch>
          </Router>
          
        </AuthProvider>
      </ApolloProvider>
     
    </Box>
  );
}

export default App;
