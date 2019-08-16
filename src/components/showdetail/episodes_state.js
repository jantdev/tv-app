import React, { Fragment, Component } from "react";
import { Table } from "react-bootstrap";
import Filter from "../../filter/index";
import { withRouter, Link } from "react-router-dom";

let Season = 0;

class Episodes extends Component {
  constructor(props) {
    super(props);
    this.state = { id: null };
  }
  fillData = props => {
    if (props.allepisodes) {
      return props.allepisodes.map(item => {
        if (item.season !== Season) {
          Season = item.season;
          return (
            <Fragment key={item.season}>
              <tr>
                <td colSpan="3">
                  <h4>Season: {Season}</h4>
                </td>
              </tr>
              <tr>
                <th>Episode</th>
                <th>Date</th>
                <th>Name</th>
              </tr>
            </Fragment>
          );
        } else {
          return (
            <tr key={Filter.setId()}>
              <td>
                {Filter.AddZero(item.season)}x{Filter.AddZero(item.number)}
              </td>
              <td>{item.airdate}</td>
              <td>
                <Link to={"/showepisode/" + props.show.id + "+" + item.id}>
                  {item.name}
                </Link>
              </td>
            </tr>
          );
        }
      });
    }
  };
  componentWillUnmount = () => {
    this.setState({
      id: null
    });
  };

  componentDidMount = () => {
    this.setState({
      id: document.location.pathname.replace("/showepisode/", "")
    });
  };

  componentWillUpdate = (preProps, preState, snapshot) => {
    if (this.state.id !== null && preProps.match.params.id !== this.state.id) {
      console.log(preProps);
    }
  };
  render() {
    return (
      <div style={this.props.style}>
        <Table striped bordered hover>
          <tbody>{this.fillData(this.props)}</tbody>
        </Table>
      </div>
    );
  }
}

export default withRouter(Episodes);
