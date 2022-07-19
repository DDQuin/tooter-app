const { gql } = require("apollo-server");

const typeDefs = gql`
type Toot {
  content: String!
  id: ID!
  createdAt: String!
  user: User!
}

type Query {
  allToots: [Toot!]!
  allUsers: [User!]!
  me: User
}

type User {
  username: String!
  id: ID!
  toots: [Toot!]!
}

type Token {
  value: String!
}

type Mutation {
  addToot(
    content: String!
  ): Toot
  createUser(username: String!, password: String!): User
  login(username: String!, password: String!): Token
}
`;


module.exports = typeDefs;
