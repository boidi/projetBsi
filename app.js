/**
 * Created by boidi on 03/07/17.
 */

let express = require('express');
let app = express();
let consql = require('./config/db');

//middleware pour recuperer les données du formulaire
let bodyParser = require('body-parser');
//utilisation
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
//pour utiliser les fichiers statiques
app.use("/public", express.static(process.cwd()+ "/public"));
console.log(process.cwd()+ "/public");
//moteur de template
app.set('view engine','ejs');

//les routes :affiche accueil
app.get('/',function(req,res){
    res.render('Accueil')
});
//affiche formulaire d'enregistrement d'une fiche salarié
app.get('/enregistrement',function(req,res){
    res.render('fichesalarie')
});

//affiche le formulaire de formation
app.get('/formations',function(req,res){
    res.render('ajoutFormation')
});
//routes pour enregistrer les données du formulaire dans la base de données
app.post('/newsalarie',function(req,res){
    console.log(req.body)
    //on recupere les données du formulaires grace au req.body
    if (req.body.nom ===null || req.body.prenom === null || req.body.civilite === null || req.body.poste === null
        || req.body.nbreEnf === null || req.body.naisdate === null || req.body.email === null
        || req.body.motDePass=== null || req.body.login === null || req.body.adresse === null
        || req.body.codeposte === null || req.body.isadmin === null )//reste 6 champ à remplir
    {
        res.render('fichesalarie');
    }else {
        //on stock les données saisies dans des variables pour les enregistrer dans  la bd
        let nom = req.body.nom;
        let prenom = req.body.prenom;
        let civilite = req.body.civilite;
        let poste = req.body.poste;
        let nombreEnf= req.body.nbreEnf;
        let datenais= req.body.naisdate;
        let email = req.body.email;
        let mdp = req.body.motDePass;
        let login = req.body.login;
        let adresse = req.body.adresse;
        let codeposte = req.body.codeposte;
        let admin =req.body.isadmin;
        //on insere dans la table salarie
        consql.query('INSERT INTO salarie (nom, prenom,civilite,poste,nbre_enf_min,nais_date,email,mdp,' +
            'login,adresse,codePoste,isadmin) VALUES(?,?,?,?,?,?,?,?,?,?,?)',[nom,prenom,civilite,poste,nombreEnf,datenais,email,mdp,
                login,adresse,codeposte,admin],function(err, resultat, meta){
            if (err) throw err;
            console.log(resultat);
            res.redirect('formationn');
        });

    }
});
//ecouter le serveur sur le port 8080
app.listen(8080);