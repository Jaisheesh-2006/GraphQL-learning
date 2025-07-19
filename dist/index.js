//* The below import is to setup and configure the graphQL server(apollo)
import { ApolloServer } from '@apollo/server';
//* This import is necessary for start of apollo server.
import { startStandaloneServer } from '@apollo/server/standalone';
//* server setup
const server = new ApolloServer({});
//* start server
const { url } = await startStandaloneServer(server, {
    listen: { port: parseInt(process.env.PORT) } //*process.env object is inferred as string
});
console.log('Server started succesfully at port ', process.env.PORT);
