import React, { Component } from "react";
//import { Card } from "react-bootstrap";
import Filter from "../../filter/index";
//import Slider from "react-slick";
//import testdata from "./test.json";
import placeholderImg from "../../img/noposter.png";
import { withRouter } from "react-router-dom";
import Rating from "../showdetail/rating";

class Schedule extends Component {
  state = {
    load: false,
    shows: null,
    scroll: 0,
    maxwidth: null
  };
  setShows = () => {
    if (this.state.load) {
      return this.state.shows.map(item => {
        return (
          <div
            className="showcard"
            key={item.id}
            onClick={() => {
              this.handleDetail(item);
            }}
          >
            <img
              src={item.show.image ? item.show.image.medium : placeholderImg}
              alt={item.name}
            />
            <h4>{item.show.name}</h4>
            <p>{item.name}</p>

            <Rating rating={item.show.rating.average} />
            <div className="schedule">
              To day at: {Filter.ReturnTime(item.airstamp)}
            </div>
          </div>
        );
      });
    }
  };
  btnNext = () => {
    this.setState({
      scroll: this.state.scroll - this.state.maxwidth
    });
  };
  btnPreviuos = () => {
    if (this.state.scroll < 0) {
      this.setState({ scroll: this.state.scroll + this.state.maxwidth });
    }
  };
  setScroll = () => {
    return {
      marginLeft: this.state.scroll + "px"
    };
  };
  handleDetail = obj => {
    this.props.handleSelectShow(obj);
    console.log(obj);
    //this.props.history.push("/showepisode");
  };
  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if (this.state.shows !== prevState.shows) {
      console.log(this.state);
      this.setShows();
      this.props.handleNetworks(this.state.shows);
    }
  };
  componentDidMount = () => {
    fetch(
      this.props.endpoint + "schedule?country=us&date=" + Filter.CurrentDate()
    )
      .then(response => response.json())
      .then(results => {
        this.setState({
          load: true,
          shows: results,
          maxwidth: document.getElementsByClassName("holder")[0].clientWidth
        });
      })

      .catch(error => this.setState({ load: false }));
  };

  render() {
    return (
      <div className="navshows">
        <button className="navbutton previous" onClick={this.btnPreviuos} />

        <div className="shows">
          <div className="holder" ref="holder" style={this.setScroll()}>
            {this.setShows()}
          </div>
        </div>
        <button className="navbutton next" onClick={this.btnNext} />
      </div>
    );
  }
}

export default withRouter(Schedule);
