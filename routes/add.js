const router = require('express').Router();
let Data = require('./data_model.js')

router.route('/')
    .get((req,res)=>{
        res.render('');
    })
    .post((req,res)=>{
        store = new Data;
        store.shopname = req.body.shopname;
        store.home_delivery = req.body.home_delivery ;
        store.phone_number = req.body.phone_number ;
        store.last_open = new Date() ;
        store.latitude = req.body.latitude ;
        store.longitude = req.body.longitude ;

        store.save()
        .then(()=> res.json("Store added"))
        .catch( err => res.status(400).json('Error: '+err));

    });


    module.exports= router;