let consql = require('../config/db');
function listeSalarie(req,res) {
    consql.query('SELECT id,nom,prenom,poste,login,adresse FROM salarie',function(err, result, meta) {
        if (err) throw err;
        console.log(result);
        //console.log(meta); donne des infos sur la requete
        res.render('liste', {employes: result});
    });
}
module.exports={
    afficheliste:listeSalarie
};