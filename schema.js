const { gql } = require("apollo-server");

const typeDefs = gql`
type Toot {
  content: String!
  id: ID!
  createdAt: String!
  user: User!
  comments: [Comment!]!
}

type Comment {
  content: String!
  user: User!
  toot: Toot! 

}

type Query {
  allToots: [Toot!]!
  allUsers: [User!]!
  allComments: [Comment!]!
  me: User
}

type User {
  username: String!
  id: ID!
  toots: [Toot!]!
  avatar: String
  following: [User!]!
  followedBy: [User!]!
  comments: [Comment!]!
}

type Token {
  value: String!
}

type Mutation {
  addToot(
    content: String!
  ): Toot
  createUser(username: String!, password: String!): User
  createComment(tootId: ID!, content: String!): Comment
  login(username: String!, password: String!): Token
  setAvatar(url: String!): User
  followUser(id: ID!): User
}
`;


module.exports = typeDefs;
