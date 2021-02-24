import { useMutation } from "@apollo/client";
import React from "react";
import { CREATE_REPO, GET_REPOSITORIES } from "../queries/queries";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const CreateNewRepo = () => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Repository name is required"),
    visibility: Yup.string().required("Visibility is required"),
  });

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(validationSchema),
  });

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

  const handleCreateRepo = (event) => {
    // console.log(typeof inputs.visibility)
    // event.preventDefault();
    createRepo({
      variables: inputs,
      refetchQueries: [{ query: GET_REPOSITORIES }],
    });
    setInputs("");
  };

  // const handleCreateRepo = useCallback((event) => {
  //   event.preventDefault();
  //   createRepo({
  //     variables: inputs,
  //     refetchQueries: [{ query: GET_REPOSITORIES }],
  //   });
  // }, []);

  return (
    <div>
      <form onSubmit={handleSubmit(handleCreateRepo)}>
        <div className="form-group col-6">
          <label>Repository name</label>
          <input
            type="text"
            name="name"
            onChange={handleInputChange}
            value={inputs.name}
            ref={register}
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.name?.message}</div>
        </div>
        <div className="form-group col-6">
          <label>Visibility:</label>
          <select
            name="visibility"
            onChange={handleInputChange}
            value={inputs.visibility}
            ref={register}
            className={`form-control ${errors.visibility ? "is-invalid" : ""}`}
          >
            <option value="">Select visibility</option>
            <option value="PRIVATE">PRIVATE</option>
            <option value="PUBLIC">PUBLIC</option>
          </select>
          <div className="invalid-feedback">{errors.visibility?.message}</div>
        </div>
        <button type="submit" className="btn btn-primary">
          New Repo
        </button>
      </form>
    </div>
  );
};

export default CreateNewRepo;
