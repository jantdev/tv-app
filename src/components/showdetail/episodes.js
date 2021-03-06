import React, { Fragment } from "react";
import { Table } from "react-bootstrap";
import Filter from "../../filter/index";

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
            <td>
              <a href={"/showepisode/" + props.show.id + "+" + item.id}>
                {item.name}
              </a>
            </td>
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
      <a href="#top" className="toTopOfPageLink">
        Back to top of page
      </a>
    </div>
  );
};

export default Episodes;
