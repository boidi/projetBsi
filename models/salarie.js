let consql = require('../config/db');
class Salarie {

    static ajoutS(nom, prenom, civilite, poste, nombreEnf, datenais, email, mdp,login,adresse,codeposte,admin, calb) {

        consql.query('INSERT INTO salarie (nom, prenom,civilite,poste,nbre_enf_min,nais_date,email,mdp,' +
            'login,adresse,codePoste,isadmin) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)', [nom, prenom, civilite, poste, nombreEnf, datenais, email, mdp,
            login, adresse, codeposte, admin], function (error, resultat, meta) {
            if (error) throw error;
            /*console.log(resultat);*/
            calb(resultat);
        })
    }
    static modifS(nom,prenom,poste,nbreenf,email,hash,login,adresse,cdposte,iduser,calb){
        let reqUpdate = ' UPDATE salarie SET nom=?,prenom=?,poste=?,nbre_enf_min=?,' +
            'email=?,mdp=?,login=?,adresse=?,codePoste=?  WHERE id = ?';

        consql.query(reqUpdate,[nom,prenom,poste,nbreenf,email,
            hash,login,adresse,
            cdposte,iduser],function(err,resultat){
            if(err) throw err;
            calb(resultat);
    })
    }
    static findUserinfo(login,calb){
        consql.query('SELECT nom,prenom,poste FROM salarie WHERE login=? ',[login],function(err, rows, meta) {
            if (err) throw err;
            calb(rows);

        })
    }
    static infoConnect(login,calb){
        consql.query('SELECT * FROM salarie WHERE login =? ',[login],function(err,result) {
                if (err) throw err;
                calb(result);
    })
    }

    static getsalarie(calb){
     consql.query('SELECT id,nom,prenom FROM salarie',function(err, result, meta){
         if(err) throw err;
         calb(result)
     })
    }
    static finduser(id,calb){
        consql.query('SELECT * FROM salarie WHERE id = ?',[id],function (err,result){
           if(err)throw err;
           calb(result);
        }

        )
    }
    static deleteuser(id,calb){
        consql.query('DELETE FROM salarie WHERE id=?',[id],function (err,result) {
           if(err) throw err;
           calb(result);
        })
    }

}
//exporter l'objet
module.exports= Salarie;
