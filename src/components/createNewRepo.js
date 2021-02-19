import { useMutation } from "@apollo/client";
import React from "react";
import { CREATE_REPO, GET_REPOSITORIES } from '../queries/queries'

const CreateNewRepo = () => {
  const [inputs, setInputs] = React.useState({ name: "", visibility: "" });

  const [createRepo, { loading, error }] = useMutation(CREATE_REPO, {
    onCompleted: (data) => alert("Repo Created Successfully", data),
    onError: (error) => console.error("Error creating a post", error),
  });

  if (loading) {
    return "Loading...";
  }
  if (error) {
    return `Error! ${error.message}`;
  }

  const handleInputChange = (event) => {
    event.persist();
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };

  function handleCreateRepo(event) {
    event.preventDefault();
    createRepo({
      variables: {
        name: inputs.name,
        // description: inputs.description,
        visibility: inputs.visibility,
      },
      refetchQueries: [{ query: GET_REPOSITORIES }],
    });
    setInputs('')
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
            value={inputs.name}
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
        </div>*/}
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
