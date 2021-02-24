import { useQuery } from "@apollo/client";
import {GET_PROFILE} from '../queries/queries';

const Profile = () => {
  const { loading, error, data } = useQuery(GET_PROFILE);

  if (loading) {
    return "Loading...";
  }
  if (error) {
    return `Error! ${error.message}`;
  }
  return (
    <div className="topnav">
      <div className="search-container">
        <p>Username: {data?.viewer?.login}  || Email: {data?.viewer?.email}</p>
      </div>
    </div>
  );
};
export default Profile;
