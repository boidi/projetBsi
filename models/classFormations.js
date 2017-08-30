
let consql = require('../config/db');
class Formations {
    static saveformation(intitule, datedebut, datefin, montant, idsalarie, calb) {
        consql.query('INSERT INTO formation(intitule,datedebut,datefin,cout,id_salarie)' +
            ' VALUES(?,?,?,?,?)',
            [intitule, datedebut, datefin,  montant, idsalarie], function (err, resultat) {
                if (err) throw err;
                calb(resultat);
                console.log(resultat);
            })
    }
}
module.exports=Formations;