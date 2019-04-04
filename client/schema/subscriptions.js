import gql from 'graphql-tag';

export default gql`
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
