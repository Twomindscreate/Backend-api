import React from "react";
import Container from "react-bootstrap/Container";
import useProfile from "../hooks/useProfile";

const Profile = () => {
  const { profile, loading, error } = useProfile();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Container>
      {profile ? (
        <div>
          <h1>
            Hello <span>{profile.username}...!</span>
          </h1>
          <p>Welcome to your profile</p>
        </div>
      ) : (
        <div>
          <h1>Welcome!</h1>
          <p>Please log in to view your profile.</p>
        </div>
      )}
    </Container>
  );
};

export default Profile;
