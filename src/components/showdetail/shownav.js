import React, { Component } from "react";
import { Button } from "react-bootstrap";
import Cast from "./cast";
import Episodes from "./episodes";

class ShowNav extends Component {
  state = {
    show: this.props.show,
    activeSubject: 0,
    subjects: [
      { name: "Episodes", active: "active", visible: "block" },
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
          <Button
            variant="secondary"
            onClick={() => {
              this.handleClick(index);
            }}
            ref={item.name}
            className={this.ListnerToSubjectsNav(index)}
          >
            {item.name}
          </Button>
        </li>
      );
    });
  };

  componentDidMount = () => {
    if (this.props.show) {
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

        <Episodes
          style={this.ListnerToSubjectsVisible(0)}
          allepisodes={this.props.allepisodes}
          show={this.props.show}
        />
        <Cast style={this.ListnerToSubjectsVisible(1)} cast={this.props.cast} />
      </div>
    );
  }
}

export default ShowNav;
