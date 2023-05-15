"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const Resolvers = require("./resolvers");
const Mutations = require("./mutations");
const mongoose_1 = __importDefault(require("mongoose"));
const PORT = process.env.PORT || 8080;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// const uri = process.env.MONGDB_URI;
// console.log(uri);
mongoose_1.default.connect(process.env.MONGODB_URI)
    .then(() => { console.log('Connected to db'); })
    .catch((err) => { console.log(err.message); });
mongoose_1.default.Promise = global.Promise;
const typeDefs = (0, apollo_server_1.gql) `
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
    Query: Object.assign({}, Resolvers),
    Mutation: Object.assign({}, Mutations)
};
const server = new apollo_server_1.ApolloServer({ typeDefs, resolvers });
server.listen(PORT).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
