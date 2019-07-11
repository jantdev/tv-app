import React from "react";

const Rating = props => {
  return props.rating ? <span>{props.rating}</span> : "";
};

export default Rating;
