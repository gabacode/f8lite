import React, {Component, Fragment} from "react";
import ReactTooltip from "react-tooltip";
import { FaQuestionCircle } from 'react-icons/fa';

export default class Redzone extends Component { 

  render() {
    const pop = 53714;
    var pos = 57;
    let val = Math.round(((pos/pop)*100000));

    if(val>=0&&val<100){
      var color = "text-success";
    }
    if(val>=100&&val<250){
      var color = "text-warning";
    }
    if(val>=250){
      var color = "text-danger";
    }

    return (
      <Fragment>
      <small className="ptb--0">Indice250:&nbsp;
        <span className={`bold ${color}`}>
          {val}
        </span>
        <span data-tip data-for="zoneInfo">
            &nbsp;<FaQuestionCircle />
        </span>
      </small>
      <ReactTooltip id="zoneInfo" place="right" effect="solid" type="info">
      Incidenza giornaliera ogni 100k ab. (DL 13 marzo 2021 n.30), negli ultimi 7 giorni
      </ReactTooltip>
    </Fragment>
    );
  }
}