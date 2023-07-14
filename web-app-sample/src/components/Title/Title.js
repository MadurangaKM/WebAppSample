import React from "react";
import "./Title.css";

const Title = (props) => (
  <div className={props.innerTitle ? "mainTitle2" : "mainTitle"}>
    <span className="subOne">{props.titleSubOne}</span>
    <span className="subTwo">{props.titleSubTwo}</span>
    {props.innerTitle && <div className="titleBlackLine"></div>}
    {props.isButton && (
      <span className="title-button" onClick={props.onClick}>
        <i class="gg-pen"></i>
        <span className="title-btn-text">Edit Profile</span>
      </span>
    )}
    {props.isBack && (
      <span className="title-back-btn" onClick={props.onClick}>
        {"< Back"}
      </span>
    )}
  </div>
);

export default Title;
