const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");
// import { ToastContainer, toast } from "react-toastify";



app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "123456789",
  database: "employeesystem",
});


  app.post("/create", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    // if (password !== confirmPassword) {
    //   toast.error("The password is not same!");
    // } else 
    //============Hashing part==================
    //   const newPass = req.body.password;
    //   let hashedPass = newPass.toString();
    //   const salt = bcrypt.genSalt(20);
    //   newPass = bcrypt.hash(newPass, salt);
    //   password = hashedPass;
    // console.log(typeof(hashedPass));
    //==========================================

    db.query(
      "INSERT INTO employees(name, email,password) VALUES (?,?,?)",
      [name, email, password],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Values Inserted");
        }
      }
    );
  });

app.listen(3001, () => {
  console.log("on port 3001 server is up");
});
