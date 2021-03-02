import React from 'react';
import { Link } from 'react-router-dom'
import {useQuery} from "@apollo/react-hooks";
import {GET_PROFILE} from '../queries/queries'
const Header = () => {
    const {data, loading, error} = useQuery(GET_PROFILE); // Get profile data by calling API
        if(error) {
            return `Error! ${error.message}`;
        }
        if(loading) {
            return `Loading...`;
        }
    
    if(data) {
        return(
            <div>
                <nav>
                <section>
                    <h4 className="center">React Graphql demo</h4>
    
                    <div className="navContent">
                    <div className="navLinks">
                    <div className="navbar">
                        <span className="float-left white mr20px" >Username : {data.viewer.login}</span>
                        <span className="float-left white mr20px" >Email : {data.viewer.email}</span>
                        
                        <Link className="btn btn-success float-right mr20px" to="/add-repo">Create Repo</Link>
                        
                    </div>
                    </div>
                    </div>
                </section>
                </nav>
            </div>
        )
    }
    
}

export default Header;