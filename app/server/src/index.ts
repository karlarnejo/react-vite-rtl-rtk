import express from "express";
import http from 'http';
import cors from 'cors';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@apollo/server/express4';
import { IRequestContext } from "./common/types";
import { ApolloServer } from "@apollo/server";
import { typeDefs } from "./schema/schema.js";
import { dataSources } from "./datasources/index.js";
import { resolvers } from "./resolvers/resolvers.js";
import { AdditionalHeaderKey } from "./common/enums.js";
import { graphqlPath, port } from "./common/constants.js";

// TODO: Figure out how to import using index without using ts-loader and webpack
const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer<IRequestContext>({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    formatError: (err) => {
        return err;
    },
});

await server.start();

app.use(
    graphqlPath,
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server, {
        context: async ({ req }): Promise<any> => {
            const { headers = {} } = req;
            // TODO: generate a UUID header here to pass on to the logger.
            const logger_header_uuid = (headers[AdditionalHeaderKey.LOGGER_HEADER_UUID] || '') as string;

            const contextValue: IRequestContext = {
                headers,
                datasources: dataSources({}),
                // TODO: logger context here with logger_header_uuid param
            };

            return {
                dataSources: dataSources({ contextValue })
            }
        }
    })
);

httpServer.listen(port, () => {
    console.log(`🚀  Server ready at http://localhost:${port}${graphqlPath}`);
});