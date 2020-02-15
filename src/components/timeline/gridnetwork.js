import React from "react";
import Filter from "../../filter/index";

const ttt = (episodes, currentStartTime) => {
  
  return episodes.map((item, index) => {
 
    let CellStart = Filter.HourToNum(item.time)-currentStartTime
    let CellEnd = Math.floor(CellStart+item.runtime)
    let Cell = CellStart+item.runtime;    
  
   
    return (
      <div key={"episode" + index} className={"cell cellStart"+CellStart+" cellEnd"+CellEnd}>
        {item.time}: {item.runtime}
      </div>
    );
  });
};


const isNetworkScheduleInTimeLine = (network, hour)=> {
  const episode = [];
  network.episode.map(item => {
    if (
      Filter.HourToNum(item.time) >= hour &&
      Filter.HourToNum(item.time) < hour + 300
    ) {
      episode.push(item)
    }
  });
  return episode;
}

const isEpisodeScheduleInTimeLine = (episode, currentStartTime) => {
  const t = [];
 
  episode.map(item => {
  
    if (
      Filter.HourToNum(item.time) >= currentStartTime &&
      Filter.HourToNum(item.time) < currentStartTime + 300
    ) {
      t.push(item);
    }
  });
  
 return ttt(t, currentStartTime);
};




// {isEpisodeScheduleInTimeLine(item.episode,props.currentStartTime)}
const NetworkSchedule = props => {
  
  if (props.network && props.network.length >0) {
    return props.network.map((item, index) => {
      if (
        isNetworkScheduleInTimeLine(item, props.currentStartTime).length >0
      ) {
        return (
          <div className="setgrid" key={"network" + index}>
            <div>{item.network}</div>
          {isEpisodeScheduleInTimeLine(item.episode,props.currentStartTime)}
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
