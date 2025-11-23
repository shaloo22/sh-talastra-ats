const express = require('express');
require("dotenv").config();
const mongoose = require('mongoose');
const cors = require("cors");
const bodyParser = require('body-parser');

// Database connection
const connection = require("./Config/Database.js");

// Routes
const UserRouter = require("./Routes/UserRoute");
const ProfileRouter = require("./Routes/ProfileCreation");
const ClientRouter = require('./Routes/Clients');
const JobRouter = require('./Routes/Jobs');
const RecruitmentRouter = require('./Routes/RecruitmentCycle.js');
const ReportRouter = require('./Routes/Report.js');
const SettingRouter = require('./Routes/SettingRouter.js');
const GetClient = require("./Routes/GetClient");
const GetPOCByClient = require('./Routes/GetPOCByClient.js');


// Candidate Routes
const CandidateRouter = require("./Routes/CandidateRoute");
const StatusRouter = require("./Routes/StatusRoute");
const FollowupRouter = require("./Routes/FollowupRoute");

// -----| Configration |-----
const app = express();


// Middleware
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.set('strictQuery', false);
connection();

// Route handling
app.use("/uploads", express.static("uploads"));
app.use('/clients', GetClient);
app.use('/poc', GetPOCByClient);
app.use('/', UserRouter);
app.use('/profile', ProfileRouter);
app.use('/client', ClientRouter);
app.use('/job', JobRouter);
app.use('/details', RecruitmentRouter);
app.use('/report', ReportRouter);
app.use('/settings', SettingRouter);


// Candidate Routes
app.use("/candidate", CandidateRouter);   
app.use("/status", StatusRouter);         
app.use("/followup", FollowupRouter);     

// Start server
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
