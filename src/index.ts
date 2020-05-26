import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server";

import { BookResolver } from "./resolvers/BookResolver";

async function main() {
    const connection = await createConnection()
    const schema = await buildSchema({
        resolvers: [BookResolver]
    })
    const server = new ApolloServer({ schema })
    await server.listen(4500)
    console.log('Server has started')
}

main();