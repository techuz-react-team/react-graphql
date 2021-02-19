import React from "react";
import { gql, useQuery } from "@apollo/client";

const GET_REPOSITORIES = gql`
  query getRepositories {
    viewer {
      repositories(first: 100) {
        totalCount
        nodes {
          name
          # owner {
          #   login
          # }
        }
      }
    }
  }
`;

const Repository = () => {
  const { loading, error, data } = useQuery(GET_REPOSITORIES);
  const allRepo = data?.viewer?.repositories?.nodes;
  
  if (loading) {
    return "Loading...";
  }
  if (error) {
    return `Error! ${error.message}`;
  }
  return (
    <div className="footer">
      <h3>All Repositories</h3>
      <ul>
        {allRepo.map((repo) => {
          return <li key={repo.name}>{repo.name}</li>;
        })}
      </ul>
    </div>
  );
};

export default Repository;
