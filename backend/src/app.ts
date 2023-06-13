import express from 'express';
import connectToDb from './config/dbconfig';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { expressMiddleware } from '@apollo/server/express4';
import typeDefs from './api/schemas';
import resolvers from './api/controllers';
const app = express();
console.log(typeDefs,resolvers);


connectToDb().then(async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true
  });  

  startStandaloneServer(server, {
    listen: { path: 'graphql', port: 3000 },
    
  });
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
  process.exit(1);
});

 

  // const corsOptions = {
  //   origin: "*",
  //   methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  //   allowedHeaders: [
  //       "Origin",
  //       "X-Requested-With",
  //       "Content-Type",
  //       "Accept",
  //       "Authorization",
  //       "X-Domain"
  //   ],
  //   optionsSuccessStatus: 200
  // };
  
  // app.use(
  //   cors(corsOptions),
  //   expressMiddleware(server),
  // );
