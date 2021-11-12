-- create-tables.sql:
-- drops and creates tables for use in the project

DROP TABLE IF EXISTS BOOK;
CREATE TABLE BOOK (
    isbn10 CHAR(10) NOT NULL,
    isbn13 CHAR(13),
    title VARCHAR(256) NOT NULL,
    author VARCHAR(256),
    cover VARCHAR(1000),
    publisher VARCHAR(256),
    pages INT,
    CONSTRAINT pk_isbn10 PRIMARY KEY (isbn10)
);

DROP TABLE IF EXISTS BORROWER;
CREATE TABLE BORROWER (
    id INT NOT NULL,
    ssn CHAR(11),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(256),
    address VARCHAR(256),
    city VARCHAR(128),
    state VARCHAR(8),
    phone VARCHAR(32),
    CONSTRAINT pk_id PRIMARY KEY (id)
);