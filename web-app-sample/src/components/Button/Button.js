import React from "react";
import "./Button.css";
const Button = (props) => (
  <div className="buutonMain" onClick={props.onClick}>
    {props.name}
  </div>
);

export default Button;
