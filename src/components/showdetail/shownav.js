import React, { Component } from "react";
import { Button } from "react-bootstrap";
import Cast from "../cast/cast";
import Crew from "../crew/crew";
import Episodes from "./episodes";

class ShowNav extends Component {
  state = {
    show: null,
    activeSubject: 0,
    subjects: [
      { name: "Episodes", active: "active", visible: "block" },
      { name: "Cast", active: "inactive", visible: "none" },
      { name: "Crew", active: "inactive", visible: "none" }
    ],
    cast: null,
    crew: null,
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


componentDidUpdate=(prevProps, prevState, snapshot)=>{
  if(prevProps.show !==prevState.show){
    this.setState({show:prevProps.show})
  }
}
  render() {
    return (
      <div className="showdetails">
        <ul className="shownav">{this.setupSubjects()}</ul>

        <Episodes
          style={this.ListnerToSubjectsVisible(0)}
          allepisodes={this.props.allepisodes}
          show={this.props.show}
        />
        <Cast style={this.ListnerToSubjectsVisible(1)} cast={this.props.cast} showid={this.props.show} />
        <Crew style={this.ListnerToSubjectsVisible(2)} show={this.props.show} />
      </div>
    );
  }
}

export default ShowNav;
