import {
    ApolloClient,
    InMemoryCache,
  } from "@apollo/client";

export const apolloClient = new ApolloClient({
    uri: 'http://localhost:5000/graphql',
    cache: new InMemoryCache(),
    // Enable sending cookies over cross-origin requests
    credentials: 'include'
  });