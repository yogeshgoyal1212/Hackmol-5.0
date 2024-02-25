const express = require("express");
const app = express();
const fileuploader = require("express-fileupload");
const mysql2 = require("mysql2");

app.listen(4000, function () {
  console.log("server started successfully");
});
app.use(express.static("public"));
const congObj = {
  host: "127.0.0.1",
  user: "root",
  password: "Yogeshgoyal@1",
  database: "hackmol",
};
const mysql = mysql2.createConnection(congObj);
mysql.connect(function (err) {
  if (err == null) console.log("connected to database");
  else console.log(err.message);
});
app.get("/", function (req, resp) {
  let filePath = process.cwd() + "/public/hom.html"; //html name change
  resp.sendFile(filePath);
});

app.get("/login", function (req, resp) {
  let filePath = process.cwd() + "/public/login.html"; //html name change
  resp.sendFile(filePath);
});
app.use(express.urlencoded({ extended: true }));
app.use(fileuploader());
app.post("/profile-save", function (req, resp) {
  const email = req.body.txttEmail;
  const password = req.body.txtPwd;

  const status = 1;

  // users(emailid varchar(40) primary key,password varchar(30),utype varchar(20),status int , dos date);

  mysql.query(
    "insert into users values(?,?,?,current_date())",
    [email, password, status],
    function (err) {
      if (err == null) resp.send("record saved successfully");
      else resp.send(err.message);
    }
  );
});

app.post("/check-email", function (req, resp) {
  //email validation
  const emaill = req.body.email;
  mysql.query(
    "select * from users where emailid=?",
    [emaill],
    function (err, res) {
      if (res.length == 1) resp.send("not available");
      else resp.send("available");
    }
  );
});

app.get("/post-job", function (req, resp) {
  let filepath = process.cwd() + "/public/postjob.html";
  resp.sendFile(filepath);
});

app.get("/posted-job", function (req, resp) {
    let filepath = process.cwd() + "/public/postedjobs.html";
    resp.sendFile(filepath);
  });

app.get("/checkk-login-info", function (req, resp) {
  mysql.query(
    "select * from users where emailid = ? and password = ?",
    [req.query.email, req.query.password],
    function (err, resultJsonAry) {
      if (err) {
        resp.send(err.message);

        return;
      }

      if (resultJsonAry.length == 1) {
        if (resultJsonAry[0].status == 1) {
          resp.send("login successfully");
        } else resp.send("Ur Account Is blocked !! Contact Admin");
      } else {
        resp.send("Invalid email or password");
      }
    }
  );
});

app.get("/postjobb", function (req, resp) {
  const rid = 0;
  mysql.query(
    "insert into posttask values(?,?,?,?,?,?,?,?,?)",
    [
      rid,
      req.query.email,
      req.query.name,
      req.query.contact,
      req.query.state,
      req.query.city,
      req.query.sc,
      req.query.dat,
      req.query.Taskk,
    ],
    function (err) {
      if (err) {
        resp.send(err.message);
      } else {
        resp.send("data stored successfullyyy");
      }
    }
  );
});


app.get("/angular-fetch-cusprofile", function (req, resp) {
    mysql.query("select * from posttask", function (err, result) {
      if (err) {
        resp.send(err.message);
        return;
      } else resp.send(result);
    });
  });

  app.get("/sig", function (req, resp) {
    let filepath = process.cwd() + "/public/signup.html";
    resp.sendFile(filepath);
  });

 

  
