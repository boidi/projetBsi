let consql = require('../config/db');
function formationSctrl (req,res){
    console.log(req.body);
    if(req.body.idsalarie === undefined ||req.body.formation === undefined){
        //si erreur redirige vers le formulaire avec un message d'erreur
        res.redirect('/formationSalarie');
    }else {
        //si tous les champ sont remplis on stocke les données ds des variables pr les enregistrées ds la bd
        let idsalarie = req.body.idsalarie;
        let idformation =req.body.formation;
        //insertion
        consql.query('INSERT INTO formation_salarie(formation_id,salarie_id)  VALUES(?,?)', [idformation,idsalarie],function(err,resultat){
            if(err)throw err;

            console.log(resultat);
            res.redirect('/admin');

        });



    }
}
module.exports ={ formationSctrl :formationSctrl};