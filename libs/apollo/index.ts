import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  HttpLink,
} from '@apollo/client';
import { useMemo } from 'react';

export const API_KEY_HEADER = 'x-api-key';

let existingApolloClient: ApolloClient<NormalizedCacheObject>;
export default function createApolloClient(): ApolloClient<NormalizedCacheObject> {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
      uri: "https://prd.api.ocdev.io/graphql", // Server URL (must be absolute)
      // credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
    }),
    name: `oe-dev`,
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(
  initialState = {}
): ApolloClient<NormalizedCacheObject> {
  const apolloClient = existingApolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    apolloClient.cache.restore(initialState);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return apolloClient;
  // Create the Apollo Client once in the client
  if (!existingApolloClient) existingApolloClient = apolloClient;

  return apolloClient;
}

export function useApollo(
  initialState: NormalizedCacheObject
): ApolloClient<NormalizedCacheObject> {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
