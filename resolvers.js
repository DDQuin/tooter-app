const { UserInputError, AuthenticationError, ValidationError } = require("apollo-server");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const { PubSub } = require("graphql-subscriptions");
const Toot = require("./models/toot");
const User = require("./models/user");
const Comment = require("./models/comment");
const Like = require("./models/like");
const { ObjectId } = require('mongodb');
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
    allComments: async (root, args) => {
      return Comment.find({});
    },
    allLikes: async (root, args) => {
      return Like.find({});
    },
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Toot: {
    user: async (root) => await User.findById(root.user),
    comments: async (root) => {
      const tootWithComments = await Toot.findById(root.id).populate("comments");
      const comments = tootWithComments.comments
      return comments;
    },
    likes: async (root) => {
      const tootWithLikes = await Toot.findById(root.id).populate("likes");
      const likes = tootWithLikes.likes
      return likes;
    },
  },
  Comment: {
    user: async (root) => await User.findById(root.user),
    toot: async (root) => await Toot.findById(root.toot),
  },
  Like: {
    user: async (root) => await User.findById(root.user),
    toot: async (root) => await Toot.findById(root.toot),
  },
  User: {
    toots: async (root) => {
      const userWithToots = await User.findById(root.id).populate("toots");
      const toots = userWithToots.toots
      return toots;
    },
    comments: async (root) => {
      const userWithComments = await User.findById(root.id).populate("comments");
      const comments = userWithComments.comments
      return comments;
    },
    likes: async (root) => {
      const tootWithLikes = await User.findById(root.id).populate("likes");
      const likes = tootWithLikes.likes
      return likes;
    },
    following: async (root) => {
      const userWithFollwing = await User.findById(root.id).populate("following");
      const following = userWithFollwing.following
      return following
    },
    followedBy: async (root) => {
      const userWithFollowedBy = await User.findById(root.id).populate("followedBy");
      const followedBy = userWithFollowedBy.followedBy
      return followedBy
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

      const toot = new Toot({content: args.content, user: currentUser.id})
      try {
        const savedToot = await toot.save();
        currentUser.toots = currentUser.toots.concat(savedToot._id);
        await currentUser.save();
        return toot;
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      
    },
    createComment: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }
      const { tootId } = args
     /* const existingToot = await Toot.findOne({ content: args.content });
      if (existingToot) {
        throw new ValidationError("Toot must be unique!");
      }*/

      const tootToCommentOn = await Toot.findById(tootId)
      if (!tootToCommentOn) {
        throw new ValidationError("Toot doesn't exist!");
      }

      const comment = new Comment({content: args.content, user: currentUser.id, toot: tootId})

      try {
        const savedComment = await comment.save();
        tootToCommentOn.comments = tootToCommentOn.comments.concat(savedComment._id)
        currentUser.comments = currentUser.comments.concat(savedComment._id)
        await tootToCommentOn.save()
        await currentUser.save()
        return savedComment;
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

    },
    likeToot: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }
      const { tootId } = args

      const tootToLike = await Toot.findById(tootId)
      if (!tootToLike) {
        throw new ValidationError("Toot doesn't exist!");
      }
      for (let likeId of tootToLike.likes) {
        if (currentUser.likes.includes(likeId)) {
          console.log("removing like ", likeId)
          tootToLike.likes = tootToLike.likes.filter(tootLike => tootLike !== likeId)
          currentUser.likes = currentUser.likes.filter(userLike => userLike !== likeId)
          await tootToLike.save()
          await currentUser.save()
          await Like.findByIdAndDelete(likeId)
          return likeId
        }
      }
      const like = new Like({user: currentUser.id, toot: tootId})

      try {
        const savedLike = await like.save();
        tootToLike.likes = tootToLike.likes.concat(savedLike._id)
        currentUser.likes = currentUser.likes.concat(savedLike._id)
        await tootToLike.save()
        await currentUser.save()
        return like.id
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

    },
    setAvatar: async (root, args, context) => {
      const { url } = args
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }
      currentUser.avatar = url
      await currentUser.save()
      return currentUser
      
    },
    setName: async (root, args, context) => {
      const { name } = args
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }
      currentUser.name = name
      await currentUser.save()
      return currentUser
      
    },
    followUser: async (root, args, context) => {
      const { id } = args
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      const userToFollow = await User.findById(id)
      if (!userToFollow) {
        throw new ValidationError("User id doesn't exist!");
      }
      if (id === currentUser.id) {
        throw new UserInputError("You can't follow yourself");
      }
      if (userToFollow.followedBy.includes(currentUser.id)) {
        console.log("unfollows")
        await User.updateOne( { _id: userToFollow._id }, { $pull: { followedBy: currentUser._id }})
        await User.updateOne( { _id: currentUser._id }, { $pull: { following: userToFollow._id }})
        return currentUser
      }
      currentUser.following = currentUser.following.concat(userToFollow.id);
      await currentUser.save()
      userToFollow.followedBy = userToFollow.followedBy.concat(currentUser.id)
      await userToFollow.save()
      return currentUser
      
    },
    createUser: async (root, args) => {
      const { username, password, name } = args;
      if (username.length < 3 || password.length < 3 || name.length < 3) {
        throw new UserInputError('Password or user must be atleast 3 characters!', {
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
        username, passwordHash, name
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
