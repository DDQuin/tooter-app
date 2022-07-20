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
  avatar: String
  following: [User!]!
  followedBy: [User!]!
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
  setAvatar(url: String!): User
  followUser(id: ID!): User
}
`;


module.exports = typeDefs;
