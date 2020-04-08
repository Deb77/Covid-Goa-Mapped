const router = require('express').Router();
let Data = require('../data_model.js')

router.route('/')
    
    .get((req,res)=>{
        res.render('../views/add');
    })
    .post((req,res)=>{
        const shopname = req.body.ShopName;
        const home_delivery = req.body.HD ;
        const item = req.body.item;
        let items = ' ';
        item.forEach((it)=>{
            items+=it.items+',';
        });
        if(req.body.itemCus!=='')
        {
            items += req.body.itemCus
        }
        else{
            items=items.substring(0,items.length-1);
        }
        const phone_number = Number(req.body.PhoneNo) ;
        const last_open = new Date() ;
        
        const latitude = Number(req.body.Latt) ;
        const longitude = Number(req.body.Long) ;
        const store= new Data({shopname, home_delivery, items, phone_number,
            last_open, latitude, longitude});
            console.log(store);

        store.save()
        .then(()=> {
        res.redirect("/");}
        )
        .catch( err => res.status(400).json('Error: '+err));
        
    });
    

    module.exports= router;