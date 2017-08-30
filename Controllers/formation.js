let consql = require('../config/db');
let modelFormation = require('../models/classFormations')

function ajoutFormation (req,res) {
    console.log(req.body);
    if (req.body.intitule === null || req.body.datedebut === null || req.body.datefin === null ||
        req.body.duree === null || req.body.montant === null || req.body.idsalarie === null) {
        res.render('ajoutFormation');
    } else {
        //si tous les champ sont remplis on stocke les données ds des variables pr les enregistrées ds la bd
        let intitule = req.body.intitule;
        let datedebut = req.body.datedebut;
        let datefin = req.body.datefin;
        let montant = req.body.montant;
        let idsalarie = req.body.idsalarie;
        //insertion
        modelFormation.saveformation(intitule, datedebut, datefin, montant, idsalarie, function () {


            /*redirige  à la page d'accueil de l'admin connecté*/
            res.redirect('/admin');

        })


    }
}
module.exports = {formationCtrl:ajoutFormation};