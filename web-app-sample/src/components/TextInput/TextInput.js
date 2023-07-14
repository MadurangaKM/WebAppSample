import React from "react";
import "./TextInput.css";
const TextInput = (props) => (
  <div className="textInputMain">
    <input
      type={props.type}
      className="textInput"
      value={props.value}
      onChange={props.onChange}
      checked={props.checked}
    />
  </div>
);

export default TextInput;
