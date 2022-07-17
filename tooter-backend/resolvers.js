const { UserInputError, AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const { PubSub } = require("graphql-subscriptions");
const Toot = require("./models/toot");
const pubsub = new PubSub();

const resolvers = {
  Query: {
    allToots: async (root, args) => {
      return Toot.find({});
    },
  },
  Mutation: {
    addToot: async (root, args) => {
      /*const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }*/

      const toot = new Toot({ ...args})
      try {
        const savedToot = await toot.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      return toot;
    },
  },
};
module.exports = resolvers;
