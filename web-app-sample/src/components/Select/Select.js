import React from "react";
import "./Select.css";
const Select = (props) => (
  <div className="filter-container">
    <select
      className="select-component"
      value={props.value}
      onChange={props.onChange}
      name={props.name}
    >
      {props.data.map((e) => {
        return <option value={e.value}>{e.name}</option>;
      })}
    </select>
    <div className="filter-arrow"></div>
  </div>
);

export default Select;
