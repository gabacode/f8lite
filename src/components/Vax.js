import React, { useState, useEffect, useCallback } from "react";
import ProgressBar from 'react-bootstrap/ProgressBar';
import axios from 'axios';
import { format } from "date-fns";

export default function Vax({istat}){
    const [isLoading,setIsLoading] = useState(true)
    const [data, setData] = useState('');

    const fetchData = useCallback(async () => {
        await axios(`https://covid-open-report-sicilia.herokuapp.com/vaccini/latest?q=${istat}`)
            .then((response) => {
                setData(response.data[0])
                setIsLoading(false)
            })
            .catch((error) => {
                alert(error)
            })
        }, [istat])
        
        useEffect(() => {
            fetchData()
        }, [fetchData])
      
    return(
        isLoading ? 'Caricamento...' :
        <div className="pt-4 pb-2 row">
            <h3 className="mx-auto">
                Vaccinati al {format(new Date(data.data), "dd/MM/yyyy")}
            </h3>
            <div className="col-12">
                <small>Pazienti vaccinati (almeno prima dose):</small>
                <ProgressBar now={data.prima_dose} />
                <small style={{float:'right'}}>
                    {data.prima_dose}% target
                </small>
            </div>
            <div className="col-12">
                    <small>Pazienti immunizzati (almeno 2 dosi o Janssen monodose):</small>
                    <ProgressBar now={data.seconda_dose} />
                    <small style={{float:'right'}}>
                        {data.seconda_dose}% target
                    </small>
                </div>
            </div>
        )
    }
