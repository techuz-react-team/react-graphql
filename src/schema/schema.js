import { gql } from "@apollo/client";

const typeDefs = gql`
  type Mutation {
    createRepository(name: String!, visibility: String!): Repo
  }

  type Repo {
    name: String,
    visibility: String
  }
`;

module.exports = typeDefs;