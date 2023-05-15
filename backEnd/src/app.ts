import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import { expressMiddleware } from '@apollo/server/express4';
import express from "express";
import connectToDB from "./config/dbConnect";
import typeDefs from "./schemas";
import resolvers from "./controllers";
import CONFIG from "./config";
const app = express();

connectToDB().then(async () => {
    const server = new ApolloServer({
        typeDefs,
        resolvers
    })

    const { url } = await startStandaloneServer(server,
        {
            listen: { port: CONFIG.CONNECTION_PORT },
            context: async ({ req, res }) => {
                return req;
            }
        })
    console.log(`Server Running at : ${url}`);
    app.use(expressMiddleware(server));
})
