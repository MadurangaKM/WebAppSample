import React, { useState } from "react";
import "./Login.css";
import { Title, TextInput, Button } from "../../components";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleSignUp = () => {
    if (userId === "" || password === "" || confirmPassword === "") {
      setError("Plesse fill all fileds");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    const userData = {
      userId,
      password,
    };
    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("logout", false);
    window.location.href = "/";
    setIsRegister(false);
  };
  const handleLogin = () => {
    const storedUserData = localStorage.getItem("userData");
    if (userId === "" || password === "") {
      setError("Plesse fill all fileds");
      return;
    }
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      if (userData.userId === userId && userData.password === password) {
        if (keepLoggedIn) {
          const expirationDate = new Date();
          expirationDate.setFullYear(expirationDate.getFullYear() + 1);
          document.cookie = `keepLoggedIn=true; expires=${expirationDate.toUTCString()}`;
          return navigate("/contacts");
        }
        localStorage.setItem("logout", false);
        return navigate("/contacts");
      } else {
        setError("Invalid credentials");
      }
    } else {
      setError("No account found, Please Sign Up");
    }
  };
  return (
    <>
      <div className="mainLogin">
        <Title titleSubOne="Welcome to" titleSubTwo="myApp" />
        <div className="loginInner">
          <div className="loginTextInputContainer">
            <div id="inputHelperText">User ID*</div>
            <TextInput
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>
          <div className="loginTextInputContainer">
            <div id="inputHelperText"> Password*</div>
            <TextInput
              isPasswordComponent
              showPassword={showPassword}
              type={showPassword ? "text" : "password"}
              value={password}
              passwordOnclic={() => {
                setShowPassword(!showPassword);
              }}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {isRegister && (
            <div className="loginTextInputContainer">
              <div id="inputHelperText"> Confirm Password*</div>
              <TextInput
                isPasswordComponent
                showPassword={showPassword}
                type={showPassword ? "text" : "password"}
                passwordOnclic={() => {
                  setShowPassword(!showPassword);
                }}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          )}
          {!isRegister && (
            <div className="loginCheckBoxContaine">
              <TextInput
                type="checkbox"
                checked={keepLoggedIn}
                onChange={(e) => setKeepLoggedIn(e.target.checked)}
              />
              <span style={{ marginTop: "-7px" }}>Keep me logged in</span>
            </div>
          )}
          {isRegister ? (
            <div className="loginButton">
              <Button name="Sign Up" onClick={handleSignUp} />
            </div>
          ) : (
            <div className="loginButton">
              <Button name="Login" onClick={handleLogin} />
            </div>
          )}
        </div>
        {!isRegister && (
          <div className="loginRegister">
            No account?{" "}
            <span
              className="loginRegisterBtn"
              onClick={() => {
                setIsRegister(true);
                setConfirmPassword("");
                setPassword("");
                setUserId("");
                setError("");
              }}
            >
              Register here.
            </span>
          </div>
        )}
        {isRegister && (
          <div className="loginRegister">
            Has account?{" "}
            <span
              className="loginRegisterBtn"
              onClick={() => {
                setIsRegister(false);
                setConfirmPassword("");
                setPassword("");
                setUserId("");
                setError("");
              }}
            >
              Login here.
            </span>
          </div>
        )}
        <div
          className="error"
          style={{ display: error !== "" ? "flex" : "none" }}
        >
          {error}
        </div>
      </div>
    </>
  );
};

export default Login;
