import { React, useState } from 'react';
import Loan from './Loan'

function CheckIn() {

    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [onlyOut, setOnlyOut] = useState(true);
    const getResults = () => {
        const suffix = onlyOut ? " AND date_in IS NULL" : "";
        const byNameOrCardIDSQL = "SELECT * FROM book_loans WHERE card_id IN (SELECT card_id FROM borrower WHERE First_name LIKE '%25" + query + "%25' OR bname LIKE '%25" + query + "%25' OR card_id='" + query + "')" + suffix + ";";
        const byBookId = "SELECT * FROM book_loans WHERE Isbn='" + query + "'" + suffix + ";";
        fetch("/api/query/" + byNameOrCardIDSQL)
            .then(result => result.json())
            .then(result => {
                return fetch("/api/query/" + byBookId).then(result => result.json())
                    .then(newResult => [].concat(result, newResult))
                    .catch(_ => result)
            })
            .then(result => setResults(result));
    };

    return (
        <div className="app">
            <div className="bookinput">
                <h1>Check In (Search by book id or borrower id)</h1>
                <input className="input-wide" value={query} onChange={e => setQuery(e.target.value)} />
                <button className="btn" onClick={e => { setOnlyOut(!onlyOut); getResults() }}>{onlyOut ? "Show only out books" : "Show all books"}</button>
                <button className="btn" onClick={getResults}>Search</button>
            </div>
            <div>
                <section className='booklist'>
                    {results.map((row) =>
                        <Loan key={row.Loan_id} RefreshCallback={getResults} {...row} />
                    )}
                </section>
            </div>
        </div>
    );
}

export default CheckIn;