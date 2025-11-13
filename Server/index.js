const express = require('express')
require("dotenv").config();
const ngrok = require('ngrok');

var bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cors = require("cors");
const connection = require("./Config/Database.js");
const UserRouter = require("./Routes/UserRoute");
const ProfileRouter = require("./Routes/ProfileCreation");
const ClientRouter = require('./Routes/Clients');
const JobRouter = require('./Routes/Jobs');
const RecruitmentRouter = require('./Routes/RecruitmentCycle.js');
const ReportRouter = require('./Routes/Report.js');
const RouterReport = require('./Routes/Report.js');
const SettingRouter = require('./Routes/SettingRouter.js');

const app = express();
app.use(cors());
mongoose.set('strictQuery', false);
app.use(express.urlencoded({ extended: true }))

app.use(express.json());
app.use(bodyParser.json());

connection();

app.use('/', UserRouter);
app.use("/profile", ProfileRouter)
app.use("/client", ClientRouter)
app.use("/job", JobRouter)
app.use('/details', RecruitmentRouter)
app.use("/report", RouterReport)
app.use("/settings", SettingRouter);

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log("server is running on port :" + port)
})

