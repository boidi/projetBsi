/**
 * Created by boidi on 03/07/17.
 */

let express = require('express');
let app = express();
let consql = require('./config/db');
let flash = require('express-flash');

//middleware pour recuperer les données du formulaire
//app.use(express.cookieParser());
let bodyParser = require('body-parser');
let session = require('express-session');
let methodOverride = require('method-override');
//Routes module
let logoutctrl = require('./Controllers/deconnexion');
let connectRoutes = require('./Controllers/connexionCtrl');
let ajoutsalarie = require('./Controllers/ajoutSalarie');
let ajoutavantage = require('./Controllers/ajoutAvant');
let formations = require('./Controllers/formation');
let remunerations = require('./Controllers/remuneration');
let admin = require('./Controllers/admin');
let utilisateur = require('./Controllers/utilisateurs');
let bilan =require('./Controllers/bilan');
let modifFiche = require('./Controllers/modif');
let getAvantage = require('./Controllers/avantageCtrl');
let listeS = require('./Controllers/listeS');
let bilanF = require('./Controllers/bilanFormation');
let getformation = require('./Controllers/affFormation');
/*let getsalaire = require('./Controllers/affRemuneration');*/
//app.use(flash());

//utilisation

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        let method = req.body._method;
        delete req.body._method;
        return method
    }
}));
app.use(session({
    secret: 'kfgudrydrh',
    resave: true,
    saveUninitialized: true,
   // cookie: { maxAge: 60000 }
}));
//creation d'un middleware
app.use(require('./config/flash'));
//pour utiliser les fichiers statiques
//process.cwd() affiche le chemin du fichier stactic
/*app.use("/public", express.static(process.cwd()+ "/public"));
console.log(process.cwd()+ "/public");*/
app.use(express.static('public'));

//moteur de template
app.set('view engine','ejs');

// route for views
//page d'accueil

app.get('/',function(req,res){
    res.render('pageConnection')
});

//affiche la vue de connexion d'un salarié
app.get('/utilisateurs', utilisateur.userCtrl);

//affiche la vue de connexion d'un admin
app.get('/admin',admin.adminCtrl);

//affiche formulaire d'enregistrement d'une fiche salarié
app.get('/enregistrement',function(req,res){
    res.render('fichesalarie')
});

//affiche le formulaire de formation

// affiche le formulaire d'ajout formation et affiche la liste des salariés
app.get('/formations',getformation.getformation);

//affiche formulaire remuneration
app.get('/remunerations',function (req,res) {
    consql.query('SELECT id,nom,prenom FROM salarie',function (err, result, meta) {
        if (err) throw err;
        console.log(result);
        //console.log(meta); donne des infos sur la requete
        res.render('ajoutRemuneration', {employes: result});
    })
});

//affiche la liste des employés
app.get('/listeEmployes',listeS.afficheliste);

//affiche la vue du bilan
app.get('/bilan',bilan.bilanCtrl);

app.get('/bilanFormation',bilanF.bilanformation);

//affiche le formulaire avantages
app.get('/ficheavantages',getAvantage.getAvantages);

//Controllers pour enregistrer les données des formulaires dans la base de données
app.post('/newsalarie',ajoutsalarie.ajoutSctrl);

//Controllers formations
app.post('/newformation',formations.formationCtrl);

//Controllers remunerations
app.post('/remunerations', remunerations.remunerationCtrl);

// Controllers avantages pour ajouter les avantages par salarié dans la base de données
app.post('/avantages', ajoutavantage.ajoutAvant);

//affiche la page de connexion
app.get('/connexion', function (req, res) {
    res.render('pageConnection');
});
//modifier une fiche salarie
app.get('/modifsalarie/:id', (req,res) => {
    consql.query('SELECT * FROM salarie WHERE id = ?',[req.params.id],function (err,result) {
        res.render('modiFiche',{result:result})
    });
});
//supprimer un salarie
app.delete('/deleteSalarie/:id', (req,res) => {

    let reqsuppression = "DELETE FROM salarie WHERE id=?;";
    consql.query(reqsuppression,[req.params.id], function(err, res){
        if(err) throw err;

    });
    res.redirect('/listeEmployes');


});
//authentification de l'utilisateur
  app.post('/connexion',connectRoutes.connect);

app.get('/deconnexion',logoutctrl.getlogoutctrl);
//enregistre les modifications dans la bdd
app.put('/salarie/:id',modifFiche.modifCtrl);


//ecouter le serveur sur le port 8080
app.listen(9000);