const express = require("express");
const app = express();
const util = require("util");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");

const saltRounds = 10;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "123456789",
  database: "employeesystem",
});

const query = util.promisify(db.query).bind(db);

app.post("/create", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  if (password === confirmPassword) {
    (async () => {
      try {
        const hash = await bcrypt.hash(req.body.password, saltRounds);

        await query(
          "INSERT INTO employees(name, email,password) VALUES (?,?,?)",
          [name, email, hash],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              res.send("Values Inserted");
            }
          }
        );
      } catch {}
    })();
  } else {
    console.error("Error");
  }
});

app.listen(3001, () => {
  console.log("on port 3001 server is up");
});
