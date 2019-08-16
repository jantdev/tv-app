import React from "react";
import Filter from "../../filter/index";
const back = props => {
  handleTimeChange(props, props.currentStartTime - 300);
};
const next = props => {
  handleTimeChange(props, props.currentStartTime + 300);
};

const handleTimeChange = (props, num) => {
  if (num > 2530) {
    num = 200;
  } else if (num < 0) {
    num = 2300;
  }
  //console.log(num);
  props.handleTimeChange(num);
};
const GridHeadNav = props => {
  return (
    <div>
      <button
        className="timenav back"
        onClick={() => {
          back(props);
        }}
      >
        &lt;
      </button>
      <button
        className="timenav next"
        onClick={() => {
          next(props);
        }}
      >
        &gt;
      </button>
    </div>
  );
};
const GridSub = props => {
  let Time = [0, 30, 100, 130, 200, 230];

  let t = [];
  let y = 2;
  t.push(<div key="lr">{GridHeadNav(props)}</div>);
  for (let x = 0; x < 6; x++) {
    let style = {};

    style = { gridColumnStart: y, gridColumnEnd: (y += 2) };

    t.push(
      <div key={x} style={style}>
        {Filter.returnTimeFormat(Time[x] + props.currentStartTime)}
      </div>
    );
  }
  return t;
};
let key = 0;
const GridHead = props => {
  return (
    <div className="setgrid time" key={"gridhead" + (key += 4)}>
      {GridSub(props)}
    </div>
  );
};

export default GridHead;
