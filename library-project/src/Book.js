import { React } from 'react';

function Book({ isbn10, isbn13, title, author, cover, publisher, pages }) {
    return <div className="book">
        <img src={cover} alt="" />
        <h1>{title}</h1>
        <h4><i>{author}</i></h4>
        <h4><i>{publisher}</i></h4>
        <h6>isbn10: {isbn10}</h6>
        <h6>isbn13: {isbn10}</h6>
        <h6>{pages} pages</h6>
    </div>
}

export default Book;
