import React, { Component } from "react";
import { Link } from "react-router-dom";

class TheLink extends Component {
  constructor(props) {
    super(props);
    this.state = { link: "#test" };
  }
  componentDidMount = () => {
    console.log(this);
  };
  render() {
    return <Link to={this.props.link}>test</Link>;
  }
}

export default TheLink;
