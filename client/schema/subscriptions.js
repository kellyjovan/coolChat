import gql from 'graphql-tag';

export const MsgSub = gql`
  subscription messageAdded {
    messageAdded {
      mutation
      message { 
        id
        username
        message
        created_at
      }
    }
  }
`;

export const Logged = gql`
  subscription userLoggedIn {
    userLoggedIn {
      person
    }
  }
`;
