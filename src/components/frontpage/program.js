import React, { Fragment, Component } from "react";
import { ListGroup, Button } from "react-bootstrap";
import Filter from "../../filter/index";

class Program extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  setTimer = () => {
    const timer = [2000, 2100, 2200, 2300];

    return timer.map((time, index) => {
      return (
        <Fragment key={"time" + index}>
          <ListGroup.Item className="programtime">
            {Filter.returnTimeFormat(time)}
          </ListGroup.Item>
          {this.getList(time)}
        </Fragment>
      );
    });
  };
  selectedNetwork = network => {
    this.props.handleSelectNetwork(network);
  };
  getList = time => {
    if (this.props.shows) {
      return this.props.shows.map((item, index) => {
        if (
          Filter.HourToNum(item.airtime) >= time &&
          Filter.HourToNum(item.airtime) < time + 100
        ) {
          if (item.show.network) {
            return (
              <ListGroup.Item key={"programtime" + index}>
                <div className="cellholder">
                  <div className="timernetwork">
                    {item.airtime}
                    <br />
                    <Button
                      variant="link"
                      className="networklink"
                      onClick={() => {
                        this.selectedNetwork(item.show.network);
                      }}
                    >
                      {" "}
                      {item.show.network.name ? item.show.network.name : ""}
                    </Button>
                  </div>
                  <div className="showepisode">
                    <h4>
                      <a href={"/showdetail/" + item.show.id}>
                        {item.show.name}
                      </a>
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
          }
        } else {
          return null;
        }
      });
    }
  };
  render() {
    return <ListGroup>{this.setTimer()}</ListGroup>;
  }
}

export default Program;
