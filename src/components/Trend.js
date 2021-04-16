import React, { Component, Fragment } from "react";
import ReactTooltip from "react-tooltip";
import { FaQuestionCircle } from "react-icons/fa";
import ReactSpeedometer from "react-d3-speedometer";

export default class Trend extends Component {
  render() {
    var lastWeek = this.props.lw;
    var thisWeek = this.props.tw;
    var trend = thisWeek/lastWeek;
    var value = trend;
    if (trend>=2){
      value = 2;
    }
    return (
      <Fragment>
        <div className="pt--20">
          <p>
            Variazione positivi su base settimanale
            <span data-tip data-for="trendInfo">
              &nbsp;
              <FaQuestionCircle />
            </span>
          </p>
          <ReactTooltip id="trendInfo" place="right" effect="solid" type="info">
            Rapporto tra il numero di nuovi positivi settimanali ({thisWeek}),
            <br /> e il numero di quelli della scorsa settimana ({lastWeek})
          </ReactTooltip>
          <ReactSpeedometer
            minValue={0}
            maxValue={2}
            value={value}
            segments={5555}
            maxSegmentLabels={0}
            startColor="green"
            endColor="red"
            width={300}
            needleHeightRatio={0.618}
            currentValueText={String(((trend - 1) * 100).toFixed(2)) + "%"}
            ringWidth={42}
            needleTransitionDuration={3333}
            needleTransition="easeElastic"
            needleColor={"#90f2ff"}
          />
        </div>
      </Fragment>
    );
  }
}
