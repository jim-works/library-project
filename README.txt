Dependencies: node.js, mysql

How to run:

1. startup mysql server (in admin command prompt: mysqld --console)
2. initialize tables if needed:
	a) execute create-tables.sql
	b) run "node server/loader.js" (this may take a few minutes to complete, it is done once there are 25000 book entries)
3. run node backend:
	"cd server"
	"node index.js"
4. in a separate terminal, run frontend:
	"cd library-project"
	"npm start"
5. webpage should open. if not, go to http://localhost:3000

If webpage doesn't work, please run "npm install" in both the server and library-project folders and try again.

Team Contributions
Nathan Stewart - made the Fines section of the database

Ethan Duong - made the book check in and check out parts of the database.

Luxin Wang - made the Borrower Management to add new borrowers to the database.

Luis Vazquez - made the book search

Jim Moore - created the GUI and overall design of the software, as well as the readme and quick start guide

