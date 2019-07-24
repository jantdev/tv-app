import React from "react";

const fillData = show => {
  if (show) {
    return <p>{show.name}</p>;
  }
};
const Main = props => {
  if (props.show) {
    return (
      <div style={props.style}>
        <div className="main">{fillData(props.show.show)}</div>
      </div>
    );
  } else {
    return <p>Nothing</p>;
  }
};
export default Main;
