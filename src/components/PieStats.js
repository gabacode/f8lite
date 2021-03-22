import React, { Component } from "react";
import ReactTooltip from "react-tooltip";
import { FaQuestionCircle } from 'react-icons/fa';
import { Chart } from "react-google-charts";

class PieStats extends Component{
    render(){
        const pos_tot = 2199;
        return(
            <React.Fragment>
                <div className="pt--20">
                    <p>Riepilogo totali positivi
                        <span data-tip data-for="posInfo">
                            &nbsp;<FaQuestionCircle />
                        </span>
                    </p>
                    <div className="pie">
                    <ReactTooltip id="posInfo" place="right" effect="solid" type="info">
                        Percentuale degli esiti basato su un totale di {pos_tot} positivi
                    </ReactTooltip>
                    <Chart
                        width={'500px'}
                        height={'300px'}
                        chartType="PieChart"
                        loader={<div>Caricamento dati...</div>}
                        data={[
                            ['Stato', 'Numero'],
                            ['Attuali Positivi', 201],
                            ['Negativi', 1534],
                            ['Liberati Positivi', 379],
                            ['Deceduti', 85],
                        ]}
                        options={{
                            is3D: true,
                            chartArea:{left:125,top:0},
                            slices: {
                                0: { color: '#467fd0' },
                                1: { color: '#4BCA81' },
                                2: { color: '#69d2f1' },
                                3: { color: '#384c74' },
                            },
                        }}
                        rootProps={{ 'data-testid': '4' }}
                    />
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default PieStats;