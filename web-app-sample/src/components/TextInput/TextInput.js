import React from "react";
import "./TextInput.css";
const TextInput = (props) => {
  console.log("check here", props.isPasswordComponent);
  return (
    <div className="textInputMain">
      <input
        style={{
          marginLeft: props.margin ? "-10px" : 0,
          width: props.margin ? "99.5%" : "unset",
          borderColor: props.error ? "red" : "",
        }}
        type={props.type}
        className="textInput"
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        checked={props.checked}
      />
      {props.isPasswordComponent && (
        <i
          className={`fa ${props.showPassword ? "fa-eye-slash" : "fa-eye"}`}
          style={{ marginLeft: "-34px", cursor: "pointer" }}
          onClick={props.passwordOnclic}
        />
      )}

      <div className="input-error">{props.error}</div>
    </div>
  );
};

export default TextInput;
