import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import { IDataSourceContext } from "./common/types.js";

// TODO: Figure out how to import using index without using ts-loader and webpack
import { resolvers } from "./resolvers/resolvers.js";
import { typeDefs } from "./schema/schema.js";
import { dataSources } from "./datasources/index.js";

const server = new ApolloServer<IDataSourceContext>({
    typeDefs,
    resolvers
});

const { url } = await startStandaloneServer(server, {
    context: async () => {
        return {
            dataSources: dataSources
        };
    },
    listen: { port: 4000 }
});

console.log(`🚀  Server ready at ${url}`);