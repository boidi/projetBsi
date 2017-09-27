let consql = require('../config/db');
let classSalarie = require('../models/salarie');

function afficheAdmin(req,res) {
    if(!req.session.admin === true){
        res.send('ERROR404');
    }else {

        classSalarie.findUserinfo(req.session.userLogin, function (rows) {
            console.log(rows);
            res.render('AccueilAdmin', {salarie: rows});
        });
    }
}
module.exports = {adminCtrl:afficheAdmin};