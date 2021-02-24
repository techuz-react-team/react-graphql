import React from "react";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../queries/queries";

const Repository = () => {
  const { loading, error, data } = useQuery(GET_REPOSITORIES);
  const repoList = data?.viewer?.repositories?.nodes;

  const renderRepoList = React.useMemo(() => {
    return repoList
  }, [repoList])


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
        {renderRepoList.map((repo, index) => {
          return <li key={index}>{repo.name}</li>;
        })}
      </ul>
    </div>
  );
};

export default Repository;
