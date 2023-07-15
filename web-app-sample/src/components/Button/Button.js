import React from "react";
import "./Button.css";
const Button = (props) => (
  <div
    className={
      props.disable
        ? "disable"
        : props.secondary
        ? "buttonSecondary"
        : "buutonMain"
    }
    onClick={props.onClick}
  >
    {props.name}
  </div>
);

export default Button;
