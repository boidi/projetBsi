let consql = require('../config/db');
let modelSalarie = require('../models/salarie');

function modifFicheS (req,res){
    // le bug etait dans la requete update
    //a faire le mvc demain
    let reqUpdate = ' UPDATE salarie SET nom=?,poste=?,nbre_enf_min=?,email=?,mdp=?,login=?,adresse=?,codePoste=?  WHERE id = ?';

    consql.query(reqUpdate,[req.body.lenom,req.body.leposte,req.body.nbreE,req.body.nemail,
        req.body.modpass,req.body.nlogin,req.body.nadresse,
        req.body.codepost,req.params.id],function(err,res){
        if(err) throw err;

    });
    res.redirect('/listeEmployes')
}





module.exports = {
    modifCtrl: modifFicheS
};