
let consql = require('../config/db');
let classSalarie = require('../models/salarie');

function connectCtrl(req,res) {
    if(req.body.login == null || req.body.motdepass == null ){
        res.redirect('/');
    }
    let login = req.body.login;
    let mdp = req.body.motdepass;
    classSalarie.infoConnect(login,mdp,function(result){
        console.log(result);
        if (result.length === 1) {
            req.session.userLogin = login;
           //verifie la valeur du champ isadmin
            if (result[0].isadmin === 0 ) {
                req.session.admin = true;
                req.flash('success', 'vous êtes connecté !');
                console.log('connexion ok ');
                res.redirect('/utilisateurs');
            } else if (result[0].isadmin === 1) {
                req.session.admin = true;
                req.flash('success', 'vous êtes connecté !');
                console.log(result[0].isadmin);
                res.redirect('/admin');
            }
        } else {
            console.log('connection ko');
            req.session.admin = false;
            req.flash('error', 'login and password are incorrect try again !');
            res.redirect('/connexion')
        }

    })
};
 module.exports = {
    connect: connectCtrl};
