import { gql } from "@apollo/client";

const AddRepoMutation = gql`
  mutation {
    createRepository(input: { name: $name, visibility: $visibility }) {
      repository {
        name
        description
      }
    }
  }
`;

export { AddRepoMutation };
