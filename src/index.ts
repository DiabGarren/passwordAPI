import dotenv from 'dotenv';
dotenv.config();
import Resolvers = require('./resolvers');
import Mutations = require('./mutations');
import mongoose from 'mongoose';

import { ApolloServer, gql } from 'apollo-server-express';
import express from 'express';
const app = express();

import routes = require('./routes');

const PORT = process.env.PORT || 8080;

app.set('view engine', 'ejs');

mongoose.connect(process.env.MONGODB_URI)
    .then(() => { console.log('Connected to db'); })
    .catch((err: Error) => { console.log(err.message); });

mongoose.Promise = global.Promise;

const typeDefs = gql`
type User {
    _id: String
    username: String
    password: String
}
type Query {
    getAllUsers: [User],
    getUserById(_id:String!): [User],
    getUserByUsername(username:String!): [User]
}
type Mutation {
    createUser(username:String!, password:String!): User!,
    updateUser(_id:String!, username:String!, password:String!): User!,
    deleteUser(_id:String!): User!
}`;

const resolvers = {
    Query: { ...Resolvers },
    Mutation: { ...Mutations }
};


const startServer = async () => {
    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();
    server.applyMiddleware({
        app,
        path: '/graphql',
    });
    app.use('/', routes);
};

startServer();


app.listen({port: PORT}, () => {
    console.log(`🚀  Server ready at http://localhost:${PORT}/graphql`);
});
