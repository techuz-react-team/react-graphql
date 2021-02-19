import { gql, useMutation } from "@apollo/client";
import React from "react";

const CREATE_REPO = gql`
  mutation CreateRepository($name: String!, $visibility: String!) {
    createRepository(input: { name: $name, visibility: $visibility }) {
      repository {
        name
        # description
      }
    }
  }
`;

function CreateNewRepo() {
  const [inputs, setInputs] = React.useState({});

  const [createRepo, { loading, error }] = useMutation(CREATE_REPO, {
    onCompleted: (data) => console.log("Data from mutation", data),
    onError: (error) => console.error("Error creating a post", error),
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  const handleInputChange = (event) => {
    console.log(event.target.value);
    event.persist();
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };

  function handleCreateRepo(event) {
    event.preventDefault();
    console.log(inputs);
    // the mutate function also doesn't return a promise
    createRepo({
      variables: {
        name: inputs.repoName,
        description: inputs.description,
        // visibility: inputs.visibility,
      },
    });
  }

  return (
    <div>
      <form onSubmit={handleCreateRepo}>
        <div className="form-group col-6">
          <label>Repository name</label>
          <input
            className="form-control"
            type="text"
            name="name"
            onChange={handleInputChange}
            value={inputs.repoName}
          ></input>
        </div>
        {/* <div className="form-group col-6">
          <label>Description</label>
          <textarea
            className="form-control"
            type="number"
            name="description"
            onChange={handleInputChange}
            value={inputs.description}
          ></textarea>
        </div> */}
        <div className="form-group col-6">
          <label>Visibility:</label>
          <select
          className="form-control"
            name="visibility"
            onChange={handleInputChange}
            value={inputs.visibility}
          >
            <option>Select visibility</option>
            <option>PRIVATE</option>
            <option>PUBLIC</option>
          </select>
        </div>
        <button className="btn btn-primary">New Repo</button>
      </form>
    </div>
  );
}

export default CreateNewRepo;
