import { ApolloServer, gql } from 'apollo-server';
import Resolvers = require('./resolvers');
import Mutations = require('./mutations');
import mongoose from 'mongoose';

import dotenv from 'dotenv';
dotenv.config();

// const uri = process.env.MONGDB_URI;
// console.log(uri);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => { console.log('Connected to db'); })
    .catch((err: Error) => { console.log(err.message); });

mongoose.Promise = global.Promise;
const typeDefs = gql`
type Password {
    service: String
    username: String
    password: String
}
type Query {
    passwords: [Password]
}
type Mutation {
    createPassword(service:String!, username:String!, password:String!): Password!
}`;

const resolvers = {
    Query: { ...Resolvers },
    Mutation: { ...Mutations }
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});

