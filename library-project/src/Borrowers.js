import { React, useState } from 'react';

function Borrowers() {
    const [borrower, setBorrower] = useState({ First_name: '', Bname: '', Ssn: '', Address: '', Email: '', City: '', State: '', Phone: '' });
    const createBorrower = () => {
        if (borrower.First_name === '' || borrower.Bname === '' || borrower.Ssn === '' || borrower.Address === '') {
            alert("Name, SSN, and Address must ALL have values entered!");
            return;
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(borrower)
        };
        fetch('/api/createBorrower', requestOptions)
            .then(response => {
                switch (response.status) {
                    case 201:
                        alert("Successfully created borrower!");
                        break;
                    case 400:
                        alert("Can't create a borrower with a non-unique SSN!");
                        break;
                    default:
                        alert("Error creating borrower");
                        break;
                }
            })
    };

    return (
        <div className="app">
            <div className="bookinput">
                <h1>Add a borrower</h1>
                <p> First Name: </p>
                <input className="input-wide" value={borrower.First_name} onChange={e => setBorrower({ ...borrower, First_name: e.target.value })} />
                <p> Last Name: </p>
                <input className="input-wide" value={borrower.Bname} onChange={e => setBorrower({ ...borrower, Bname: e.target.value })} />
                <p> SSN: </p>
                <input className="input-wide" value={borrower.Ssn} onChange={e => setBorrower({ ...borrower, Ssn: e.target.value })} />
                <p> Address: </p>
                <input className="input-wide" value={borrower.Address} onChange={e => setBorrower({ ...borrower, Address: e.target.value })} />
                <p> Email: </p>
                <input className="input-wide" value={borrower.Email} onChange={e => setBorrower({ ...borrower, Email: e.target.value })} />
                <p> City: </p>
                <input className="input-wide" value={borrower.City} onChange={e => setBorrower({ ...borrower, City: e.target.value })} />
                <p> State: </p>
                <input className="input-wide" value={borrower.State} onChange={e => setBorrower({ ...borrower, State: e.target.value })} />
                <p> Phone: </p>
                <input className="input-wide" value={borrower.Phone} onChange={e => setBorrower({ ...borrower, Phone: e.target.value })} />
                <button className="btn" onClick={createBorrower}>Add borrower</button>
            </div>
        </div>
    );
}

export default Borrowers;