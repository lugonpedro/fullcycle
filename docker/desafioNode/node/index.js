const express = require("express");
const app = express();
const port = 3000;
const config = {
  host: "db",
  user: "root",
  password: "root",
  database: "nodedb",
};
const mysql = require("mysql");
const connection = mysql.createConnection(config);

const table = `CREATE TABLE if not exists people(
  id int not null auto_increment,
  name varchar(255), primary key(id)
)`;

connection.query(table);

const insert = `INSERT INTO people(name) values('Pedro')`;
connection.query(insert);

let people = [];
connection.query("SELECT * FROM people", function (err, result, fields) {
  if (err) throw err;
  result.forEach(function (row) {
    people.push(`<div><p>ID: ${row.id} - Nome: ${row.name}</p></div>`);
  });
});

connection.end();

app.get("/", (req, res) => {
  res.send(`<h1>Full Cycle Rocks!</h1><br />${people}`);
});

app.listen(port, () => {
  console.log("Rodando na porta: " + port);
});
