import React, { Fragment } from "react";
import { ListGroup } from "react-bootstrap";
import Filter from "../../filter/index";
import NetworkLink from "../network/networklink";

const timer = [2000, 2100, 2200, 2300];

const setTimer = props => {
  return timer.map((time, index) => {
    return (
      <Fragment key={"time" + index}>
        <ListGroup.Item className="programtime">
          {Filter.returnTimeFormat(time)}
        </ListGroup.Item>
        {getList(props, time)}
      </Fragment>
    );
  });
};
const selectedNetwork = network => {
  console.log(network);
};

const getList = (props, time) => {
  if (props.shows) {
    return props.shows.map((item, index) => {
      if (
        Filter.HourToNum(item.airtime) >= time &&
        Filter.HourToNum(item.airtime) < time + 100
      ) {
        return (
          <ListGroup.Item key={"programtime" + index}>
            <div className="cellholder">
              <div className="timernetwork">
                {item.airtime}
                <br />
                <NetworkLink
                  network={item.show.network}
                  handleNetwork={selectedNetwork}
                />
              </div>
              <div className="showepisode">
                <h4>
                  <a href={"/showdetail/" + item.show.id}>{item.show.name}</a>
                </h4>
                <p>
                  <a href={"/showepisode/" + item.show.id + "+" + item.id}>
                    {item.name}
                  </a>
                </p>
              </div>
            </div>
          </ListGroup.Item>
        );
      } else {
        return null;
      }
    });
  }
};

const Program = props => {
  return <ListGroup>{setTimer(props)}</ListGroup>;
};

export default Program;
