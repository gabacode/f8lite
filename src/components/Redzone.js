import React, {Component, Fragment} from "react";
import ReactTooltip from "react-tooltip";
import { FaQuestionCircle } from 'react-icons/fa';

export default class Redzone extends Component { 

  render() {
    var pop = this.props.pop;
    var pos = this.props.tw;
    var color;
    let val = Math.round(((pos/pop)*100000));

    if(val>=0&&val<100){
      color = "text-success";
    }else
    if(val>=100&&val<250){
      color = "text-warning";
    }else
    if(val>=250){
      color = "text-danger";
    }

    return (
      <Fragment>
      <p className="ptb--10">Indice250:&nbsp;
        <span className={`bold ${color}`}>
          {val}
        </span>
        <span data-tip data-for="zoneInfo">
            &nbsp;<FaQuestionCircle />
        </span>
      </p>
      <ReactTooltip id="zoneInfo" place="right" effect="solid" type="info">
        Numero di nuovi contagi ogni 100.000 abitanti, negli ultimi 7 giorni.<br />
        E' calcolato dal numero di nuovi positivi settimanali ({this.props.tw}),<br />diviso il numero di abitanti ({this.props.pop})
      </ReactTooltip>
    </Fragment>
    );
  }
}