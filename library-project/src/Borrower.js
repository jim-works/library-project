import { React } from 'react';

function Borrower({ Card_id, Ssn, First_name, Bname, Email, Address, City, State, Phone }) {
    return <div className="book">
        <h1>{First_name} {Bname}</h1>
        <h4><i>Ssn: {Ssn}</i></h4>
        <h4><i>Card_id: {Card_id}</i></h4>
        <h6>Address: {Address}</h6>
        <h6>{City}, {State}</h6>
    </div>
}

export default Borrower;
