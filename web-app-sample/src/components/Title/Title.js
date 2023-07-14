import React from "react";
import "./Title.css";

const Title = (props) => (
  <div className="mainTitle">
    <span className="subOne">{props.titleSubOne}</span>
    <span className="subTwo">{props.titleSubTwo}</span>
  </div>
);

export default Title;
