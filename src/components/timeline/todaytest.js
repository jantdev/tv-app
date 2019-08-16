import React, { Component } from "react";
import Api from "../../api/api";

class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = { network: null, currentStartTime: 2000 };
  }

  componentDidMount = () => {
    Api.ToDaysShow()
      .then(result => {
        return result.filter(item => {
          if (item.show.network) {
            return item;
          } else {
            return null;
          }
        });
      })
      .then(sort => {
        return sort.sort((a, b) => {
          if (a.show.network && b.show.network) {
            if (a.show.network.name < b.show.network.name) {
              return -1;
            }
            if (b.show.network.name > a.show.network.name) {
              return 1;
            }
            return 0;
          } else {
            return null;
          }
        });
      })
      .then(network => {
        let sortnetwork = [];
        let networkname = "";

        network.map(item => {
          if (item.show.network.name !== networkname) {
            networkname = item.show.network.name;
            sortnetwork.push({
              episode: [
                {
                  id: item.id,
                  name: item.name,
                  schedule: item.airdate,
                  time: item.airtime,
                  runtime: item.runtime
                }
              ],
              showid: item.show.id,
              network: item.show.network.name
            });
          } else {
            sortnetwork[sortnetwork.length - 1].episode.push({
              id: item.id,
              name: item.name,
              schedule: item.airdate,
              time: item.airtime,
              runtime: item.runtime
            });
          }
          return item;
        });
        //console.log(network);
        //console.log(sortnetwork);
        this.setState({ network: sortnetwork });
      });
  };
  setupEpisode = item => {
    let currentEndTime = this.state.currentStartTime + 300;

    return item.map((i, index) => {
      let time = new Date(i.schedule + "T" + i.time + ":00");
      let setTime = Number(
        time.getHours().toString() + this.addZero(time.getMinutes())
      );
      let gridCol = {};
      let gridEnd = 0;
      if (setTime >= this.state.currentStartTime && setTime < currentEndTime) {
        // console.log(Math.round(i.runtime / 15));

        if (this.formatTime(i.time) === this.state.currentStartTime) {
          gridCol["gridColumnStart"] = "2";
          gridEnd = i.runtime / 15 + 2;
        } else if (
          this.formatTime(i.time) ===
          this.state.currentStartTime + 30
        ) {
          gridCol["gridColumnStart"] = "4";
          gridEnd = i.runtime / 15 + 4;
        } else if (
          this.formatTime(i.time) ===
          this.state.currentStartTime + 100
        ) {
          gridCol["gridColumnStart"] = "6";
          gridEnd = i.runtime / 15 + 6;
        } else if (
          this.formatTime(i.time) ===
          this.state.currentStartTime + 130
        ) {
          gridCol["gridColumnStart"] = "8";
          gridEnd = i.runtime / 15 + 8;
        } else if (
          this.formatTime(i.time) ===
          this.state.currentStartTime + 200
        ) {
          gridCol["gridColumnStart"] = "10";
          gridEnd = i.runtime / 15 + 10;
        } else if (
          this.formatTime(i.time) ===
          this.state.currentStartTime + 230
        ) {
          gridCol["gridColumnStart"] = "12";
          gridEnd = i.runtime / 15 + 12;
        } else if (this.formatTime(i.time) === currentEndTime) {
          gridCol["gridColumnStart"] = "14";
          gridEnd = i.runtime / 15 + 14;
        }
        gridCol["gridColumnEnd"] = Math.round(gridEnd);
        return (
          <div
            className="grid-col-scheudle-time"
            style={gridCol}
            key={"e" + index}
          >
            {i.time} | {i.runtime} | {i.name}
          </div>
        );
      } else {
        return null;
      }
    });
  };
  addZero = min => {
    if (min < 10) {
      min += "0";
    }
    return min;
  };

  count = () => {
    return null;
  };
  shortNetworkTitle = item => {
    if (item.length > 7) {
      return item.substring(0, 7) + "...";
    } else {
      return item;
    }
  };
  setupNetwork = () => {
    if (this.state.network) {
      return this.state.network.map((item, index) => {
        console.log(item.episode);
        return (
          <div className="setgrid" key={"S" + index}>
            <div className="grid-col-network" key={"n" + index}>
              {this.shortNetworkTitle(item.network)}
            </div>
            {this.setupEpisode(item.episode)}
          </div>
        );
      });
    }
  };
  formatToHours = num => {
    return String(num).substring(0, 2) + ":" + String(num).substring(2, 4);
  };
  formatTime(time) {
    return Number(String(time).replace(":", ""));
    // {this.setupNetwork()}
  }

  setupNetworkGrid = () => {
    const cal = [0, 30, 100, 130, 200, 230];
    let grid = 2;
    return cal.map((element, index) => {
      let style = { gridColumnStart: grid, gridColumnEnd: (grid += 2) };

      return (
        <div className="grid-col-scheudle-time" key={element} style={style}>
          {this.formatToHours(this.state.currentStartTime + element)}
        </div>
      );
    });
  };

  render() {
    return (
      <div>
        <h4>Timeline</h4>
        <div className="setgrid">
          <div
            className="grid-col-network"
            style={{ gridColumnStart: 0, gridColumnEnd: 2 }}
          >
            LR
          </div>
          {this.setupNetworkGrid()}
        </div>
        {this.setupNetwork()}
      </div>
    );
  }
}

export default Timeline;
