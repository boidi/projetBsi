
let consql = require('../config/db');
function affichebilanF(req,res){

    if(req.session.admin === false){
        res.send('ERROR404');
    }

    consql.query('SELECT  salarie.nom,salarie.prenom, salarie.poste,salarie.civilite ,formation.intitule,' +
        'formation.cout,DATEDIFF(formation.datefin,formation.datedebut)as duree,total.totalcout,total.nbrejours FROM salarie LEFT OUTER JOIN ' +
        'formation ON salarie.id=formation.id_salarie ' +
        'INNER JOIN' +
        '(' +
        '    SELECT id_salarie,SUM(cout)AS totalcout, SUM(DATEDIFF(datefin,datedebut))AS nbrejours FROM formation GROUP BY id_salarie)AS total ON total.id_salarie=salarie.id' +
        '    WHERE salarie.login=?',[req.session.userLogin],function(err, resultat, meta) {
        if (err) throw err;
        console.log(resultat);
        res.render('bilanformation',{salarie:resultat});
    });
    /*

 SELECT DISTINCT salarie.nom,formation.id_salarie,formation.intitule,DATEDIFF(formation.datefin,formation.datedebut)AS
  dure,total.totalcout,total.dureetotal,remunerations.type,remunerations.montant,remunerations.annee
FROM
 salarie
 LEFT OUTER JOIN formation ON salarie.id = formation.id_salarie
 JOIN
(
    SELECT id_salarie,SUM(cout)AS totalcout, SUM(DATEDIFF(datefin,datedebut))AS dureetotal FROM formation WHERE  id_salarie=5)AS total ON total.id_salarie=salarie.id
    LEFT OUTER JOIN remunerations ON remunerations.id_salarie=salarie.id
    WHERE salarie.id=5 AND remunerations.annee=2017*/
}



module.exports ={bilanformation:affichebilanF};