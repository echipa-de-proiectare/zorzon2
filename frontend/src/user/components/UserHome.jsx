import { useContext } from "react";
import { UserContext } from "../utility/UserContext";

const UserHome = () => {
  const { user } = useContext(UserContext);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="section has-text-centered">
      <h1>Welcome, {user.username}</h1>
      <p>Email: {user.email}</p>
      <p>Provider: {user.provider}</p>
      <p>Created At: {new Date(user.createdAt).toLocaleString()}</p>
      <p>Updated At: {new Date(user.updatedAt).toLocaleString()}</p>
    </div>
  );
};

export default UserHome;
