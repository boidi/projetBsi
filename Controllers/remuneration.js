let consql = require('../config/db');
let remunerations= require('../models/remunerations');

function ajoutSalaire(req,res){
    console.log(req.body);
    if(req.body.fixe === null ||req.body.variables===null||req.body.montant === null || req.body.annee === null ||
        req.body.idsalarie === null ){
        res.render('ajoutRemuneration');

    }else {
        //si tous les champ sont remplis on stocke les données ds des variables pr les enregistrées ds la bd
        let fixe= req.body.fixe;
        let variable =req.body.variables;
        let annee = req.body.annee;
        let detail= req.body.detail;
        let idsalarie =req.body.idsalarie;
                remunerations.ajoutremunerations(variable,fixe,detail,annee,idsalarie,function (result) {
                    res.redirect('/remunerations');

                })




    }
}
module.exports = {remunerationCtrl:ajoutSalaire};