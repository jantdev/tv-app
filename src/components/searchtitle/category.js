import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Dropdown, DropdownButton } from "react-bootstrap";
class Category extends Component {
  state = { load: false, category: null, selectCategory: "Select Category" };

  getCategorysToDropdown = () => {
    if (this.state.load) {
      return this.state.category.map((item, index) => {
        return (
          <Dropdown.Item
            key={"category" + index}
            onClick={() => {
              this.getCategory(item);
            }}
          >
            {item}
          </Dropdown.Item>
        );
      });
    } else {
      return null;
    }
  };

  handleShowByCategory = a => {
    this.props.handleShowByCategory(a);
  };

  getCategory = function(name) {
    const shows = this.props.shows;

    const show = [];

    shows.forEach(item => {
      item.show.genres.forEach(element => {
        if (element === name) {
          show.push(item);
        }
      });
    });
    this.setState({ selectCategory: name });
    this.handleShowByCategory(show);
  };

  componentWillUpdate = (p, s, t) => {
    if (p.shows.length > 0 && !s.load) {
      let y = p.shows.map(item => {
        return item.show.genres;
      });
      y = y.reduce((a, b) => a.concat(b), []);
      y = y.filter((value, index, self) => {
        return self.indexOf(value) === index;
      });
      y = y.sort();
      this.setState({ category: y, load: true });
    }
  };
  render() {
    return (
      <DropdownButton
        id="dropdown-basic-button"
        variant="secondary"
        title={this.state.selectCategory}
      >
        {this.getCategorysToDropdown()}
      </DropdownButton>
    );
  }
}

export default withRouter(Category);
