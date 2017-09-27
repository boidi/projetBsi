/*let consql = require('../config/db');*/
let modelSalarie = require('../models/salarie');
let bcrypt =require('bcrypt');
let saltRounds=8;

function ajoutSalarie(req,res) {
    if (req.body.nom === null || req.body.prenom === null || req.body.civilite === null ||
        req.body.poste === null || req.body.naisdate === null || req.body.motDePass === null || req.body.login === null ||
         req.body.isadmin === null) {
        res.render('fichesalarie');
    } else {
        let nom = req.body.nom;
        let prenom = req.body.prenom;
        let civilite = req.body.civilite;
        let poste = req.body.poste;
        let nombreEnf = req.body.nbreEnf;
        let datenais = req.body.naisdate;
        let email = req.body.email;
        let mdp = req.body.motDePass;
        let hash=bcrypt.hashSync(mdp,saltRounds);
        let login = req.body.login;
        let adresse = req.body.adresse;
        let codeposte = req.body.codeposte;
        let admin = req.body.isadmin;
        modelSalarie.ajoutS(nom, prenom, civilite, poste, nombreEnf, datenais,
            email, hash, login, adresse, codeposte, admin, function () {
//redirige vers  la liste des salarie
            res.redirect('/listeEmployes');
        })
    }
}
module.exports = {
    ajoutSctrl : ajoutSalarie};