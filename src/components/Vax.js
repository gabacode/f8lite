import React, { useState, useEffect, useCallback } from "react";
import ProgressBar from 'react-bootstrap/ProgressBar';
import csvToJson from 'csvtojson';
import axios from 'axios';

export default function Vax({istat}){
    const [isLoading,setIsLoading] = useState(true)
    let [data, setResponseData] = useState('');

    const fetchData = useCallback(async () => {
        axios({
            "method": "GET",
            "url": `https://raw.githubusercontent.com/gabacode/vaxExtract/main/dati-csv/vaccini-latest.csv`,
            "responseType": "blob"
            })
            .then((response) => {
                return response.data.text();
            })
            .then((text) => {
                csvToJson()
                    .fromString(text)
                    .then((json) => {
                        const data = json.filter( x => parseInt(x.pro_com_t).toString() === istat.toString());
                        console.log(data)
                        setResponseData(data)
                        setIsLoading(false)
                    })
            })
            .catch((error) => {
                alert(error)
            })
        }, [istat])
        
        useEffect(() => {
            fetchData()
        }, [fetchData])

    const risultati = data;
    let totVax = [];
    let totTarget = [];
         
    return(
        isLoading ? 'Caricamento...' :
        <div>
            {risultati.forEach((record) => {
                totVax.push(parseInt(record.vaccinati));
                totTarget.push(parseInt(record.target));
            })}
            <small>Pazienti vaccinati (almeno prima dose):</small>
            <ProgressBar now={Math.round(totVax.reduce((a, b) => a + b, 0)/totTarget.reduce((a, b) => a + b, 0)*100)} />
            <small style={{float:'right'}}>
                {totVax.reduce((a, b) => a + b, 0)} su {totTarget.reduce((a, b) => a + b, 0)} ({Math.round(totVax.reduce((a, b) => a + b, 0)/totTarget.reduce((a, b) => a + b, 0)*100)}%)
            </small>
        </div>
        )
    }
