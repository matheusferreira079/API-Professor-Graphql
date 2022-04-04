const { ApolloServer } = require("apollo-server");
const graphql = require("./src/graphql");

const server = new ApolloServer({
  ...graphql,
  formatError: (err) => {
    if (err.message.startsWith("Professor Existente:")) {
      return new Error(err.message);
    }

    return err;
  },
});

server.listen().then(({ url }) => console.log(`\n\nAplicação rodando na porta: ${url}`));