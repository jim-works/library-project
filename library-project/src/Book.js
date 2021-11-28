import { React } from 'react';

const CheckOutHandler = (isbn10) => {
    const borrowerId = prompt("Enter borrower id:");
    //insert check out code here

    alert("Checked out " + isbn10 + " for borrower id " + borrowerId);
    //failure messages
    // alert("Could not check out book: the selected borrower has too many books out!");
    // alert("Could not check out book: the selected borrower does not exist!");
    // alert("Could not check out book: the selected book is already checked out!");
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
