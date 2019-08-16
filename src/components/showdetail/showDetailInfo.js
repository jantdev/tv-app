import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";
import Network from "./showNetwork";

class ShowInfo extends Component {
  setGenres = genres => {
    let o = "";
    genres.forEach(g => {
      o += g + ", ";
    });
    return o.substring(0, o.length - 2);
  };
  setImdb = link => {
    if (link.externals.imdb) {
      return (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={"https://www.imdb.com/title/" + link.externals.imdb}
        >
          {link.name}
        </a>
      );
    } else {
      return "";
    }
  };
  setupShowInfo = () => {
    if (this.props.showobj) {
      const info = this.props.showobj[0];
      return (
        <ListGroup>
          <ListGroup.Item>
            <h5>Show info</h5>
          </ListGroup.Item>
          <ListGroup.Item>
            Network: <Network network={info.network} />
          </ListGroup.Item>
          <ListGroup.Item>Status: {info.status}</ListGroup.Item>
          <ListGroup.Item>Genres: {this.setGenres(info.genres)}</ListGroup.Item>
          <ListGroup.Item>Runtime: {info.runtime} </ListGroup.Item>
          <ListGroup.Item>IMDB: {this.setImdb(info)}</ListGroup.Item>
        </ListGroup>
      );
    }
  };
  render() {
    return <div>{this.setupShowInfo()}</div>;
  }
}

export default ShowInfo;
