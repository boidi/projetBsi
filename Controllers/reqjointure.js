
let consql = require('../config/db');
function affannee(req,res){

    if(req.session.admin === false){
        res.send('ERROR404');
    }

    consql.query('SELECT Max(annee)as annee  FROM salarie,remunerations WHERE login=? AND salarie.id=remunerations.id_salarie',[req.session.userLogin],function(err, resultat, meta) {
        if (err) throw err;
console.log(resultat);
        res.render('bilanSalarie',{result:resultat});
    });

}
module.exports ={
    reqjoint:affannee
};