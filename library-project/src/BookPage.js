import { React, useState } from 'react';
import Book from './Book'

function BookPage() {
    const createQuery = (searchString) => {
        return 'SELECT * FROM book WHERE ISBN LIKE "%25' + searchString + '%25" OR isbn13 LIKE "%25' + searchString + '%25" OR title LIKE "%25' + searchString + '%25" OR author LIKE "%25' + searchString + '%25";';
    }
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const getResults = () => {
        fetch("/api/query/" + createQuery(query))
            .then(result => result.json())
            .then(result => setResults(result));
    };

    return (
        <div className="app">
            <div className="bookinput">
                <h1>Books</h1>
                <input className="input-wide" value={query} onChange={e => setQuery(e.target.value)} />
                <button className="btn" onClick={getResults}>Execute Query</button>
            </div>
            <div>
                <section className='booklist'>
                    {results.map((row) =>
                        <Book key={row.Isbn} checkedOut={false} {...row} />
                    )}
                </section>
            </div>
        </div>
    );
}

export default BookPage;