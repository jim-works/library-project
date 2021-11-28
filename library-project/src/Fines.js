import { React, useState } from 'react';
import Book from './Book'

function Fines() {


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
                <h1>Fines</h1>
                <input className="input-wide" value={query} onChange={e => setQuery(e.target.value)} />
                <button className="btn" onClick={getResults}>Execute Query</button>
            </div>
            <div>
                <section className='booklist'>
                    {results.map((row) =>
                        <Book key={row.isbn10} checkedOut={false} {...row} />
                    )}
                </section>
            </div>
        </div>
    );
}

export default Fines;