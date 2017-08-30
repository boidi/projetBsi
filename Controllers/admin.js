let consql = require('../config/db');
let classSalarie = require('../models/salarie');

function afficheAdmin(req,res) {
    if(!req.session.admin === true){
        res.send('ERROR404');
    }else {

        classSalarie.findUserinfo(req.session.userLogin, function (resultat) {
            console.log(resultat);
            res.render('AccueilAdmin', {salarie: resultat});
        });
    }
}
module.exports = {adminCtrl:afficheAdmin};