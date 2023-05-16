import { gql } from 'graphql-tag';

export default gql`
  type User {
    id: ID!
    username: String!
  }
  type Query {
    getUsers: [User]
    getUser(id: ID!): User
  }
  type Mutation {
    addUser(username: String!): User
    deleteUser(id: ID!): User
    updateUser(username: String!, id: ID!): User
  }
`;
