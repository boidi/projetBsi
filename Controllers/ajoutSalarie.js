let consql = require('../config/db');
let modelSalarie = require('../models/salarie');

function ajoutSalarie(req,res) {
    console.log(req.body);
    //on recupere les données du formulaires grace au req.body
    if (req.body.nom === null || req.body.prenom === null || req.body.civilite === null || req.body.poste === null
        || req.body.nbreEnf === null || req.body.naisdate === null || req.body.email === null
        || req.body.motDePass === null || req.body.login === null || req.body.adresse === null
        || req.body.codeposte === null || req.body.isadmin === null) {
        res.render('fichesalarie');
    } else {
        //on stock les données saisies dans des variables pour les enregistrer dans  la bd
        let nom = req.body.nom;
        let prenom = req.body.prenom;
        let civilite = req.body.civilite;
        let poste = req.body.poste;
        let nombreEnf = req.body.nbreEnf;
        let datenais = req.body.naisdate;
        let email = req.body.email;
        let mdp = req.body.motDePass;
        let login = req.body.login;
        let adresse = req.body.adresse;
        let codeposte = req.body.codeposte;
        let admin = req.body.isadmin;
        //on insere dans la table salarie avec la methode static de la class salarie

        modelSalarie.ajoutS(nom, prenom, civilite, poste, nombreEnf, datenais,
            email, mdp, login, adresse, codeposte, admin, function () {
//redirige vers le formulaire la liste des salarie
            res.redirect('/listeEmployes');
        })
    }
}

module.exports = {
    ajoutSctrl : ajoutSalarie
}