let consql = require('../config/db');
class bilan {
    static getbilan(login,calb) {
        consql.query('SELECT  salarie.nom,salarie.prenom, salarie.poste,salarie.civilite ,formation.intitule,' +
        'formation.cout,DATEDIFF(formation.datefin,formation.datedebut)as duree,total.totalcout,' +
        'total.nbrejours FROM salarie LEFT OUTER JOIN ' +
        'formation ON salarie.id=formation.id_salarie ' +
        'LEFT OUTER JOIN' +
        '(' +
        '    SELECT id_salarie,SUM(cout)AS totalcout, SUM(DATEDIFF(datefin,datedebut))AS nbrejours FROM formation GROUP BY id_salarie)AS total ON total.id_salarie=salarie.id' +
        '    WHERE salarie.login=?',[login], function (err, rows, meta) {

            if (err) throw err;

            calb(rows);
            console.log(rows);

        })
    }
}
module.exports = bilan;