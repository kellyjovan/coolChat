const { gql } = require('apollo-server-express');

// login(userName: String!, password: String!): LoginSuccess

module.exports = gql`
  type Query {
    messages: [Message]
    users: [String]
  }

  type MessageResponse {
    success: Boolean!
    error: String
    message: Message
    mutation: String
  }

  type Message {
    id: Int!
    username: String!
    message: String!
    created_at: String!
  }

  type UserSuccess {
    username: String!
    success: Boolean!
  }

  type LoginSuccess {
    username: String!
    success: Boolean!
    token: String!
    error: String
  }

  type SignupSuccess {
    username: String!
    success: Boolean!
    token: String!
    error: String
  }

  type Mutation {
    createUser(username: String!, password: String!): UserSuccess
    createMessage(message: String!): MessageResponse
    login(username: String!, password: String!): LoginSuccess
    signup(username: String!, password: String!): SignupSuccess
  }

  type Subscription {
    messageAdded: MessageResponse
  }
`;
