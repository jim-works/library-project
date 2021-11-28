import { React } from 'react';

const PayHandler = (Card_id) => {
    const amountToPay = prompt("Enter amount to pay:");
    alert("You have paid $" + amountToPay + " toward the fine");
};

function Fine({ card_id, Fine_amt, Paid }) {
    return <div className="book">
        <h1>Card id: {card_id}</h1>
        <h4><i>Amount: {Fine_amt}</i></h4>
        {
            Paid && <button className="btn" onClick={() => PayHandler(card_id)}>Pay</button>
        }

    </div>
}

export default Fine;
