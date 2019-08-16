import React, { Component } from "react";

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  tty = () => {
    return <div>world</div>;
  };
  render() {
    return (
      <div>
        <div>hello</div>
        {this.tty()}
      </div>
    );
  }
}

export default Navigation;
