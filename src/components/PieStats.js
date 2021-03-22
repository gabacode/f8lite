import React, { Component } from "react";
import { Chart } from "react-google-charts";

class PieStats extends Component{
    render(){
        return(
            <React.Fragment>
                <div className="pie">
                <Chart
                    width={'500px'}
                    height={'300px'}
                    chartType="PieChart"
                    loader={<div>Caricamento Chart</div>}
                    data={[
                        ['Stato', 'Numero'],
                        ['Attuali', 201],
                        ['Negativi', 1534],
                        ['Liberati Positivi', 379],
                        ['Deceduti', 85],
                    ]}
                    options={{
                        title: 'Riepilogo Positivi',
                        is3D: true,
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
            </React.Fragment>
        )
    }
}
export default PieStats;