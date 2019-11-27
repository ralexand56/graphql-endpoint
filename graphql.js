const { ApolloServer, gql } = require("apollo-server-lambda");

let teams = ["Ravens", "Seahawks", "Superbowl", "Patriots"];

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    getTeams: [String]
  }

  type Mutation {
    createTeam(name: String, id: Int): [String]
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    getTeams: () => teams
  },
  Mutation: {
    createTeam: (_, { name, id }) => {
      teams.push(name);
      console.log(id);
      return teams;
    }
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
