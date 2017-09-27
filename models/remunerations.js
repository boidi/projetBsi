let consql =require('../config/db');
class remunerations{
    static ajoutremunerations( variable,fixe,detail,annee,idsalarie,calb){
        consql.query('INSERT INTO remunerations(variables,fixe,detail,annee,id_salarie) VALUES(?,?,?,?,?)', [variable,fixe,detail,annee,idsalarie],function (err, result) {
            if(err)throw err;
            calb(result)
        })
    }
    static getallS(calb){
        consql.query('SELECT salarie.nom,salarie.id,remunerations.id_salarie,remunerations.id,remunerations.variables,remunerations.fixe,remunerations.annee FROM salarie JOIN remunerations ON salarie.id=remunerations.id_salarie',function (err,resultat) {
            if(err)throw err;
            calb(resultat)
        })
    }
    static deleteRemuneration(id,calb){
        consql.query('delete from remunerations WHERE id=?',[id],function (err,result) {
            if(err)throw err;
            calb(result);
        })
    }
}
module.exports =remunerations;