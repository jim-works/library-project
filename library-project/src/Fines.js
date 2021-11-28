import { React, useState } from 'react';
import Fine from './Fine'

function Fines() {
    const showOnlyPaidQuery = 'select book_loans.card_id, SUM(fines.fine_amt) as Fine_amt from book_loans LEFT JOIN fines ON fines.loan_id WHERE fines.paid=true GROUP BY book_loans.card_id;';
    const showOnlyUnpaidQuery = 'select book_loans.card_id, SUM(fines.fine_amt) as Fine_amt from book_loans LEFT JOIN fines ON fines.loan_id WHERE fines.paid = false GROUP BY book_loans.card_id';
    const [checked, setChecked] = useState(true);
    const [results, setResults] = useState([]);
    const getResults = () => {
        let query = checked ? showOnlyPaidQuery : showOnlyUnpaidQuery;
        fetch("/api/query/" + query)
            .then(result => result.json())
            .then(result => setResults(result));
    };
    const updateFines = () => {
        alert("fines updated!");
    };

    return (
        <div className="app">
            <div className="bookinput">
                <h1>Fines</h1>
                <button className="btn" onClick={e => { setChecked(!checked); getResults() }}>{checked ? "Show only paid fines" : "Show only unpaid fines"}</button>
                <button className="btn" onClick={updateFines}>Update fines</button>
            </div>
            <div>
                <section className='booklist'>
                    {results.map((row) => {
                        console.log(row); return (
                            <Fine key={row.Loan_id} Paid={checked} {...row} />)
                    }
                    )}
                </section>
            </div>
        </div>
    );
}

export default Fines;