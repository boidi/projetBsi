let consql= require('../config/db');
class salarieF {
    static allformationS(calb) {
        consql.query('SELECT  salarie.nom,salarie.prenom,salarie.id,formation.intitule as intitule,formation.id,DATE_FORMAT(formation.datedebut, "%d/%m/%Y")as datedebut,DATE_FORMAT(formation.datefin, "%d/%m/%Y")as datefin ,formation_salarie.salarie_id,formation_salarie.formation_id FROM salarie, formation ,formation_salarie' +
            ' WHERE salarie.id=formation_salarie.salarie_id AND formation.id= formation_salarie.formation_id', function (err, resultat, meta) {

            if (err) throw err;

            calb(resultat);
            console.log(resultat);
        })
    }
    static deleteFormation(id,calb){

    }
}
module.exports = salarieF;
/*
SELECT  salarie.nom,salarie.prenom, salarie.poste,salarie.civilite ,formation.intitule,
    formation.cout,DATEDIFF(formation.datefin,formation.datedebut)as duree,total.totalcout,
    total.nbrejours FROM salarie LEFT OUTER JOIN
formation ON salarie.id=formation.id_salarie
LEFT OUTER JOIN
(
    SELECT id_salarie,SUM(cout)AS totalcout, SUM(DATEDIFF(datefin,datedebut))AS nbrejours FROM formation GROUP BY id_salarie)AS total ON total.id_salarie=salarie.id
WHERE salarie.login

vouvelle jointure pour total formation

SELECT salarie.id,formation.id ,formation.intitule,DATEDIFF(formation.datefin,formation.datedebut)as duree ,total.totalcout,total.nbrejours FROM salarie ,formation ,formation_salarie,
 (
    SELECT id ,SUM(cout)AS totalcout, SUM(DATEDIFF(datefin,datedebut))AS nbrejours FROM formation GROUP BY id)AS total
WHERE salarie.id=formation_salarie.salarie_id AND formation.id=formation_salarie.formation_id AND salarie.id=5

*/