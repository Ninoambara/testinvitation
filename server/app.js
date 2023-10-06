require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const { connect } = require("./config/mongodb");
const cors = require("cors");
const Controller = require("./controllers/controller");
const errorHandler = require("./middlewares/errorHandler");
const authentication = require("./middlewares/authentication");
const JobController = require("./controllers/jobController");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.post("/users-register", Controller.regis);
app.post("/users-login", Controller.login)
app.get("/users", Controller.findAll)

app.use(authentication)
app.get("/jobs", JobController.findAllJob)
app.get("/jobs/:id", JobController.findById)



app.use(errorHandler)
connect().then((db) => {
  // console.log(db)
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});
