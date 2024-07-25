import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';

// HTTP connection to the API
const httpLink = createHttpLink({
  uri: 'https://sirefcode.hasura.app/v1/graphql',
});

// Middleware to add headers to the requests
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      'content-type': 'application/json',
      'x-hasura-admin-secret': 'jw8y3lwW7Vk4HKuROjlbs3flnrYaDsE1vkqNqhtTgv3rIo8bC655Fx6WmSZk4KvO',
    }
  };
});

// Apollo Client setup
const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
    },
    query: {
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
});

export default apolloClient;
