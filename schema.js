const { gql } = require("apollo-server");

const typeDefs = gql`
type Toot {
  content: String!
  id: ID!
  createdAt: String!
  user: User!
  comments: [Comment!]!
  likes: [Like!]!
}

type Comment {
  content: String!
  user: User!
  toot: Toot! 
}

type Like {
  user: User!
  toot: Toot! 
}

type Query {
  allToots: [Toot!]!
  allUsers: [User!]!
  allComments: [Comment!]!
  allLikes: [Like!]!
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
  likes: [Like!]!
  name: String!
}

type Token {
  value: String!
}

type Mutation {
  addToot(
    content: String!
  ): Toot
  createUser(username: String!, password: String!, name: String!): User
  createComment(tootId: ID!, content: String!): Comment
  likeToot(tootId: ID!): ID
  login(username: String!, password: String!): Token
  setAvatar(url: String!): User
  setName(name: String!): User
  followUser(id: ID!): User
}
`;


module.exports = typeDefs;
