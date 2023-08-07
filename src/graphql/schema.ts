import { gql } from 'apollo-server-express';
import AuthController from '../controllers/AuthController';
import TwoFactorController from '../controllers/TwoFactorController';

const typeDefs = gql`
  type User {
    id: ID
    name: String
    email: String
  }

  type Mutation {
    register(name: String, email: String, password: String): User
    login(email: String, password: String): String
    changePassword(email: String, oldPassword: String, newPassword: String): String
    generateQRCode(email: String): String
    loginWithTwoFactor(email: String, password: String, otp: String): String
  }
`;

const resolvers = {
  Mutation: {
    register: (_, { name, email, password }) => AuthController.register(name, email, password),
    login: (_, { email, password }) => AuthController.login(email, password),
    changePassword: (_, { email, oldPassword, newPassword }) =>
      AuthController.changePassword(email, oldPassword, newPassword),
    generateQRCode: (_, { email }) => TwoFactorController.generateQRCode(email),
    loginWithTwoFactor: (_, { email, password, otp }) =>
      TwoFactorController.loginWithTwoFactor(email, password, otp),
  },
};

export { typeDefs, resolvers };
