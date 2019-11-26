const { ApolloServer, gql } = require("apollo-server-lambda");

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: [String]
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => ["Ravens", "Seahawks", "Superbowl"]
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    settings: {
      "editor.cursorShape": "line"
    }
  }
});

exports.graphqlHandler = server.createHandler({
  cors: {
    origin: "*",
    credentials: false
  }
});
