const { GraphQLServerLambda } = require("graphql-yoga");
var fs = require("fs")

const typeDefs = fs.readFileSync("./schema.gql").toString('utf-8');
const resolvers = {
    Query: {
        disciplinas: require("./querys/mysql_getDisciplinas").func(),
    },

    Mutation: {
        mysql_createUser: require("./resolver/Mutation/mysql_createUser").func,
        postgresql_createUser: require("./resolver/Mutation/postgresql_createUser").func,
        aurora_createUser: require("./resolver/Mutation/aurora_createUser").func
    }
};

const lambda = new GraphQLServerLambda({
    typeDefs,
    resolvers
});

exports.server = lambda.graphqlHandler;
exports.playground = lambda.playgroundHandler;