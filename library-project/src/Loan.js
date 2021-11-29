import { React } from 'react';
const CheckInHandler = (loan_id, callback) => {
    var today = new Date();
    var dateReturned = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    fetch("/api/query/UPDATE book_loans SET Date_in ='" + dateReturned + "' where loan_id = " + loan_id + ";")
        .then(result => {
            if (result.ok) {
                alert("Checked in loan id " + loan_id);
            } else {
                alert("Error checking in!");
            }
        })
        .finally(callback());


}

function Loan({ Loan_id, Isbn, Card_id, Date_out, Due_date, Date_in, RefreshCallback }) {
    return <div className="book">
        <h1>Isbn: {Isbn}</h1>
        <h4><i>Card id: {Card_id}</i></h4>
        <h4><i>Loan id: {Loan_id}</i></h4>
        <h4><i>Date out: {Date_out}</i></h4>
        <h4><i>Due date: {Due_date}</i></h4>
        <h4><i>Date in : {Date_in || "Not returned yet."}</i></h4>
        <h6>Isbn: {Isbn}</h6>
        {
            !Date_in && <button className="btn" onClick={() => CheckInHandler(Loan_id, RefreshCallback)}>Check in</button>
        }

    </div>
}

export default Loan;
