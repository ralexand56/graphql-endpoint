const { ApolloServer, gql } = require("apollo-server-lambda");
const { Client } = require("pg");

const client = new Client({
  user: "ralexand56",
  host: "budget-db.cgriuypuaifa.us-east-1.rds.amazonaws.com",
  database: "budget-test",
  password: "wGUQUIniNIMSbUe19zaT",
  port: 5432
});

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
    createTeam: async (_, { name, id }) => {
      teams.push(name);
      // console.log(id);

      client.connect();

      const resp = await client.query("select * from line_item");
      console.log(resp.rows);
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
