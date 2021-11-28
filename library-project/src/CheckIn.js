import { React, useState } from 'react';
import Book from './Book'

function CheckIn() {


    const [query, setQuery] = useState('select * from book limit 10;');
    const [results, setResults] = useState([]);
    const getResults = () => {
        fetch("/api/query/" + query)
            .then(result => result.json())
            .then(result => setResults(result));
    };

    return (
        <div className="app">
            <div className="bookinput">
                <h1>Check In (Search by book id or borrower id)</h1>
                <input className="input-wide" value={query} onChange={e => setQuery(e.target.value)} />
                <button className="btn" onClick={getResults}>Search</button>
            </div>
            <div>
                <section className='booklist'>
                    {results.map((row) =>
                        <Book key={row.Isbn} checkedOut={true} {...row} />
                    )}
                </section>
            </div>
        </div>
    );
}

export default CheckIn;