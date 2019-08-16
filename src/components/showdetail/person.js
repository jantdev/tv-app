import React from "react";

const Person = props => {
  if (props.person) {
    return (
      <div className="persondetail">
        <h4>{props.person.name}</h4>
        <img src={props.person.image ? props.person.image.original : ""} />
      </div>
    );
  }
};

export default Person;
