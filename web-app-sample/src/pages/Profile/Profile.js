import React from "react";
import { useNavigate } from "react-router-dom";
import { Title } from "../../components";
import "./Profile.css";
const Profile = (props) => {
  const navigate = useNavigate();
  return (
    <div className="profile-main">
      <div className="profile-header">
        <Title
          titleSubOne="My"
          titleSubTwo="Profile"
          innerTitle
          isButton
          onClick={() => {
            navigate("/edit-profile");
          }}
        />
      </div>
    </div>
  );
};

export default Profile;
