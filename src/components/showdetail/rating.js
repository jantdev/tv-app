import React from "react";

const Rating = props => {
  return props.rating ? <span className="rating">{props.rating}</span> : "";
};

export default Rating;
