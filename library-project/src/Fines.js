import { React, useState, useEffect } from 'react';
import Fine from './Fine'

function Fines() {
    const showOnlyPaidQuery = 'select book_loans.card_id, SUM(fines.fine_amt) as Fine_amt from book_loans INNER JOIN fines where book_loans.loan_id=fines.loan_id AND fines.paid=true GROUP BY book_loans.card_id;';
    const showOnlyUnpaidQuery = 'select book_loans.card_id, SUM(fines.fine_amt) as Fine_amt from book_loans INNER JOIN fines where book_loans.loan_id=fines.loan_id AND fines.paid=false GROUP BY book_loans.card_id;';

    const [checked, setChecked] = useState(true);
    const [results, setResults] = useState([]);

    const getResults = () => {
        let query = checked ? showOnlyPaidQuery : showOnlyUnpaidQuery;
        fetch("/api/query/" + query)
            .then(result => result.json())
            .then(result => setResults(result));
    };

    useEffect(() => {
        getResults();
    });
    const updateFines = () => {
        const today = new Date();
        const currentDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        const calculateFineQuery = "(select loan_id, IF(ISNULL(date_in), DATEDIFF('" + currentDate + "', due_date), DATEDIFF(date_in, due_date)) as daydiff from book_loans)"
        const insertNewFinesQuery = "insert into fines select loan_id, 0.25*daydiff as fine, 0 from "
            + calculateFineQuery + " as t1 WHERE daydiff> 0 and loan_id not in (select loan_id from fines);"
        const updateOldFinesQuery = "UPDATE fines, (select loan_id as l, 0.25 * daydiff as fine from"
            + calculateFineQuery + " as t1 WHERE daydiff > 0)"
            + "as t2 SET fines.Fine_amt = t2.fine WHERE t2.l = fines.loan_id AND fines.paid = 0 AND t2.fine <> fines.fine_amt;";
        //runs the two queries to insert new fines into the fine table and update old fines. then refershes the fine display
        fetch("/api/query/" + insertNewFinesQuery).then(result => fetch("/api/query/" + updateOldFinesQuery).then(() => { getResults(); alert('fines updated!'); }));
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
                            <Fine key={row.Loan_id} Paid={checked} updateCallback={getResults} {...row} />)
                    }
                    )}
                </section>
            </div>
        </div>
    );
}

export default Fines;