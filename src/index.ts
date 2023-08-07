import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import connectDB from './db/connect';
import { typeDefs, resolvers } from './graphql/schema';
import authRouter from './routes/AuthRoutes';
import twoFactorRouter from './routes/TwoFactorRoutes';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/auth', authRouter);
app.use('/two-factor', twoFactorRouter);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => { },
});

server.applyMiddleware({ app });

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
