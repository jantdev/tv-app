import React, { Component } from "react";
import placeholderImg from "../../img/noposter.png";
import { withRouter } from "react-router-dom";
import Rating from "../showdetail/rating";
import ShowInfoBox from "./showinfobox";

class Schedule extends Component {
  state = {
    scroll: 0,
    maxwidth: null
  };
  setShowId = () => {
    return Math.floor(Math.random() * 100000);
  };

  setShows = () => {
    if (this.props.shows) {
      return this.props.shows.map(item => {
        let showid = this.setShowId();
        return (
          <div
            className="showcard"
            key={item.id}
            id={showid}
            onClick={() => {
              this.handleDetail(item);
            }}
            onMouseOver={() => {
              this.handleDetailOnMouseOver(showid);
            }}
            onMouseOut={() => {
              this.handleDetailOnMouseOut(showid);
            }}
          >
            <img
              src={item.show.image ? item.show.image.medium : placeholderImg}
              alt={item.name}
            />
            <h4>{item.show.name}</h4>
            <p>{item.name}</p>
            <Rating rating={item.show.rating.average} />
            <div className="schedule">{item.airtime}</div>
            <ShowInfoBox show={item} />
          </div>
        );
      });
    } else {
      return null;
    }
  };
  btnNext = () => {
    let totallength = this.props.shows.length * 220 - this.state.maxwidth;
    if (totallength + this.state.scroll > 1) {
      this.setState({
        scroll: this.state.scroll - this.state.maxwidth
      });
    } else {
      this.setState({
        scroll: 0
      });
    }
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
    this.props.history.push("/showepisode/" + obj.show.id + "+" + obj.id);
  };
  handleDetailOnMouseOver = showid => {
    let box = document.getElementById(showid);
    let info = box.querySelector(".showInfoBox");
    let leftright = box.offsetLeft / this.state.maxwidth;

    if (Math.floor(leftright * 1000) > 500) {
      info.style.left = "-440px";
      info.classList.replace("showInfoBoxLeft", "showInfoBoxRight");
    } else {
      info.style.left = "220px";
      info.classList.replace("showInfoBoxRight", "showInfoBoxLeft");
    }

    info.style.display = "block";
  };

  handleDetailOnMouseOut = showid => {
    let box = document.getElementById(showid);
    box.querySelector(".showInfoBox").style.display = "none";
  };

  componentDidMount = () => {
    let y = Math.floor(
      document.getElementsByClassName("shows")[0].clientWidth / 222
    );
    let x = y * 220;

    this.setState({
      maxwidth: x
    });
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
