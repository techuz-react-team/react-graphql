import {gql} from 'apollo-boost';

//Get Git user profile
export const GET_PROFILE = gql`
    query getProfile{
        viewer {
            login
            name
            email
        }
    }
`;

//Get Git repo listing
export const GET_ALL_REPO = gql`
    query getRepositories {
        viewer {
            repositories(first: 50){
                nodes {
                    name
                  }
            }
        }
    }
`;

//Add the new repo
export const ADD_REPO = gql`
    mutation createRepo($name: String!, $visibility: String! ) {
        createRepository(input: { name: $name, visibility: $visibility}) {
        repository {
            name
            }
        }  
    }
   
`;

