let consql = require('../config/db');
class bilan {

    static getbilan(login,calb) {
        consql.query('SELECT salarie.id,salarie.nom AS nom,salarie.prenom AS prenom,salarie.civilite,formation.intitule,formation.cout, bilanf.couttotal as totalcout,DATEDIFF(formation.datefin,formation.datedebut)AS duree,bilanf.dureetotal as nbrejours,formation_salarie.formation_id FROM '+
        'salarie  JOIN '+
        '(' +
            'SELECT bilan.idsalarie as id,SUM(bilan.cout)AS couttotal,SUM(bilan.duree) ' +
            'as dureetotal FROM '+
        '( ' +
            'SELECT  salarie.id as idsalarie,salarie.nom,salarie.prenom, salarie.poste,salarie.civilite ,formation.intitule, formation.id as id,'+
        'formation.cout as cout ,DATEDIFF(formation.datefin,formation.datedebut)as duree '+
        'FROM salarie,formation,formation_salarie '+
        'WHERE formation_salarie.formation_id=formation.id AND formation_salarie.salarie_id=salarie.id )AS bilan GROUP BY bilan.idsalarie '+
    ')AS bilanf ON salarie.id=bilanf.id ,formation,formation_salarie '+
        'WHERE formation_salarie.formation_id=formation.id AND  bilanf.id=formation_salarie.salarie_id AND salarie.login=?',[login], function (err, resultat, meta) {
            if (err) throw err;
            calb(resultat);})
    }
    static bilanavantages(login,calb){
        consql.query('SELECT typeAvantages.id,avantages.valeur as montant,salarie.id ,avantages.dateAvantages,typeAvantages.libelle as libelle,avantages.id_salarie,avantages.detail as commentaire,avantages.dateAvantages,b.montantAvantages '+
        ' FROM salarie JOIN avantages ON salarie.id=avantages.id_salarie,typeAvantages, '+
           ' ('+
                ' SELECT idsalarie,SUM(valeur)AS montantAvantages FROM '+
        '('+
            ' SELECT avantages.id,avantages.id_salarie AS idsalarie,avantages.valeur AS valeur ' +
            'FROM avantages)AS bilan GROUP BY idsalarie) b'+

       ' WHERE typeAvantages.id=avantages.idtype  AND avantages.dateAvantages= YEAR(CURRENT_DATE())' +
            'AND idsalarie=salarie.id AND salarie.login=? ' , [login], function (err, result){
            if( err) throw err;
            console.log(result);
            calb(result)
        })

    }
    static getSalaire(login,calb){
        consql.query('SELECT salarie.id,total.annee,total.variables,total.salaireb ,total.fixe ' +
            'FROM salarie LEFT JOIN' +
            ' (SELECT id,annee, variables,fixe,SUM(fixe+variables)AS salaireb,id_salarie' +
            ' AS idsalarie' +

            '  FROM remunerations GROUP BY id)as total ON salarie.id=total.idsalarie' +
            ' WHERE salarie.id=5 and annee BETWEEN (YEAR(CURRENT_DATE())-2)AND ' +
            ' YEAR(CURRENT_DATE()) AND salarie.login=? order by annee asc' ,[login],function (err,result){
            if(err) throw err;
            calb(result);
        })
    }
    static getsalaireb(login,calb){
        consql.query('SELECT salarie.id,total.annee,total.variables,total.salaireb ,total.fixe,b.avantages FROM salarie LEFT JOIN\n' +
            '(SELECT id,annee, variables,fixe,SUM(fixe+variables)AS salaireb,id_salarie AS idsalarie' +

       ' FROM remunerations GROUP BY id)as total ON salarie.id=total.idsalarie' +
        '  JOIN' +
        '   (SELECT idsalarie,SUM(valeur)AS avantages FROM ' +
            '        (' +
       ' SELECT avantages.id,avantages.id_salarie AS idsalarie,' +
      'avantages.valeur AS valeur FROM avantages' +
      ' WHERE avantages.dateAvantages=YEAR(CURRENT_DATE))AS bilan GROUP BY idsalarie) b' +
    ' ON salarie.id =b.idsalarie' +
     '  WHERE annee= YEAR(CURRENT_DATE()) AND salarie.login=?'
            ,[login],function (err,rows) {
            if(err) throw err;
                calb(rows);

        })
    }
        /*   SELECT salarie.id,total.annee,total.variables,total.salaireb ,total.fixe FROM salarie LEFT JOIN
(SELECT id,annee, variables,fixe,SUM(fixe+variables)AS salaireb,id_salarie AS idsalarie

       FROM remunerations GROUP BY id)as total ON salarie.id=total.idsalarie
       WHERE salarie.id=5 and annee BETWEEN (YEAR(CURRENT_DATE())-2)AND YEAR(CURRENT_DATE())


        jointures avantages

        SELECT  salarie.nom,salarie.prenom, salarie.poste,salarie.civilite ,avantages.libelle,avantages.detail,avantages.dateAvantages,avantages.montant,
       total.totalavantages,total.annee
         FROM salarie LEFT OUTER JOIN
        avantages ON salarie.id=avantages.id_salarie
        LEFT OUTER JOIN
        (
                       SELECT id_salarie,SUM(montant)AS totalavantages,MAX(dateAvantages)AS annee FROM avantages GROUP BY id_salarie)AS total ON total.id_salarie=salarie.id
                        WHERE salarie.id=5 AND avantages.dateAvantages= YEAR(CURRENT_DATE())

        finj javantages


        //remunerations


        SELECT * FROM
(SELECT id,annee, variables,fixe,SUM(fixe+variables)AS salaireb,id_salarie

       FROM remunerations GROUP BY id)as total
       WHERE id_salarie=5 and annee BETWEEN (YEAR(CURRENT_DATE())-2)AND YEAR(CURRENT_DATE())



        SELECT typeAvantages.id,typeAvantages.valeur,salarie.id ,typeAvantages.libelle,avantages.id_salarie,avantages.detail,avantages.dateAvantages
  FROM typeAvantages,avantages,salarie
 WHERE typeAvantages.id=avantages.idtype AND avantages.id_salarie=salarie.id AND salarie.id=5

          //  brute et nette
           SELECT salarie.id, idsalarie,avantage,fixe,variables,annee,ids,dateav FROM salarie LEFT JOIN


(
    SELECT avantages.id_salarie AS idsalarie ,avantages.valeur AS avantage,avantages.dateAvantages as dateav

     ,remunerations.id_salarie as ids,remunerations.variables,remunerations.fixe ,remunerations.annee FROM remunerations ,avantages
WHERE remunerations.id_salarie=avantages.id_salarie AND avantages.dateAvantages=remunerations.annee)AS b on salarie.id=b.idsalarie
WHERE idsalarie=5

 //fin

SELECT typeAvantages.id,typeAvantages.valeur ,typeAvantages.libelle
  FROM typeAvantages
  GROUP BY typeAvantages.libelle,typeAvantages.id



  new jointure avantages
  SELECT typeAvantages.id,typeAvantages.valeur as montant,salarie.id ,typeAvantages.libelle as libelle,avantages.id_salarie,avantages.detail as commentaire,avantages.dateAvantages
        FROM salarie LEFT JOIN avantages ON salarie.id=avantages.id_salarie,typeAvantages

         WHERE typeAvantages.id=avantages.idtype  AND salarie.id=5




        */


}
module.exports = bilan;