const { gql } = require("apollo-server");

const typeDefs = gql`
type Toot {
  content: String!
  id: ID!
}

type Query {
  allToots: [Toot!]!
  me: User
}

type User {
  username: String!
  id: ID!
}

type Mutation {
  addToot(
    content: String!
  ): Toot
}
`;
module.exports = typeDefs;
