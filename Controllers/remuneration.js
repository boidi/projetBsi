let consql = require('../config/db');

function ajoutSalaire(req,res){
    console.log(req.body);
    if(req.body.type === null ||req.body.montant === null || req.body.annee === null ||
        req.body.idsalarie === null ){
        res.render('ajoutRemuneration');

    }else {
        //si tous les champ sont remplis on stocke les données ds des variables pr les enregistrées ds la bd
        let type = req.body.type;
        let montant =req.body.montant;
        let annee = req.body.annee;
        let detail= req.body.detail;
        let idsalarie =req.body.idsalarie;
        //insertion
        consql.query('INSERT INTO remunerations(type,montant,detail,annee,id_salarie) VALUES(?,?,?,?,?)',
            [type,montant,detail,annee,idsalarie],function(err,resultat){
                if(err)throw err;
                console.log(resultat);
                /*req.flash('success', 'vous avez ajouter une formation!');*/
                res.redirect('/admin');

            });

    }
}
module.exports = {remunerationCtrl:ajoutSalaire};