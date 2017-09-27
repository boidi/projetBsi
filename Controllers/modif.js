let consql = require('../config/db');
let modelSalarie = require('../models/salarie');
let bcrypt =require('bcrypt');
let saltRounds=8;

function modifFicheS (req,res){
    // le bug etait dans la requete update
    let iduser =req.params.id;
    let nom=req.body.lenom;
    let prenom=req.body.prenom;
    let poste=req.body.leposte;
    let nbreenf=req.body.nbreE;
    let email=req.body.nemail;
    let mdp=req.body.modpass;
    let hash=bcrypt.hashSync(mdp,saltRounds);
    let login=req.body.nlogin;
    let adresse=req.body.nadresse;
    let cdposte=req.body.codepost;

   modelSalarie.modifS(nom,prenom,poste,nbreenf,email,hash,login,adresse,cdposte,iduser,function () {


    res.redirect('/listeEmployes')
   });
}





module.exports = {
    modifCtrl: modifFicheS
};