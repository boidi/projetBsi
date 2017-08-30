let consql = require('../config/db');
class Salarie {
    //fonction avec des parametres equivalant aux champ du formulaire d'enregistrement et une fonction callback
    static ajoutS(nom, prenom, civilite, poste, nombreEnf, datenais, email, mdp,login,adresse,codeposte,admin, calb) {

        consql.query('INSERT INTO salarie (nom, prenom,civilite,poste,nbre_enf_min,nais_date,email,mdp,' +
            'login,adresse,codePoste,isadmin) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)', [nom, prenom, civilite, poste, nombreEnf, datenais, email, mdp,
            login, adresse, codeposte, admin], function (error, resultat, meta) {
            if (error) throw error;
            console.log(resultat);
            calb(resultat);

        })
    }
    static modifS(){
        let reqUpdate = " UPDATE salarie SET (nom, poste  , nbre_enf_min  " +
            ", email , mdp  , login ,adresse  , codePoste ) VALUES(?,?,?,?,?,?,?) WHERE id = ?";

        consql.query(reqUpdate,[req.body.lenom,req.body.leposte,req.body.nbreE,req.body.nemail,
            req.body.modpass,req.body.login,req.body.nadresse,
            req.body.codepost,req.params.id],function(err,res){
            if(err) throw err;
    })
    }
    static findUserinfo(login,calb){
        consql.query('SELECT nom,prenom,poste FROM salarie WHERE login=? ',[login],function(err, rows, meta) {
            if (err) throw err;
            calb(rows)

        })
    }
    static infoConnect(login,mdp,calb){
        consql.query('SELECT * FROM salarie WHERE login =? AND mdp=?'
            ,[login,mdp],function(err,result,meta) {
                if (err) throw err;
                calb(result)
    })
    }
    static getsalarie(calb){
     consql.query('SELECT id,nom,prenom FROM salarie',function(err, result, meta){
         if(err) throw err;
         calb(result)
     })
    }

}
//exporter l'objet
module.exports= Salarie;
