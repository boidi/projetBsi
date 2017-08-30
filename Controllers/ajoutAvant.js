let consql = require('../config/db');
function avantageCtrl (req,res){
    console.log(req.body);
    if(req.body.libelle === undefined ||req.body.montant === undefined || req.body.idsalarie === undefined || req.body.annee===undefined){
        //si erreur redirige vers le formulaire avec un message d'erreur
        res.redirect('/ficheavantages');
    }else {
        //si tous les champ sont remplis on stocke les données ds des variables pr les enregistrées ds la bd
        let libelle = req.body.libelle;
        let montant =req.body.montant;
        let detail =req.body.commentaire;
        let idsalarie =req.body.idsalarie;
        let annee = req.body.annee;
        //insertion
        consql.query('INSERT INTO avantages(libelle,montant,detail,dateAvantages,id_salarie)         VALUES(?,?,?,?,?)', [libelle,montant,detail,annee,idsalarie],function(err,resultat){
                if(err)throw err;

                console.log(resultat);
            res.redirect('/admin');

                });



    }
}
module.exports ={ ajoutAvant :avantageCtrl};