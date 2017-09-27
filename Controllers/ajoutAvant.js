let consql = require('../config/db');
function avantageCtrl (req,res){
    console.log(req.body);
    if(req.body.idtype === undefined  || req.body.idsalarie === undefined ||req.body.montant === undefined || req.body.annee===undefined){
        //si erreur redirige vers le formulaire avec un message d'erreur
        res.redirect('/ficheavantages');
    }else {
        //si tous les champ sont remplis on stocke les données ds des variables pr les enregistrées ds la bd
        let idtype = req.body.idtype;
        let detail =req.body.commentaire;
        let montant =req.body.montant;
        let idsalarie =req.body.idsalarie;
        let annee = req.body.annee;
        //insertion
        consql.query('INSERT INTO avantages(idtype,detail,valeur,dateAvantages,id_salarie)     ' +
            ' VALUES(?,?,?,?,?)', [idtype,detail,montant,annee,idsalarie],function(err,resultat){
                if(err)throw err;

                console.log(resultat);
            res.redirect('/admin');

                });



    }
}
module.exports ={ ajoutAvant :avantageCtrl};