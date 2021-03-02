import React, { useState, useEffect  } from 'react';
import { useMutation } from "@apollo/client";

import { Link } from 'react-router-dom'
import { ADD_REPO,GET_ALL_REPO } from "../queries/queries";

const AddRepo = () => {
    let initialValues={name:"", visibility:""}

    const [input, setInput] = useState(initialValues) //Set input
    const [formErrors, setFormErrors] = useState({}); //Set form error variable
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [addRepo, { data, loading, error }] = useMutation(ADD_REPO,{
        refetchQueries:[{query:GET_ALL_REPO}]
    }); //Define Mutation to call API
    
    //Handle input change event
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    };

    const submit = () =>{
        addRepo({ variables: input }); // API call from here
        setInput(initialValues) // Reset form
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(input)); // Validate form
        setIsSubmitting(true);
    } 


    //form validation handler
    const validate = (values) => {
        let errors = {};
        
        if (!values.name) {
        errors.name = "Name cannot be blank";
        } 

        if (!values.visibility) {
            errors.visibility = "Please select visibility";
        } 
        return errors;
    };

    //Handle with the form correction
    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmitting) {
          submit();
        }
      }, [formErrors,isSubmitting]);

    return (
        <div>
            
            <section>
            <h3 className="mr20px" >Add new repo</h3>
            {loading && (<span className="loading-msg">Loading...</span>)}

            {error && (<span className="error-msg">Something went wrong!.</span>)}

            {Object.keys(formErrors).length === 0 && data && isSubmitting && (
                <span className="success-msg">Repo Created Successfully</span>
            )}
            <Link className="btn btn-success float-right mr20px" to="/">Back To List</Link>
            </section>

            <section>
            <form className="mr20px col-md-6" noValidate onSubmit={handleSubmit}>
            <div className="form-group ">
                <label >Name</label>
                <input type="text" 
                className={formErrors.name ? "input-error form-control " : 'form-control '}
                onChange={handleChange} 
                name="name" 
                value={input.name}  
                placeholder="Enter Name" />

            {formErrors.name && (
                <span className="error">{formErrors.name}</span>
            )}
            </div>

            <div className="form-group">
                <label>Visibility:</label>
                <select
                    name="visibility"
                    className={formErrors.visibility ? "input-error form-control " : 'form-control '}
                    value={input.visibility}
                    onChange={handleChange}
                   
                >
                    <option value="">Select visibility</option>
                    <option value="PRIVATE">PRIVATE</option>
                    <option value="PUBLIC">PUBLIC</option>
                </select>
                {formErrors.visibility && (
                <span className="error">{formErrors.visibility}</span>
                    )}
                </div>

            <button type="submit" className="btn btn-primary">Add</button>
            </form>
            </section>
        </div>
    );
}


export default AddRepo;