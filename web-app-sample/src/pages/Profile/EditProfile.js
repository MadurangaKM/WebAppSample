import React from "react";
import { useNavigate } from "react-router-dom";
import { Title } from "../../components";
import "./Profile.css";
const EditProfile = (props) => {
  const navigate = useNavigate();
  return (
    <div className="profile-main">
      <div className="profile-header">
        <Title
          titleSubOne="Edit"
          titleSubTwo="Profile"
          innerTitle
          isBack
          onClick={() => {
            navigate("/profile");
          }}
        />
      </div>
    </div>
  );
};

export default EditProfile;
