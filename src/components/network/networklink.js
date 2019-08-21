import React from "react";
import Api from "../../api/api";
import { Link } from "react-router-dom";

const Links = props => {
  if (props.id && props.name) {
    return <Link to={`/network/${props.id}`}>{props.name}</Link>;
  } else {
    return null;
  }
};

const Networks = props => {
  const net = props.network;

  if (net) {
    let flag = Api.imgFlagUrl;
    return (
      <span className="network">
        <img
          src={flag.replace(
            "|country|",
            String(net.country.code).toLowerCase()
          )}
          alt={net.country.name}
        />{" "}
        {Links(net)}
      </span>
    );
  } else {
    return <span className="network" />;
  }
};

export default Networks;
