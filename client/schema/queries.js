import gql from 'graphql-tag';

export const messageQuery = gql`
  {
    messages {
      id
      username
      message
      created_at
    }
  }
`;

export const userQuery = gql`
  {
    users
  }
`;
