import React from 'react';
import { useMutation } from "@apollo/client";
import { Link } from 'react-router-dom'
import { ADD_REPO,GET_ALL_REPO } from "../queries/queries";
import { useFormik } from "formik";
import * as Yup from "yup";

const AddRepo = () => {
    const [addRepo, { data, loading, error }] = useMutation(ADD_REPO,{
        refetchQueries:[{query:GET_ALL_REPO}]
    }); //Define Mutation to call API
    
    const formik = useFormik({
        initialValues: {
          name: "",
          visibility: "",
        },
        validationSchema: Yup.object({
            name: Yup.string()
              .min(2, "Mininum 2 characters")
              .max(200, "Maximum 200 characters")
              .required("Please enter name!"),
            visibility: Yup.string()
              .required("Please select visibility!"),
          }),
          onSubmit: (values, {resetForm}) => {
            //alert(JSON.stringify(values, null, 2));
            addRepo({ variables: values }); // API call from here 
            resetForm(); 
          }
      });

    return (
        <div>
            
            <section>
            <h3 className="mr20px" >Add new repo</h3>
            {loading && (<span className="loading-msg">Loading...</span>)}

            {error && (<span className="error-msg">Something went wrong!.</span>)}

            { data  && (
                <span className="success-msg">Repo Created Successfully</span>
            )}
            
            <Link className="btn btn-success float-right mr20px" to="/">Back To List</Link>
            </section>

            <section>
            <form className="mr20px col-md-6" onSubmit={formik.handleSubmit}>
            <div className="form-group ">
                <label >Name</label>
                <input 
                type="text" 
                name="name"
                className={`form-control ${formik.errors.name && formik.touched.name ? 'input-error': ' '}`}
                value={formik.values.name} 
                onChange={formik.handleChange} 
                placeholder="Enter Name" />
            
            {formik.errors.name && formik.touched.name && (
                <span className="error">{formik.errors.name}</span>
            )}
            
            </div>

            <div className="form-group">
                <label>Visibility:</label>
                <select
                    className={`form-control ${formik.errors.visibility && formik.touched.visibility ? 'input-error': ' '}`}
                    name="visibility"
                    value={formik.values.visibility}
                    onChange={formik.handleChange} 
                >
                    <option value="">Select visibility</option>
                    <option value="PRIVATE">PRIVATE</option>
                    <option value="PUBLIC">PUBLIC</option>
                </select>
                {formik.errors.visibility && formik.touched.visibility && (
                    <span className="error">{formik.errors.visibility}</span>
                )}
                </div>

            <button type="submit" className="btn btn-primary">Add</button>
            </form>
            </section>
        </div>
    );
}


export default AddRepo;