import React from "react";
import "./TextInput.css";
const TextInput = (props) => (
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
    <div className="input-error">{props.error}</div>
  </div>
);

export default TextInput;
