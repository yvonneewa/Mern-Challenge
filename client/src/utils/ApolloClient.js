import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// Create an HTTP link to your GraphQL server
const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql', // Replace with your GraphQL server URL
});

// Create an Apollo Client instance with the HTTP link and cache
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
