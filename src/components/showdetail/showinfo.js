import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
class ShowInfo extends Component {
  setupShowInfo = () => {
    if (this.props.showobj) {
      const info = this.props.showobj[0];
      return (
        <ListGroup>
          <ListGroup.Item>
            <h5>Episode info</h5>
          </ListGroup.Item>
          <ListGroup.Item>
            Show: <Link to={`/showdetail/${info.id}`}>{info.name}</Link>
          </ListGroup.Item>
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
