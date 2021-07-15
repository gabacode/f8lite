import React, { useState, useEffect, useCallback } from "react";
import ProgressBar from 'react-bootstrap/ProgressBar';
import axios from 'axios';

export default function Vax({istat}){
    const [isLoading,setIsLoading] = useState(true)
    let [data, setResponseData] = useState('');

    const fetchData = useCallback(async () => {
        axios({
            "method": "GET",
            "url": `https://dati.regione.sicilia.it/api/3/action/datastore_search?resource_id=30e9d3ea-0c7c-40c0-846b-a36f173028fe&q=${istat}`
            })
            .then((response) => {
            setResponseData(response.data.result)
            fetchData();
            setIsLoading(false);
            })
            .catch((error) => {
            alert(error)
            })
        }, [istat])
        useEffect(() => {
            fetchData()
        }, [fetchData])

    const risultati = data.records;
    let totVax = [];
    let totTarget = [];
         
    return(
        isLoading ? 'Caricamento...' :
        <div>
            {risultati.forEach((record) => {
                totVax.push(parseInt(record.Vaccinati));
                totTarget.push(parseInt(record.Target));
            })}
            <small>Pazienti vaccinati:</small>
            <ProgressBar now={Math.round(totVax.reduce((a, b) => a + b, 0)/totTarget.reduce((a, b) => a + b, 0)*100)} />
            <small style={{float:'right'}}>
                {totVax.reduce((a, b) => a + b, 0)} su {totTarget.reduce((a, b) => a + b, 0)} ({Math.round(totVax.reduce((a, b) => a + b, 0)/totTarget.reduce((a, b) => a + b, 0)*100)}%)
            </small>
        </div>
        )
    }
