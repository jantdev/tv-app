import React, { Fragment } from "react";
import { Table } from "react-bootstrap";
import Filter from "../../filter/index";
//import { Link } from "react-router-dom";
let Season = 0;

const fillData = props => {
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
            <td>{item.name}</td>
          </tr>
        );
      }
    });
  }
};

const Episodes = props => {
  return (
    <div style={props.style}>
      <Table striped bordered hover>
        <tbody>{fillData(props)}</tbody>
      </Table>
    </div>
  );
};

export default Episodes;
