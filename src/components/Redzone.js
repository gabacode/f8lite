import React, { Component, Fragment } from "react";
import ReactSpeedometer from "react-d3-speedometer"

class Redzone extends Component{
    render(){
        const pop = 53714;
        var pos = 56;
        const values = ((pos/pop)*100000);
        return (
    <Fragment>
        <ReactSpeedometer
          minValue={0}
          maxValue={500}
          value={values}
          segments={2}
          segmentColors={["green","red"]}
          width={420}
          needleHeightRatio={0.618}
          currentValueText={String((values/100000).toFixed(6))+"%"}
          customSegmentLabels={[
            {
              text: 'Tutto bene',
              position: 'INSIDE',
              color: '#fff',
            },
            {
              text: 'Red Zone',
              position: 'INSIDE',
              color: '#fff',
            },
          ]}
          ringWidth={42}
          needleTransitionDuration={3333}
          needleTransition="easeElastic"
          needleColor={'#90f2ff'}
          textColor={'#666'}
        />
      </Fragment>
      );
      }
    }
    export default Redzone;