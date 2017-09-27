/*let consql = require('../config/db');*/
let bilan =require('../models/bilan');
function affichebilan(req,res,next) {

    if (!req.session.admin === true) {

        res.send('ERROR404');

    }
    bilan.getbilan(req.session.userLogin, function (resultat) {


        res.locals.bformation = resultat;

    });
    next();
}
 function affavantages(req,res,next) {
    bilan.bilanavantages(req.session.userLogin,function(result){
        res.locals.bavantages=rows;
    });
    next()
}function afficheall(req,res){
    let resultat=res.locals.bformation;
    let result =res.locals.bavantages;
        res.render('bilanSalarie',{salarie:resultat,bavantages:result});
  }

    /*exple function (req,res,next) {
    classSalarie.getsalarie(function (result) {
        console.log(result);
        /*variable qui recupere le resultat de la requete  dans une variable locals pour l'utilisation ds le middleware suivant
res.locals.salarie = result;

});
next();
},function(req,res,next){
    salarieF.allformationS(function (resultat) {
        console.log(resultat);
        res.locals.allformations = resultat;
    });
    next();
},function(req,res){
    getFormations.listeFomation(function (results) {
        console.log(results);

        let result = res.locals.salarie;
        let resultat =res.locals.allformations;

        res.render('formationSalarie', {formation: results, employes: result,allformation:resultat});
    })
}*/



module.exports ={bilanCtrl:affichebilan};