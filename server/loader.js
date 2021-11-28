const mysql = require('mysql')
const fs = require('fs');
const { table } = require('console');

const port = 3001;
var connected = false;

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "sys",
});
con.connect((err) => {
    if (err) throw err;
    console.log("connected!");
    connected = true;

});

const readCSV = (path, headers, sep = ',', skip_first_row = true) => {
    let file = fs.readFileSync(path, { encoding: 'utf-8' });
    let lines = file.toString().split('\r\n');
    output = []
    lines.forEach((line, index) => {
        if (skip_first_row && index === 0) return;
        cols = line.split(sep);
        entry = {
            labels: [],
            values: [],
        };
        for (let i = 0; i < headers.length; i++) {
            entry.labels.push(headers[i]);
            entry.values.push(cols[i]);
        }
        output.push(entry);
    });
    return output;
}

//use parameters
const createWildcardInsertQuery = (tableName, entry) => {
    output = `INSERT INTO ${tableName} VALUES (`
    for (let i = 0; i < entry.values.length - 1; i++) {
        output += `?,`
    }
    output += `?);`
    return output;
}

const insert = (sql, wildcard_query, entry) => {
    sql.query(wildcard_query, entry.values, function (error, results, fields) {
        if (error) console.log(error);
    });
}

const format_borrower = (borrower) => {
    borrower.values[0] = parseInt(borrower.values[0].substring(2));
    return borrower;
}

const load_borrowers = (path) => {
    const borrowers = readCSV(path, ['Card_id', 'Ssn', 'First_name', 'Bname', 'Email', 'Address', 'City', 'State', 'Phone']);
    const borrowers_query_base = createWildcardInsertQuery("borrower", borrowers[0]);
    borrowers.forEach((elem) => {
        let formatted = format_borrower(elem);
        insert(con, borrowers_query_base, formatted);
    });
    console.log("borrowers inserts sent!");
}


const format_book = (book) => {
    book.values[6] = parseInt(book.values[6]);
    return book;
}

const load_books = (path) => {
    const books = readCSV(path, ['Isbn', 'Isbn13', 'Title', 'Author', 'Cover', 'Publisher', 'Pages'], sep = '\t');
    const book_wildcard_query = createWildcardInsertQuery("book", books[0]);
    books.forEach((elem) => {
        let formatted = format_book(elem);
        insert(con, book_wildcard_query, formatted);
    });
    console.log("books inserts sent!");
}

load_borrowers('borrowers.csv')
load_books('books.csv');