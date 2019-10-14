import React, { Component } from "react";
import Api from "../../api/api";
import GridHead from "./gridhead";
import NetworkSchedule from "./gridnetwork";

class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = { network: null, currentStartTime: 2000 };
  }

  test = () => {
    let t = [];

    for (let x = -1; x < 12; x++) {
      t.push(<div key={"test" + x}>{x}</div>);
    }
    return t;
  };

  zxc = () => {
    if (this.state.network) {
      return (
        <div className="setgrid" key={"zxc" + Math.round(Math.random() * 1000)}>
          {this.test()}
        </div>
      );
    }
  };
  handleTimeChange = num => {
    this.setState({ currentStartTime: num });
  };
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
        let airtime = "";
        network.map(item => {
          if (item.show.network.name !== networkname) {
            networkname = item.show.network.name;
            airtime = item.airtime;

            sortnetwork.push({
              episode: [
                {
                  id: item.id,
                  name: item.name,
                  schedule: item.airdate,
                  time: item.airtime,
                  runtime: item.runtime ? item.runtime : 30,
                  showname: item.show.name
                }
              ],
              showid: item.show.id,

              network: item.show.network.name
            });
          } else {
            if (airtime !== item.airtime) {
              sortnetwork[sortnetwork.length - 1].episode.push({
                id: item.id,
                name: item.name,
                schedule: item.airdate,
                time: item.airtime,
                runtime: item.runtime ? item.runtime : 30,
                showname: item.show.name
              });
              airtime = item.airtime;
            }
          }
          return item;
        });
        //console.log(network);
        //console.log(sortnetwork);
        this.setState({ network: sortnetwork });
      });
  };

  render() {
    return (
      <div>
        <h4>Timeline</h4>
        <div className="todays">
          <GridHead
            currentStartTime={this.state.currentStartTime}
            handleTimeChange={this.handleTimeChange}
          />
          {this.zxc()}
          <NetworkSchedule
            currentStartTime={this.state.currentStartTime}
            network={this.state.network}
          />
          {this.zxc()}
        </div>
      </div>
    );
  }
}

export default Timeline;
