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
  createdAt: String!
}

type Like {
  user: User!
  toot: Toot! 
}

type Query {
  allToots(search: String): [Toot!]!
  allUsers: [User!]!
  allComments: [Comment!]!
  allLikes: [Like!]!
  me: User
  getUser(userId: ID!): User
  getToot(tootId: ID!): Toot
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
  description: String
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
  setDescription(description: String!): User
  setName(name: String!): User
  followUser(id: ID!): User
}
`;


module.exports = typeDefs;
