import React, { FC, Fragment, useEffect, useState } from 'react';
import ReactTooltip from 'react-tooltip';
import { FaQuestionCircle } from 'react-icons/fa';
import ReactSpeedometer, { Transition } from 'react-d3-speedometer';

export interface TrendProps {
  lastWeek: number;
  thisWeek: number;
}

export const Trend: FC<TrendProps> = ({ lastWeek, thisWeek }) => {
  const [trend, setTrend] = useState(1);

  useEffect(() => {
    if (trend >= 2) {
      setTrend(2);
    }
    setTrend(thisWeek / lastWeek);
  }, [lastWeek, thisWeek, trend]);

  const trendPercent = ((trend - 1) * 100).toFixed(2);

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
          value={trend}
          segments={1024}
          maxSegmentLabels={0}
          startColor="green"
          endColor="red"
          width={300}
          needleHeightRatio={0.618}
          currentValueText={`${trendPercent}%`}
          ringWidth={42}
          needleTransitionDuration={2000}
          needleTransition={Transition.easeExpInOut}
          needleColor={'#90f2ff'}
        />
      </div>
    </Fragment>
  );
};
