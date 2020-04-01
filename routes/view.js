const router = require('express').Router();
let Data = require('./data_model.js')

router.route('/')
    .get((req,res)=>{
        Data.find({})
        .then(response=>{
            res.render('', response);
        })
        .catch((err)=>console.log(err));
    })
    .put((req,res)=>{
        Data.findById(req.body.id)
        .then(store =>{
            store.last_open= new Date();

            store.save()
            .then(()=> res.json("Updated Date"))
            .catch( err => res.status(400).json('Error: '+err));

        })
        .catch((err)=>console.log(err));
    });


module.exports= router;