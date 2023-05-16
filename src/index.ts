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

const server = new ApolloServer({ typeDefs, resolvers });
server.listen(PORT).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});

