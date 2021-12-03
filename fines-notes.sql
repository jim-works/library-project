
-- update existing fines, gives safe update mode error
UPDATE fines, 
	(select loan_id as l, 0.25*daydiff as fine from 
		(select loan_id, IF(ISNULL(date_in), DATEDIFF('2021-11-30', due_date), DATEDIFF(date_in,due_date)) as daydiff from book_loans) as t1 WHERE daydiff>0)
	as t2
SET fines.Fine_amt = t2.fine
WHERE t2.l=fines.loan_id AND fines.paid=0 AND t2.fine <> fines.fine_amt;
	 

-- new fines
insert into fines select loan_id, 0.25*daydiff as fine, 0 from 
		(select loan_id, IF(ISNULL(date_in), DATEDIFF('2021-11-30', due_date), DATEDIFF(date_in,due_date)) as daydiff from book_loans) as t1 WHERE daydiff>0 and loan_id not in (select loan_id from fines);
        
-- select fines which are able to be paid (you can't pay back a fine for a book that hasn't been returned or pay a fine that's already paid off)
select book_loans.loan_id, card_id, date_in, fine_amt from book_loans INNER JOIN (select * from fines where fines.paid=0) as t 
where t.Loan_id = book_loans.Loan_id AND NOT ISNULL(date_in);

-- pay back fine
UPDATE fines SET fines.paid=1 WHERE fines.loan_id=1; 

select book_loans.card_id, SUM(fines.fine_amt) as Fine_amt from book_loans INNER JOIN fines where book_loans.loan_id=fines.loan_id AND fines.paid=false GROUP BY book_loans.card_id;