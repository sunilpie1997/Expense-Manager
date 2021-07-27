import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { apolloClient } from './graphql/apollo-client';
import { AuthProvider } from './components/context/auth-context';
import ProtectedRoute from './components/authentication/protected-route';
import LoginRoute from './components/authentication/login-route';
import MatchNotFound from './components/match-not-found';
import Login from './components/authentication/login';
import './App.css';
import HomeComponent from './components/home_folder/home';


const App = () => {
  return (
    <div className="App">
      <ApolloProvider client={apolloClient}>
        <AuthProvider>

          <Router>
            <Switch>
              <Redirect exact from="/" to="/home" />
              <LoginRoute exact path="/login" component={Login} />
              <ProtectedRoute path="/home" component={HomeComponent} />
              <Route path="*" render={props => <MatchNotFound {...props} />} />
            </Switch>
          </Router>
          
        </AuthProvider>
      </ApolloProvider>
     
    </div>
  );
}

export default App;
