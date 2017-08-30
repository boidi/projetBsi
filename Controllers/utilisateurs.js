let consql = require('../config/db');
let classSalarie = require('../models/salarie');

function afficheuser(req,res) {
    if(!req.session.admin === true){
        res.send('ERROR404' );
    }

    classSalarie.findUserinfo(req.session.userLogin,function (resultat) {

        res.render('pageUtilisateur',{salarie:resultat});
    });
}
module.exports={userCtrl:afficheuser};

/*consql.query('SELECT nom,prenom,poste FROM salarie WHERE login=? ',[req.session.userLogin],function(err, resultat, meta) {
        if (err) throw err;
*/