let consql = require('../config/db');
class avantages {
    static getavantage(calb) {
        consql.query('SELECT * FROM typeAvantages', function (err, resultat) {
            if(err) throw (err);
            calb(resultat);
        })
    }
    static createAvant(libelle,calb){
        consql.query('INSERT INTO typeAvantages(libelle) VALUES(?)',
            [libelle],function(err,resultat){
            if(err)throw err;
           calb(resultat)
        })
  }
}
module.exports=avantages;