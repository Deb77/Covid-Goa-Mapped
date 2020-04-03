const router = require('express').Router();
let Data = require('../data_model.js')

router.route('/')
    .get((req,res)=>{
        res.render('../views/add');
    })
    .post((req,res)=>{
        const shopname = req.body.shopname;
        const home_delivery = req.body.home_delivery ;
        const items= req.body.items;
        const phone_number = Number(req.body.phone_number) ;
        const last_open = new Date() ;
        const latitude = Number(req.body.latitude) ;
        const longitude = Number(req.body.longitude) ;
        const store= new Data({shopname, home_delivery, items, phone_number,
            last_open, latitude, longitude});

        store.save()
        .then(()=> res.json("Store added"))
        .catch( err => res.status(400).json('Error: '+err));

    });


    module.exports= router;