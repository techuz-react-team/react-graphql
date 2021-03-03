import React,{ useMemo } from 'react';
import {GET_ALL_REPO} from '../queries/queries'
import {useQuery} from "@apollo/react-hooks";

const RepoList = () => {
    const {data, loading, error} = useQuery(GET_ALL_REPO);
    const repoList = data?.viewer?.repositories?.nodes;
    
    const renderRepo = useMemo(() => {
        return repoList
      }, [repoList])
    
    if(loading) {
        return <h1>Loading..</h1>
    }
    if(error) {
        return `Error: ${error.message}`
    }
    
    return (
        <div className="mr20px">
            Repo list
            <ul>
            {renderRepo.length > 0 && renderRepo.map((repo,i) => {
                return <li key={i} >{repo.name}</li>
            })}
            </ul>

            {renderRepo.length === 0 && (<h1>No repo found.</h1>)}
        </div>
    );
    
}

export default RepoList;