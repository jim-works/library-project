import { React, useState } from 'react';
import './App.css';
import Book from './Book'
var mysql = require('mysql');

function App() {


    const [query, setQuery] = useState('select * from book limit 10;');
    const [results, setResults] = useState([]);
    const getResults = () => {
        fetch("/api/" + query)
            .then(result => result.json())
            .then(result => setResults(result));
    };

    return (
        <div className="app">
            <div className="bookinput">
                <h1>SQL Query Runner</h1>
                <input className="input-wide" value={query} onChange={e => setQuery(e.target.value)} />
                <button className="btn" onClick={getResults}>Execute Query</button>
            </div>
            <div>
                <section className='booklist'>
                    {results.map((row) =>
                        <Book {...row} />
                    )}
                </section>
            </div>
        </div>
    );
}

export default App;
