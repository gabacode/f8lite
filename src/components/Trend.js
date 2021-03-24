import React, { Component, Fragment } from "react";
import ReactTooltip from "react-tooltip";
import { FaQuestionCircle } from 'react-icons/fa';
import ReactSpeedometer from "react-d3-speedometer"

class Trend extends Component{
  
    render(){
      //TODO implementazione props
        var lastWeek = 61;
        var thisWeek = 45;
        var trend = thisWeek/lastWeek;
        return (
    <Fragment>
      <div className="pt--20">
      <p>Variazione positivi su base settimanale
        <span data-tip data-for="trendInfo">
          &nbsp;<FaQuestionCircle />
        </span>
      </p>
      <ReactTooltip id="trendInfo" place="right" effect="solid" type="info">
          Rapporto tra il numero di nuovi positivi settimanali,<br /> e il numero di quelli della scorsa settimana
      </ReactTooltip>
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
