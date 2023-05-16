import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import connectDB from "./config/db";
import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";

const server = new ApolloServer({ typeDefs, resolvers });
connectDB();

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
