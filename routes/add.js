const router = require('express').Router();
let Data = require('../data_model.js')

router.route('/')
    
    .get((req,res)=>{
        res.render('../views/add');
    })
    .post((req,res)=>{
        console.log(req.body);
        const shopname = req.body.ShopName;
        const home_delivery = req.body.HD ;
        const items= req.body.items;
        const phone_number = Number(req.body.PhoneNo) ;
        const last_open = new Date() ;
        const latitude = Number(req.body.Latt) ;
        const longitude = Number(req.body.Long) ;
        const store= new Data({shopname, home_delivery, items, phone_number,
            last_open, latitude, longitude});

        store.save()
        .then(()=> res.json("Store added"))
        .catch( err => res.status(400).json('Error: '+err));

    });


    module.exports= router;