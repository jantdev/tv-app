import React from "react";
import Api from "../../api/api";
const Networks = props => {
  // Network: {this.setNetwork(info.network)}

  if (props.network) {
    let flag = Api.imgFlagUrl;
    return (
      <span className="network">
        <img
          src={flag.replace(
            "|country|",
            String(props.network.country.code).toLowerCase()
          )}
          alt={props.network.country.name}
        />{" "}
        {props.network.name}
      </span>
    );
  } else {
    return <span className="network" />;
  }
};

export default Networks;
