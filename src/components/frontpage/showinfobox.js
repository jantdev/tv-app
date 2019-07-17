import React from "react";

const ShowInfoBox = props => {
  return (
    <div className="showInfoBox showInfoBoxLeft">
      <h3>{props.show.show.name}</h3>
      <h4>Episode: {props.show.name}</h4>
      <p>{props.show.summery}</p>
    </div>
  );
};

export default ShowInfoBox;
