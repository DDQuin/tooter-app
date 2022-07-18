const { UserInputError, AuthenticationError, ValidationError } = require("apollo-server");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const { PubSub } = require("graphql-subscriptions");
const Toot = require("./models/toot");
const User = require("./models/user");
const bcrypt = require('bcrypt');
const pubsub = new PubSub();

const resolvers = {
  Query: {
    allToots: async (root, args) => {
      return Toot.find({});
    },
    allUsers: async (root, args) => {
      return User.find({});
    },
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Mutation: {
    addToot: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      const existingToot = await Toot.findOne({ content: args.content });
      if (existingToot) {
        throw new ValidationError("Toot must be unique!");
      }

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
    createUser: async (root, args) => {
      const { username, password } = args;
      if (username.length < 3 || password.length < 3) {
        throw new UserInputError('Password or user mush be atleast 3 characters!', {
          invalidArgs: args,
        });
      }
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        throw new ValidationError("User must be unique!");
      }

      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);
      const user = new User({
        username, passwordHash
      });

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      });
    },
    login: async (root, args) => {
      const { username, password } = args;
      const user = await User.findOne({ username });
      const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash);

    if (!(user && passwordCorrect)) {
      throw new UserInputError("wrong credentials");
    }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },
};
module.exports = resolvers;
