let consql = require('../config/db');
let avantages =require('../models/avantages');
function typaAvant (req,res){

    if(req.body.libelle === undefined){
        //si erreur redirige vers le formulaire avec un message d'erreur
        res.redirect('/typeavant');
    }else {
        //si tous les champ sont remplis on stocke les données ds des variables pr les enregistrées ds la bd
        let libelle = req.body.libelle;

        //insertion
       /* consql.query('INSERT INTO typeAvantages(libelle)  VALUES(?)', [libelle],function(err,resultat){
            if(err)throw err;*/
       avantages.createAvant(libelle,function(){
            /*console.log(resultat);*/
            res.redirect('/admin');

        });



    }
}
module.exports ={ typeAvant :typaAvant};