import { gql, useQuery } from "@apollo/client";

const GET_PROFILE = gql`
  query getProfile {
    viewer {
      login
      email
    }
  }
`;

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
