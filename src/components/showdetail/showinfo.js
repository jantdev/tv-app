import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";
class ShowInfo extends Component {
  state = {
    show: this.props.showobj
  };

  setupShowInfo = () => {
    if (this.state.show) {
      const info = this.state.show;
      return (
        <ListGroup>
          <ListGroup.Item>
            <h5>Episode info</h5>
          </ListGroup.Item>
          <ListGroup.Item>Show: {info.show.name}</ListGroup.Item>
          <ListGroup.Item>
            Airdate: {info.airdate} {info.airtime}
          </ListGroup.Item>
          <ListGroup.Item>Runtime: {info.runtime} </ListGroup.Item>
        </ListGroup>
      );
    }
  };
  render() {
    return <div>{this.setupShowInfo()}</div>;
  }
}

export default ShowInfo;
