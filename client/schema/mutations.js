import gql from 'graphql-tag';

export const createMessage = gql`
  mutation($userId: Int!, $message: String!) {
    createMessage(userId: $userId, message: $message) {
      mutation
      message {
        username
        message
      }
    }
  }
`;

export const createUser = gql`
  mutation($username: String!, $password: String!) {
    createUser(username: $username) {
      username
      passwords
    }
  }
`;

export const login = gql`
  mutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      username
      token
      success
    }
  }
`;

export const signup = gql`
  mutation($username: String!, $password: String!) {
    signup(username: $username, password: $password) {
      username
      token
      error
      success
    }
  }
`;
