import { React } from 'react';

const PayHandler = (Card_id, totalOutstanding, updateCallback) => {
    const getFinesQuery = "select book_loans.loan_id, card_id, date_in, fine_amt from book_loans INNER JOIN (select * from fines where fines.paid=0) as t "
        + "where t.Loan_id = book_loans.Loan_id AND NOT ISNULL(date_in) AND card_id=" + Card_id + ";";
    fetch("/api/query/" + getFinesQuery).then(result => result.json()).then(result => {
        if (result.length === 0) {
            var alertText = "There are no fines availble to pay."
            alertText += "\nThere are $" + totalOutstanding + " fines for books that have not returned yet. These books must be returned before the fine can be paid.";
            alert(alertText);
            return;
        }
        var infoText = "Type the number to the left of the fine to pay it:";
        var sum = 0;
        result.forEach((row, index) => {
            infoText += "\n(" + (index + 1) + "): Fine amount=$" + row.Fine_amt + ", Loan id=" + row.loan_id;
            sum += row.Fine_amt;
        })
        infoText += "\nThere are $" + (totalOutstanding - sum) + " fines for books that have not returned yet. These books must be returned before the fine can be paid.";
        var selection = prompt(infoText);
        if (selection === null) {
            return;
        }
        selection = parseInt(selection);
        if (isNaN(selection) || selection < 1 || selection > result.length) {
            alert("Invalid selection!")
            return;
        }
        fetch("/api/query/UPDATE fines SET fines.paid=1 WHERE fines.loan_id=" + result[selection - 1].loan_id + ";").then(result => {
            if (result.status === 200) { alert("Fine paid!"); updateCallback(); }
            else {
                alert("Error paying fine.");
            }
        });
    });
};

function Fine({ card_id, Fine_amt, Paid, updateCallback }) {
    return <div className="book">
        <h1>Card id: {card_id}</h1>
        <h4><i>Amount: {Fine_amt}</i></h4>
        {
            Paid && <button className="btn" onClick={() => PayHandler(card_id, Fine_amt, updateCallback)}>Pay</button>
        }

    </div>
}

export default Fine;
