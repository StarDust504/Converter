import React, {useState} from 'react';
import CurrencyList from './CurrencyList';
import History from './History';
import './Navbar.css'


import Convert from './Convert';

export default function Navbar() {
    const [isHiddenList, setisHiddenList] = useState(false)
    const [isHiddenHistory, setisHiddenHistory] = useState(false)
    return (
        <div className="nav">
            <div className="buttons">
                <button disabled={true}>Converter</button>
                <button onClick={() => setisHiddenList(s => !s)}>CurrencyList</button>
                <button onClick={() => setisHiddenHistory(s => !s)}>History</button>
            </div>
            <div className="pages">
                <Convert />
                {!isHiddenList ? <CurrencyList/> : null} 
                {!isHiddenHistory ? <History/> : null} 
            </div>
        </div>
    )
}