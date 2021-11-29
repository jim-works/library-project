import { React } from 'react';

const CheckOutHandler = (isbn) => {
    const card_id = prompt("Enter borrower's card number:");
    const getCountSQL = "/api/query/SELECT COUNT(*) as count FROM book_loans WHERE Card_id=" + card_id + " AND date_in IS NULL;";
    const testCardIdSQL = '/api/query/SELECT COUNT(*) as count FROM borrower WHERE Card_id=' + card_id + ';';
    //insert check out code here
    fetch(testCardIdSQL).then(result => result.json()).then(result => { if (result[0].count === 0) alert("Could not check out book: borrower not found!") });
    fetch(getCountSQL)
        .then(result => result.json()).then(result => result[0].count)
        .then(count => {
            console.log(count);
            console.log(getCountSQL);
            if (count >= 3) {
                alert("Could not check out book: the selected borrower has 3 or more books out!")
                return;
            }
            fetch("/api/query/SELECT COUNT(*) as count FROM book_loans WHERE Isbn=" + isbn + " AND date_in IS NULL;")
                .then(result => result.json()).then(result => result[0].count)
                .then(count => {
                    if (count > 0) {
                        alert("Could not check out book: the selected book is already checked out!");
                        return;
                    }
                    //Creates new tuple in BOOK_LOANS with new unique primary key for loan_id
                    const today = new Date();
                    const due = new Date(Date.now() + 12096e5); //2 weeks into the future
                    var currentDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

                    //14 days from now
                    var dueDate = due.getFullYear() + '-' + (due.getMonth() + 1) + '-' + due.getDate();
                    //get new loan id
                    fetch("/api/query/SELECT MAX(loan_id)+1 AS loan_id FROM book_loans;")
                        .then(result => result.json()).then(result => result[0].loan_id)
                        .then(loan_id => {
                            //create book loan record
                            fetch("/api/query/INSERT INTO book_loans(loan_id, isbn, card_id, date_out, due_date, date_in) VALUES ("
                                + loan_id + ", '" + isbn + "', " + card_id + ", '" + currentDate + "', '" + dueDate + "', NULL);")
                                .then(result => {
                                    if (result.ok) {
                                        alert("Checked out " + isbn + " for borrower id " + card_id);
                                    }
                                }).catch(reason => alert("error in processing query: " + reason.toString()));;
                        }).catch(reason => alert("error in processing query: " + reason.toString()));;
                }).catch(reason => alert("error in processing query: " + reason.toString()));;
        }).catch(reason => alert("error in processing query: " + reason.toString()));
}

const CheckInHandler = (isbn10) => {
    //insert check in code here
    alert("Checked in " + isbn10);

}

function Book({ Isbn, Isbn13, Title, Author, Cover, Publisher, Pages, checkedOut }) {
    console.log(checkedOut.toString());
    return <div className="book">
        {/*<img src={cover} alt="" />*/}
        <h1>{Title}</h1>
        <h4><i>{Author}</i></h4>
        <h4><i>{Publisher}</i></h4>
        <h6>Isbn: {Isbn}</h6>
        {/*<h6>isbn13: {isbn10}</h6>*/}
        <h6>{Pages} pages</h6>
        {
            checkedOut
                ? <button className="btn" onClick={() => CheckInHandler(Isbn)}>Check in</button>
                : <button className="btn" onClick={() => CheckOutHandler(Isbn)}>Check out</button>
        }

    </div>
}

export default Book;
