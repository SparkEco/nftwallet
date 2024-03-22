import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloclient = new ApolloClient({
  uri: "https://api.studio.thegraph.com/query/67428/impactscribe/version/latest",
  cache: new InMemoryCache(),
});

export const hypercertsGraph =  new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/hypercerts-org/hypercerts-sepolia",
  cache: new InMemoryCache()
})