const express = require('express');
const mongoose = require('mongoose');

const app= express();
const router= express.Router();
const port= 5000;

app.set('view engine', 'ejs');

const uri= "mongodb+srv://coutinho:chandorGOA2784272@cluster0-5mmmv.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(uri,{ useNewUrlParser: true , useCreateIndex: true});


const viewRouter= require("./routes/view.js");
const addRouter= require("./routes/add.js");

app.use('/', viewRouter);
app.use('/add', addRouter);





app.listen(port, () => console.log(`Running on port ${port}!`));

