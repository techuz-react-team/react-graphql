import React from 'react';
import {GET_ALL_REPO} from '../queries/queries'
import {useQuery} from "@apollo/react-hooks";

const RepoList = () => {
    const {data, loading, error} = useQuery(GET_ALL_REPO);
    const repoList = data?.viewer?.repositories.nodes;
    
    const renderRepo = React.useMemo(() => {
        return repoList
      }, [repoList])

    if(loading) {
        return <h1>Loading..</h1>
    }
    if(error) {
        return `Error: ${error.message}`
    }
    if(renderRepo.length > 0) {
        return (
            <div className="mr20px">
                Repo list
                <ul>
                {renderRepo.map((repo,i) => {
                   return <li key={i} >{repo.name}</li>
                })}
                   
                </ul>
            </div>
        );
    } else {
        return <h1>No repo found.</h1>
    }
   
    
}

export default RepoList;