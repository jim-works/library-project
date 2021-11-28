Dependencies: node.js, mysql

How to run:

1. startup mysql server (in admin command prompt: mysqld --console)
2. initialize tables if needed:
	a) execute create-tables.sql
	b) run "node server/loader.js"
3. run node backend:
	"cd server"
	"node index.js"
4. in a separate terminal, run frontend:
	"cd library-project"
	"npm start"
5. webpage should open. if not, go to http://localhost:3000
