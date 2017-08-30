let consql = require('../config/db');
let bilan =require('../models/bilan');
function affichebilan(req,res){

    if(!req.session.admin === true){
        {
            res.send('ERROR404');
        }
    }
    bilan.getbilan(req.session.userLogin,function (resultat) {


        res.render('bilanSalarie',{salarie:resultat});
  })
    }



module.exports ={bilanCtrl:affichebilan};