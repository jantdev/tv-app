import React from "react";
import Filter from "../../filter/index";

const ttt = (episodes, currentStartTime) => {
  let currentEndTime = currentStartTime + 300;

  return episodes.map((item, index) => {
    let gridColStyle = {};
    let gridStart = ((Filter.HourToNum(item.time) - currentStartTime) % 24) + 2;
    let gridEnd = item.runtime / 15 + gridStart;
    console.log(
      Math.round((Filter.HourToNum(item.time) - currentStartTime) / 24 + 2)
    );
    /*
    if (Filter.HourToNum(item.time) === currentStartTime) {
      gridStart = 2;
      gridEnd = item.runtime / 15 + 2;
    } else if (Filter.HourToNum(item.time) === currentStartTime + 30) {
      gridStart = 4;
      gridEnd = item.runtime / 15 + 4;
    } else if (Filter.HourToNum(item.time) === currentStartTime + 100) {
      gridStart = 6;
      gridEnd = item.runtime / 15 + 6;
    } else if (Filter.HourToNum(item.time) === currentStartTime + 130) {
      gridStart = 8;
      gridEnd = item.runtime / 15 + 8;
    } else if (Filter.HourToNum(item.time) === currentStartTime + 200) {
      gridStart = 10;
      gridEnd = item.runtime / 15 + 10;
    } else if (Filter.HourToNum(item.time) === currentStartTime + 230) {
      gridStart = 12;
      gridEnd = item.runtime / 15 + 12;
    } else if (Filter.HourToNum(item.time) === currentEndTime) {
      gridStart = 14;
      gridEnd = item.runtime / 15 + 14;
    }
*/
    gridColStyle["gridColumnStart"] = gridStart;
    if (gridEnd > 14) {
      gridEnd = 14;
    }
    gridColStyle["gridColumnEnd"] = Math.round(gridEnd);

    gridColStyle["borderRight"] = "1px solid #e74809";

    gridColStyle["borderLeft"] = "1px solid #e74809";
    gridColStyle["marginLeft"] = "-1px";

    if (Math.round(gridEnd) === 14 || Math.round(gridEnd) === 0) {
      gridColStyle["borderRight"] = "0px";
    }
    // console.log(item);
    return (
      <div key={"episode" + index} style={gridColStyle}>
        {item.time}: {item.runtime}
      </div>
    );
  });
};

function qwe(props, currentStartTime) {
  const t = [];
  props.episode.map(item => {
    if (
      Filter.HourToNum(item.time) >= currentStartTime &&
      Filter.HourToNum(item.time) < currentStartTime + 300
    ) {
      t.push(item);
    }
  });
  return ttt(t, currentStartTime);
}

function isNetworkScheduleInTimeLine(network, hour) {
  let episode = [];

  network.episode.map(item => {
    if (Filter.HourToNum(item.time) === 0) {
      console.log(Filter.HourToNum(item.time));
    }

    if (
      Filter.HourToNum(item.time) >= hour &&
      Filter.HourToNum(item.time) < hour + 300
    ) {
      episode.push(item);
    }
  });
  return episode;
}
const NetworkSchedule = props => {
  if (props.network) {
    return props.network.map((item, index) => {
      if (
        isNetworkScheduleInTimeLine(item, props.currentStartTime).length > 0
      ) {
        return (
          <div className="setgrid" key={"network" + index}>
            <div>{item.network}</div>
            {qwe(item, props.currentStartTime)}
          </div>
        );
      } else {
        return null;
      }
    });
  } else {
    return null;
  }
};

export default NetworkSchedule;
