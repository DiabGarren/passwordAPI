import { ApolloServer, gql } from 'apollo-server';
import Resolvers = require('./resolvers');
import Mutations = require('./mutations');
import mongoose from 'mongoose';

const PORT = process.env.PORT || 8080;

import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
    .then(() => { console.log('Connected to db'); })
    .catch((err: Error) => { console.log(err.message); });

mongoose.Promise = global.Promise;
const typeDefs = gql`
type Password {
    _id: String
    service: String
    username: String
    password: String
}
type Query {
    getAllPasswords: [Password],
    getPasswordById(_id:String!): [Password],
    getPasswordByService(service:String!): [Password],
    getPasswordByUsername(username:String!): [Password]
}
type Mutation {
    createPassword(service:String!, username:String!, password:String!): Password!,
    updatePassword(_id:String!, service:String!, username:String!, password:String!): Password!,
    deletePassword(_id:String!): Password!
}`;

const resolvers = {
    Query: { ...Resolvers },
    Mutation: { ...Mutations }
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen(PORT).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});

