import React from "react";
import Filter from "../../filter/index";
import placeholderImg from "../../img/noposter.png";

let showhide = false;
const setupCast = props => {
  if (props.cast) {
    return props.cast.map(item => {
      return (
        <div
          className="person"
          key={Filter.setUId(item.person.id)}
          onClick={() => {
            showhide = true;
            showPerson(item);
          }}
        >
          <img
            src={item.person.image ? item.person.image.medium : placeholderImg}
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
const showPerson = p => {
  if (p.person && showhide) {
    console.log(p.person);
    return (
      <div className="personholder">
        <h4>{p.person.name}</h4>
        <img
          src={p.person.image ? p.person.image.original : ""}
          alt={p.person.name}
        />
        <button
          onClick={() => {
            closePerson();
          }}
        >
          luk
        </button>
      </div>
    );
  }
};

const closePerson = () => {
  console.log("luk");
  showhide = showhide = !showhide;
};
const Cast = props => {
  console.log(props);
  return (
    <div style={props.style}>
      <div className="fghhhh">{showPerson(props)}</div>
      <div className="cast">{setupCast(props)}</div>
    </div>
  );
};
export default Cast;
