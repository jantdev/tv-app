import React, { Component } from "react";
import Cast from "./cast";
import Episodes from "./episodes";
import Main from "./main";

class ShowNav extends Component {
  state = {
    show: this.props.show,
    activeSubject: 0,
    subjects: [
      { name: "Main", active: "active", visible: "block" },
      { name: "Episodes", active: "inactive", visible: "none" },
      { name: "Cast", active: "inactive", visible: "none" }
    ],
    cast: null,
    episodes: null
  };
  setAllSubjectsInActive = () => {
    this.setState(state => {
      state.subjects.forEach(element => {
        element.active = "inactive";
        element.visible = "none";
      });
    });
  };
  ListnerToSubjectsNav = no => {
    return this.state.subjects[no].active;
  };
  ListnerToSubjectsVisible = no => {
    return { display: this.state.subjects[no].visible };
  };
  handleClick = arrayno => {
    this.setAllSubjectsInActive();
    this.setState(state => {
      state.subjects[arrayno].active = "active";
      state.subjects[arrayno].visible = "block";
    });
    this.setState({ activeSubject: arrayno });
  };

  setupSubjects = () => {
    return this.state.subjects.map((item, index) => {
      return (
        <li key={"sub" + index}>
          <button
            onClick={() => {
              this.handleClick(index);
            }}
            ref={item.name}
            className={this.ListnerToSubjectsNav(index)}
          >
            {item.name}
          </button>
        </li>
      );
    });
  };

  componentDidMount = () => {
    if (this.props.show) {
      console.log(this.props);
      fetch("http://api.tvmaze.com/shows/" + this.state.show.show.id + "/cast")
        .then(response => response.json())
        .then(results => {
          this.setState({
            cast: results
          });
        })
        .catch(error => this.setState({ cast: null }));
    }
  };
  render() {
    return (
      <div className="showalldata">
        <ul className="shownav">{this.setupSubjects()}</ul>
        <Main show={this.props.show} style={this.ListnerToSubjectsVisible(0)} />
        <Episodes
          style={this.ListnerToSubjectsVisible(1)}
          allepisodes={this.props.allepisodes}
        />
        <Cast style={this.ListnerToSubjectsVisible(2)} cast={this.props.cast} />
      </div>
    );
  }
}

export default ShowNav;
