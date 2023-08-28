import React, {useEffect, useState} from 'react';
import axios from "axios";
import './Convert.css';

type CurrencyDictionary = {
    [key: string]: number
}

export default function Convert() {
    const [base, setBase] = useState("usd")   
    const currency_url = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/" + base + ".json";
    const [currency, setCurrency] = useState<CurrencyDictionary>({})
    const [toCurrency, setToCurrency] = useState("")
    const [fromCurrency, setFromCurrency] = useState("")
    const [amount, setAmount] = useState(1)
    const [reverse, setReverse] = useState(false)
    const [exchangeRate, setExchangeRate] = useState(1)

    useEffect(() => {
        axios.get(currency_url).then(({data}) => {   
            setToCurrency(Object.keys(currency)[0]);
            setCurrency(data[base]);
            setFromCurrency(base);
            setExchangeRate(currency[0]);
        }).catch((error) => {
            alert(error);
        });
    },[]);

    useEffect(() => {
        if (fromCurrency != null && toCurrency != null) {
            axios.get(currency_url).then(({data}) => {
                setCurrency(data[base])
                setExchangeRate(currency[toCurrency])
            });
        }
    }, [fromCurrency, toCurrency]);

    let toAmount, fromAmount;
    if(!reverse) {
        fromAmount = amount
        toAmount = amount * exchangeRate
    } else {
        toAmount = amount
        fromAmount = amount / exchangeRate
    }

    function switchCur(toCurrency:string, fromCurrency: string) { 
        fromCurrency = toCurrency;
        toCurrency = fromCurrency
    }


    return (
    <div className="conv">
        <div className="currencySelection">
            <div className="inputField">
                <input type="number" className="input" value={fromAmount} onChange={ e => {setAmount(e.target.valueAsNumber); setReverse(false)}}/>
                <input type="number" className="input" value={toAmount} onChange={e => {setAmount(e.target.valueAsNumber); setReverse(true)}}/>
            </div>
            <div className="currencyList">
                <select value={fromCurrency} onChange={e => {setFromCurrency(e.target.value); setBase(e.target.value)}}>
                    {Object.keys(currency).map((v => (
                        <option key={v} value={v}>{v}</option>
                    )))}
                </select>
                <select value={toCurrency} onChange={e => setToCurrency(e.target.value)}>
                    {Object.keys(currency).map((v => (
                        <option key={v} value={v}>{v}</option>
                    )))}
                </select>
            </div>
            <div className="switcher">
                <button onClick={() => {setToCurrency(fromCurrency); setFromCurrency(toCurrency); setBase(fromCurrency)}}>Switch</button>
            </div>
        </div>
        
    </div>
    )
}
