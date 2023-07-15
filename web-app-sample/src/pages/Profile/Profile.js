import React, { useState, useEffect } from "react";
import { Title } from "../../components";
import "./Profile.css";
import ProfileImg from "../../assets/user.png";
import { useLocation } from "react-router-dom";
import Defs from "../../config/Defs";
import { Select, TextInput, Button } from "../../components";
import Helper from "../../config/Helper";
const Profile = (props) => {
  const [activeTab, setActiveTab] = useState("basic");
  const [isProfileEdit, setProfileEdit] = useState(props.isEdit);
  const storedUserData = JSON.parse(localStorage.getItem("profileData"));
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/edit-profile") {
      if (storedUserData) {
        setProfileData(storedUserData);
      }
      setProfileEdit(true);
    }
    if (location.pathname === "/profile") {
      setProfileEdit(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);
  const [profileData, setProfileData] = useState({
    salutation: 1,
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    homeAddress: "",
    country: 1,
    postCode: "",
    nationality: 1,
    dob: "",
    gender: 1,
    maritialStatus: 1,
    salutationMari: 1,
    firstNameSalu: "",
    lastNameSalu: "",
    hobbies: "",
    sports: "",
    music: "",
    movie: "",
  });
  const [profileDataError, setProfileDataError] = useState({
    firstName: false,
    lastName: false,
    email: false,
    mobileNumber: false,
    homeAddress: false,
    postCode: false,
    nationality: false,
  });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const hanleUpdate = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: Number(e.target.value),
    });
  };
  const getNameFromValue = (array, value) => {
    const item = array.find((item) => item.value === Number(value));
    return item ? item.name : "";
  };
  const handleCancel = () => {
    const { salutation, gender, maritialStatus, country, nationality } =
      profileData;
    setProfileDataError((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      Object.keys(updatedErrors).forEach((key) => {
        updatedErrors[key] = false;
      });
      return updatedErrors;
    });
    const resetData = Object.keys(profileData).reduce(
      (acc, key) => {
        if (
          key !== "salutation" &&
          key !== "gender" &&
          key !== "maritialStatus" &&
          key !== "country" &&
          key !== "nationality"
        ) {
          acc[key] = "";
        }
        return acc;
      },
      { salutation, gender, maritialStatus, country, nationality }
    );
    setProfileData(resetData);
    setProfileEdit(false);
  };
  const handleSave = () => {
    const isEmpty = Helper.errorEmptyChecker(profileData, [
      "salutation",
      "gender",
      "maritialStatus",
      "country",
      "nationality",
      "dob",
      "gender",
      "salutationMari",
      "firstNameSalu",
      "lastNameSalu",
      "hobbies",
      "sports",
      "music",
      "movie",
    ]);
    if (
      isEmpty.length !== 0 ||
      Object.values(profileDataError).includes(true)
    ) {
      setProfileDataError((prevData) => {
        const updatedData = { ...prevData };
        isEmpty.forEach((name) => {
          updatedData[name] = true;
        });
        return updatedData;
      });
      return;
    }
    localStorage.setItem("profileData", JSON.stringify(profileData));
    setProfileEdit(false);
  };
  console.log(
    "check data",
    getNameFromValue(Defs.countries, storedUserData.country)
  );
  const renderBasicDetails = () => {
    return (
      <div className="profile-main-tab-content">
        <div className="profile-img">
          <img src={ProfileImg} alt="profile" style={{ width: "120px" }} />
        </div>
        <div className="profile-content">
          <span style={{ fontWeight: 600, marginTop: 20 }}>Salutation*</span>
          {isProfileEdit ? (
            <Select
              value={profileData.salutation}
              data={Defs.salutation}
              onChange={hanleUpdate}
              name="salutation"
            />
          ) : (
            <span>
              {getNameFromValue(Defs.salutation, storedUserData.salutation)}
            </span>
          )}

          <span style={{ fontWeight: 600, marginTop: 20 }}>First Name*</span>
          {isProfileEdit ? (
            <TextInput
              type="text"
              name="firstName"
              margin
              error={profileDataError.firstName ? "First name is required" : ""}
              value={profileData.firstName}
              onChange={(e) => {
                setProfileData({
                  ...profileData,
                  [e.target.name]: e.target.value,
                });
                setProfileDataError({
                  ...profileDataError,
                  [e.target.name]: e.target.value === "" ? true : false,
                });
              }}
            />
          ) : (
            <span>{storedUserData.firstName}</span>
          )}

          <span style={{ fontWeight: 600, marginTop: 20 }}>Last Name*</span>
          {isProfileEdit ? (
            <TextInput
              type="text"
              name="lastName"
              error={profileDataError.lastName ? "Last name is required" : ""}
              margin
              value={profileData.lastName}
              onChange={(e) => {
                setProfileData({
                  ...profileData,
                  [e.target.name]: e.target.value,
                });
                setProfileDataError({
                  ...profileDataError,
                  [e.target.name]: e.target.value === "" ? true : false,
                });
              }}
            />
          ) : (
            <span>{storedUserData.lastName}</span>
          )}
          <span style={{ fontWeight: 600, marginTop: 20 }}>Email Address*</span>
          {isProfileEdit ? (
            <TextInput
              type="email"
              name="email"
              error={profileDataError.email ? "Valid email is required" : ""}
              margin
              value={profileData.email}
              onChange={(e) => {
                setProfileData({
                  ...profileData,
                  [e.target.name]: e.target.value,
                });
                setProfileDataError({
                  ...profileDataError,
                  [e.target.name]: !Helper.validateEmail(e.target.value)
                    ? true
                    : false,
                });
              }}
            />
          ) : (
            <span>{storedUserData.email}</span>
          )}
          {isProfileEdit && (
            <div className="profile-button-group">
              <Button
                name="Save"
                onClick={handleSave}
                disable={
                  !Object.values(profileDataError).every(
                    (value) => value === false
                  )
                }
              />{" "}
              <Button name="Cancel" secondary onClick={handleCancel} />{" "}
            </div>
          )}
          {isProfileEdit && <div className="mandotory">*Mandatory field</div>}
        </div>
      </div>
    );
  };

  const renderAdditionalDetails = () => {
    return (
      <div className="profile-main-tab-content">
        <div className="profile-content">
          <span style={{ fontWeight: 600, marginTop: 20 }}>Mobile number*</span>
          {isProfileEdit ? (
            <TextInput
              type="text"
              name="mobileNumber"
              margin
              error={
                profileDataError.mobileNumber
                  ? "Valid singapore mobile number is required"
                  : ""
              }
              value={profileData.mobileNumber}
              onChange={(e) => {
                setProfileData({
                  ...profileData,
                  [e.target.name]: e.target.value,
                });
                setProfileDataError({
                  ...profileDataError,
                  [e.target.name]: !Helper.validateSingaporeMobileNumber(
                    e.target.value
                  )
                    ? true
                    : false,
                });
              }}
            />
          ) : (
            <span>{storedUserData.mobileNumber}</span>
          )}
          <span style={{ fontWeight: 600, marginTop: 20 }}>Home address*</span>
          {isProfileEdit ? (
            <TextInput
              type="text"
              name="homeAddress"
              margin
              error={
                profileDataError.homeAddress ? "Home address is required" : ""
              }
              value={profileData.homeAddress}
              onChange={(e) => {
                setProfileData({
                  ...profileData,
                  [e.target.name]: e.target.value,
                });
                setProfileDataError({
                  ...profileDataError,
                  [e.target.name]:
                    e.target.value === "" ? true : false ? true : false,
                });
              }}
            />
          ) : (
            <span>{storedUserData.homeAddress}</span>
          )}
          <span style={{ fontWeight: 600, marginTop: 20 }}>Country*</span>
          {isProfileEdit ? (
            <Select
              value={profileData.country}
              data={Defs.countries}
              onChange={hanleUpdate}
              name="country"
            />
          ) : (
            <span>
              {getNameFromValue(Defs.countries, storedUserData.country)}
            </span>
          )}
          <span style={{ fontWeight: 600, marginTop: 20 }}>Postal Code*</span>
          {isProfileEdit ? (
            <TextInput
              type="text"
              name="postCode"
              margin
              error={
                profileDataError.postCode ? "Valid postal code is required" : ""
              }
              value={profileData.postCode}
              onChange={(e) => {
                setProfileData({
                  ...profileData,
                  [e.target.name]: e.target.value,
                });
                setProfileDataError({
                  ...profileDataError,
                  [e.target.name]: !Helper.validatePostalCode(e.target.value),
                });
              }}
            />
          ) : (
            <span>{storedUserData.postCode}</span>
          )}
          <span style={{ fontWeight: 600, marginTop: 20 }}>Nationality*</span>
          {isProfileEdit ? (
            <Select
              value={profileData.nationality}
              data={Defs.nationalities}
              onChange={hanleUpdate}
              name="nationality"
            />
          ) : (
            <span>
              {getNameFromValue(Defs.nationalities, storedUserData.nationality)}
            </span>
          )}
          <span style={{ fontWeight: 600, marginTop: 20 }}>Date of birth</span>
          {isProfileEdit ? (
            <TextInput
              type="text"
              name="dob"
              margin
              error={
                profileDataError.dob
                  ? "Valid date of birth is required (Eg: YYYY/MM/DD)"
                  : ""
              }
              value={profileData.dob}
              onChange={(e) => {
                setProfileData({
                  ...profileData,
                  [e.target.name]: e.target.value,
                });
                setProfileDataError({
                  ...profileDataError,
                  [e.target.name]: !Helper.validateBirthday(e.target.value)
                    ? true
                    : false,
                });
              }}
            />
          ) : (
            <span>{storedUserData.dob}</span>
          )}
          <span style={{ fontWeight: 600, marginTop: 20 }}>Gender</span>
          {isProfileEdit ? (
            <Select
              value={profileData.gender}
              data={Defs.gender}
              onChange={hanleUpdate}
              name="gender"
            />
          ) : (
            <span>{getNameFromValue(Defs.gender, storedUserData.gender)}</span>
          )}
          <span style={{ fontWeight: 600, marginTop: 20 }}>
            Maritial Status
          </span>
          {isProfileEdit ? (
            <Select
              value={profileData.maritialStatus}
              data={Defs.maritial}
              onChange={hanleUpdate}
              name="maritialStatus"
            />
          ) : (
            <span>
              {getNameFromValue(Defs.maritial, storedUserData.maritialStatus)}
            </span>
          )}
        </div>
      </div>
    );
  };

  const renderSpouseDetails = () => {
    return (
      <div className="profile-main-tab-content">
        <div className="profile-content">
          <span style={{ fontWeight: 600, marginTop: 20 }}>Salutation</span>
          {isProfileEdit ? (
            <Select
              value={profileData.salutationMari}
              data={Defs.salutation}
              onChange={hanleUpdate}
              name="salutationMari"
            />
          ) : (
            <span>
              {getNameFromValue(Defs.salutation, storedUserData.salutationMari)}
            </span>
          )}
          <span style={{ fontWeight: 600, marginTop: 20 }}>First name</span>
          {isProfileEdit ? (
            <TextInput
              type="text"
              name="firstNameSalu"
              margin
              value={profileData.firstNameSalu}
              onChange={(e) => {
                setProfileData({
                  ...profileData,
                  [e.target.name]: e.target.value,
                });
              }}
            />
          ) : (
            <span>{storedUserData.firstNameSalu}</span>
          )}
          <span style={{ fontWeight: 600, marginTop: 20 }}>Last name</span>
          {isProfileEdit ? (
            <TextInput
              type="text"
              name="lastNameSalu"
              margin
              value={profileData.lastNameSalu}
              onChange={(e) => {
                setProfileData({
                  ...profileData,
                  [e.target.name]: e.target.value,
                });
              }}
            />
          ) : (
            <span>{storedUserData.lastNameSalu}</span>
          )}
        </div>
      </div>
    );
  };

  const renderPersonalPreferences = () => {
    return (
      <div className="profile-main-tab-content">
        <div className="profile-content">
          <span style={{ fontWeight: 600, marginTop: 20 }}>
            Hobbies and interests
          </span>
          {isProfileEdit ? (
            <TextInput
              type="text"
              name="hobbies"
              margin
              value={profileData.hobbies}
              onChange={(e) => {
                setProfileData({
                  ...profileData,
                  [e.target.name]: e.target.value,
                });
              }}
            />
          ) : (
            <span>{storedUserData.hobbies}</span>
          )}
          <span style={{ fontWeight: 600, marginTop: 20 }}>
            Favorite sports
          </span>
          {isProfileEdit ? (
            <TextInput
              type="text"
              name="sports"
              margin
              value={profileData.sports}
              onChange={(e) => {
                setProfileData({
                  ...profileData,
                  [e.target.name]: e.target.value,
                });
              }}
            />
          ) : (
            <span>{storedUserData.sports}</span>
          )}
          <span style={{ fontWeight: 600, marginTop: 20 }}>
            Preferred music genres
          </span>
          {isProfileEdit ? (
            <TextInput
              type="text"
              name="music"
              margin
              value={profileData.music}
              onChange={(e) => {
                setProfileData({
                  ...profileData,
                  [e.target.name]: e.target.value,
                });
              }}
            />
          ) : (
            <span>{storedUserData.music}</span>
          )}
          <span style={{ fontWeight: 600, marginTop: 20 }}>
            Preferred movie/TV shows
          </span>
          {isProfileEdit ? (
            <TextInput
              type="text"
              name="movie"
              margin
              value={profileData.movie}
              onChange={(e) => {
                setProfileData({
                  ...profileData,
                  [e.target.name]: e.target.value,
                });
              }}
            />
          ) : (
            <span>{storedUserData.movie}</span>
          )}
        </div>
      </div>
    );
  };
  return (
    <div className="profile-main">
      <div className="profile-header">
        <Title
          titleSubOne={isProfileEdit ? "Edit" : "My"}
          titleSubTwo="Profile"
          innerTitle
          isButton={!isProfileEdit}
          isBack={isProfileEdit}
          onClick={() => {
            setProfileEdit(!isProfileEdit);
            if (isProfileEdit === false) {
              setProfileData(storedUserData);
              setProfileDataError((prevErrors) => {
                const updatedErrors = { ...prevErrors };
                Object.keys(updatedErrors).forEach((key) => {
                  updatedErrors[key] = false;
                });
                return updatedErrors;
              });
            }
          }}
        />
      </div>
      <div className="profile-tab-container">
        <div className="tabs">
          <button
            className={`tab ${activeTab === "basic" ? "active" : ""}`}
            onClick={() => handleTabChange("basic")}
          >
            Basic Details
          </button>
          <button
            className={`tab ${activeTab === "additional" ? "active" : ""}`}
            onClick={() => handleTabChange("additional")}
          >
            Additional Details
          </button>
          {storedUserData.maritialStatus === 2 && (
            <button
              className={`tab ${activeTab === "spouse" ? "active" : ""}`}
              onClick={() => handleTabChange("spouse")}
            >
              Spouse Details
            </button>
          )}
          <button
            className={`tab ${activeTab === "preferences" ? "active" : ""}`}
            onClick={() => handleTabChange("preferences")}
          >
            Personal Preferences
          </button>
        </div>
        <div className="tab-content">
          {activeTab === "basic" && renderBasicDetails()}
          {activeTab === "additional" && renderAdditionalDetails()}
          {activeTab === "spouse" &&
            storedUserData.maritialStatus === 2 &&
            renderSpouseDetails()}
          {activeTab === "preferences" && renderPersonalPreferences()}
          {isProfileEdit && activeTab !== "basic" && (
            <div className="profile-button-group">
              <Button
                name="Save"
                onClick={handleSave}
                disable={
                  !Object.values(profileDataError).every(
                    (value) => value === false
                  )
                }
              />{" "}
              <Button name="Cancel" secondary onClick={handleCancel} />{" "}
            </div>
          )}
          {isProfileEdit && activeTab !== "basic" && (
            <div className="mandotory">*Mandatory field</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
