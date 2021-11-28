-- create-tables.sql:
-- drops and creates tables for use in the project
-- BOOK and BORROWER are prepopulated with information in the CSV files using server/loader.js
DROP TABLE IF EXISTS FINES;
DROP TABLE IF EXISTS BOOK_AUTHORS;
DROP TABLE IF EXISTS BOOK_LOANS;
DROP TABLE IF EXISTS BOOK;
DROP TABLE IF EXISTS AUTHORS;
DROP TABLE IF EXISTS BORROWER;
CREATE TABLE BORROWER (
    Card_id INT NOT NULL,
    Ssn CHAR(11),
    First_name VARCHAR(100),
    Bname VARCHAR(100),
    Email VARCHAR(256),
    Address VARCHAR(256),
    City VARCHAR(128),
    State VARCHAR(8),
    Phone VARCHAR(32),
	PRIMARY KEY (Card_id),
    UNIQUE (Ssn)
);
CREATE TABLE AUTHORS (
	Author_id VARCHAR(256) NOT NULL,
    Name VARCHAR(256),
    PRIMARY KEY (Author_id)
);
CREATE TABLE BOOK (
    Isbn CHAR(10) NOT NULL,
    Isbn13 CHAR(13),
    Title VARCHAR(256) NOT NULL,
    Author VARCHAR(256),
    Cover VARCHAR(1000),
    Publisher VARCHAR(256),
    Pages INT,
    PRIMARY KEY (Isbn)
);
CREATE TABLE BOOK_AUTHORS (
	Author_id VARCHAR(256) NOT NULL,
    Isbn CHAR(10) NOT NULL,
    FOREIGN KEY (Author_id) REFERENCES AUTHORS(Author_id),
    FOREIGN KEY (Isbn) REFERENCES BOOK(Isbn)
);
CREATE TABLE BOOK_LOANS (
    Loan_id INT NOT NULL,
    Isbn CHAR(10) NOT NULL,
    Card_id INT NOT NULL,
    Date_out DATE NOT NULL,
    Due_date DATE NOT NULL,
    Date_in DATE,
    
    PRIMARY KEY (Loan_id),
    FOREIGN KEY (Isbn) REFERENCES BOOK(Isbn),
    FOREIGN KEY (Card_id) REFERENCES BORROWER(Card_id)
);
CREATE TABLE FINES (
    Loan_id INT NOT NULL,
    Fine_amt DOUBLE,
    Paid BOOLEAN,
    
    FOREIGN KEY (Loan_id) REFERENCES BOOK_LOANS(Loan_id)
);








