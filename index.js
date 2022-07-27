const { ApolloServer } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { execute, subscribe } = require("graphql");
const { SubscriptionServer } = require("subscriptions-transport-ws");
const express = require("express");
const http = require("http");
const testRouter = require('./routes');
const mongoose = require("mongoose");
const config = require('./utils/config');

const User = require("./models/user");
  
const jwt = require("jsonwebtoken");

const typeDefs = require("./schema");
const resolvers = require("./resolvers");


console.log("connecting to  ", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

//  mongoose.set("debug", true);

const start = async () => {
  const app = express();
  app.use(express.static('build'))
  app.use('/api/test', testRouter);
  const httpServer = http.createServer(app);

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
    },
    {
      server: httpServer,
      path: "",
    }
  );

  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      try {
      const auth = req ? req.headers.authorization : null;
      if (auth && auth.toLowerCase().startsWith("bearer ")) {
        const decodedToken = jwt.verify(auth.substring(7), config.SECRET);
        const currentUser = await User.findById(decodedToken.id);
        return { currentUser };
      }
      return { currentUser: null}
    } catch (ex) {
     // console.log(ex)
      return { currentUser: null };
    }
    },
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
    ],
  });

  await server.start();

  server.applyMiddleware({
    app,
    path: "/",
  });


  httpServer.listen(config.PORT, () =>
    console.log(`Servers is now running on http://localhost:${config.PORT}`)
  );
};

// call the function that does the setup and starts the server
start();
