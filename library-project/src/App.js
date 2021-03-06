import { React, useState } from 'react';
import './App.css';
import BookPage from './BookPage';
import Borrowers from './Borrowers';
import CheckIn from './CheckIn';
import Fines from './Fines';

function App() {
    const [rendering, setRendering] = useState('Books');

    if (rendering === 'Books') {
        return <>
            <div className="bookinput">
                <button className="btn" onClick={() => setRendering('Borrowers')}>Borrowers</button>
                <button className="btn" onClick={() => setRendering('Fines')}>Fines</button>
            </div>
            <BookPage />
        </>
    } else if (rendering === 'Borrowers') {
        return <>
            <div className="bookinput">
                <button className="btn" onClick={() => setRendering('Fines')}>Fines</button>
                <button className="btn" onClick={() => setRendering('Books')}>Books</button>
            </div>
            <Borrowers />
            <CheckIn />
        </>
    } else {
        //fines
        return <>
            <div className="bookinput">
                <button className="btn" onClick={() => setRendering('Books')}>Books</button>
                <button className="btn" onClick={() => setRendering('Borrowers')}>Borrowers</button>
            </div>
            <Fines />
        </>
    }

}

export default App;
