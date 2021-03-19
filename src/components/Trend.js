import React, { Component, Fragment } from "react";
import ReactSpeedometer from "react-d3-speedometer"

class Trend extends Component{
  
    render(){
      //TODO implementazione props
        var lastWeek = 48;
        var thisWeek = 56;
        var trend = thisWeek/lastWeek;
        return (
    <Fragment>
      <div className="pt--20">
      <h3>Situazione Settimanale</h3>
        <ReactSpeedometer
          minValue={0}
          maxValue={2}
          value={trend}
          segments={5555}
          maxSegmentLabels={0}
          startColor="green"
          endColor="red"
          width={300}
          needleHeightRatio={0.618}
          currentValueText={String(((trend-1)*100).toFixed(2))+"%"}
          ringWidth={42}
          needleTransitionDuration={3333}
          needleTransition="easeElastic"
          needleColor={'#90f2ff'}
        />
        </div>
      </Fragment>
      );
      }
    }
    export default Trend;