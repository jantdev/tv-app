import React, { Component } from "react";
import Api from "../../api/api";

class FullTimeLine extends Component {
  state = { load: false, shows: null, time: null };

  formatNumber = int => {
    let formatNo = int < 10 ? "0" + int : int;
    return formatNo;
  };

  SetUpGrid = () => {
    const time = new Date();
    let hour = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
    let thetime =
      "Time: " +
      this.formatNumber(hour) +
      ":" +
      this.formatNumber(minutes) +
      ":" +
      this.formatNumber(seconds);
    this.setState({ time: thetime });
  };

  setupTime = () => {
    setInterval(() => {
      this.SetUpGrid();
    }, 1000);
  };

  componentDidMount = () => {
    Api.ToDaysShow().then(o => {
      this.setState({
        load: true,
        shows: o,
        time: this.setupTime()
      });
    });
  };
  render() {
    return (
      <div className="timeline">
        <div className="channelse">
          <div className="channel">netflix</div>
          <div className="shows"></div>
          <div className="channel">CNN</div>
          <div className="channel">Xcoin</div>
          <div className="channel">flix</div>
        </div>
        <div className="programs">
          <div className="tcell2000">{this.state.time}</div>
        </div>
      </div>
    );
  }
}

export default FullTimeLine;
