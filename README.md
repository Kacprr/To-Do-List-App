Project done by Kacper Hetman

packages installed :
npm install express pg body-parser cors

To use the project :
Navigate to "server.js" in CLI
use the command "node server.js"
open the index.html file in prefered folder

Create the database table in postgres SQL using the code below :
CREATE DATABASE todo_db;

\c todo_db

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT FALSE
);

make sure to set your database credentials in the db.js file
