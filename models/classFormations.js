
let consql = require('../config/db');
class Formations {
    static saveformation(intitule, datedebut, datefin, montant, calb) {
        consql.query('INSERT INTO formation(intitule,datedebut,datefin,cout)' +
            ' VALUES(?,?,?,?)',
            [intitule, datedebut, datefin,  montant], function (err, resultat) {
                if (err) throw err;
                calb(resultat);
                console.log(resultat);
            })
    }
    static listeFomation(calb){
        consql.query('SELECT id,intitule,DATE_FORMAT(datedebut, "%d/%m/%Y")as datedebut,DATE_FORMAT(datefin, "%d/%m/%Y")as datefin FROM formation',function(err,results,meta){
            if(err) throw err;
            calb(results)
        })
    }
}
module.exports=Formations;