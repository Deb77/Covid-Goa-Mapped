const express = require('express');
const mongoose = require('mongoose');

const app= express();
const router= express.Router();
const port= 5000;


app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

const uri= "mongodb+srv://covidgoamapped:covidgoamapped@cluster0-ccugl.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(uri,{ useNewUrlParser: true , useCreateIndex: true, useUnifiedTopology: true});


const viewRouter= require("./routes/view.js");
const addRouter= require("./routes/add.js");

app.use('/', viewRouter);
app.use('/add', addRouter);





app.listen(port, () => console.log(`Running on port ${port}!`));

