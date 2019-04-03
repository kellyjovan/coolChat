const { gql } = require('apollo-server-express');

// login(userName: String!, password: String!): LoginSuccess

module.exports = gql`
  type Query {
    messages: [Message]
    users: [String]
  }

  type MessageResponse {
    message: Message!
    mutation: String!
  }

  type Message {
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

  type Mutation {
    createUser(userName: String!, password: String!): UserSuccess
    createMessage(userId: Int!, message: String!): MessageResponse
    login(userName: String!, password: String!): LoginSuccess
  }

  type Subscription {
    messageAdded: MessageResponse
  }
`;
