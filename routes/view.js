const router = require('express').Router();
let Data = require('../data_model.js')

router.route('/')
    .get((req,res)=>{
        Data.find({})
        .then(response=>{
            //res.send(response);
            res.render('../views/index.ejs', {data:response});
        })
        .catch((err)=>console.log(err));
    });    

router.route('/:id')
    .put((req,res)=>{
        console.log(req.params.id)
        Data.findById(req.params.id)
        .then(store =>{
            store.last_open= new Date();

            store.save()
            .then(()=> res.json("Updated Date"))
            .catch( err => res.status(400).json('Error: '+err));

        })
        .catch((err)=>console.log(err));
    });


module.exports= router;