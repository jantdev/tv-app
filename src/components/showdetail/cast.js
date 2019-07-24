import React, { Component } from "react";
import Filter from "../../filter/index";
import placeholderImg from "../../img/noposter.png";

class Cast extends Component {
  state = { cast: this.props.cast };
  setupCast = () => {
    if (this.props.cast) {
      return this.props.cast.map(item => {
        return (
          <div className="person" key={Filter.setId()}>
            <img
              src={
                item.person.image ? item.person.image.medium : placeholderImg
              }
              alt={item.person.name}
            />
            <p>
              {item.person.name}
              <br /> as {item.character.name}
            </p>
          </div>
        );
      });
    }
  };
  render() {
    return (
      <div style={this.props.style}>
        <div className="cast">{this.setupCast()}</div>
      </div>
    );
  }
}

export default Cast;
