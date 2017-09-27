/**
 * Created by boidi on 03/07/17.
 */

let express = require('express');
let app = express();
/*let consql = require('./config/db');*/
let flash = require('express-flash');

//middleware pour recuperer les données du formulaire
//app.use(express.cookieParser());
let bodyParser = require('body-parser');
let session = require('express-session');
let methodOverride = require('method-override');
let bcrypt =require('bcrypt');
let saltRounds=8;
//Routes module
//controleur deconnexion
let logoutctrl = require('./Controllers/deconnexion');
//controleur connexion
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
let getFormations =require('./models/classFormations');
let classSalarie = require('./models/salarie');
let formationSctrl = require ('./Controllers/formationS');
let salarieF =require('./models/salarieF');
let bilanS =require('./models/bilan');
let typeavant =require('./Controllers/typeavantage');
let avantages =require('./models/avantages');
let modifS = require('./Controllers/modif');
let classRemunerations= require('./models/remunerations');
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

// affiche le formulaire d'ajout de formations
app.get('/formations',getformation.getformation);

//affiche formulaire remuneration
app.get('/remunerations',function (req,res,next) {
    classSalarie.getsalarie(function (result) {
        res.locals.employes = result;

        //console.log(meta); donne des infos sur la requete

    });
    next()
},function (req,res) {
   classRemunerations.getallS(function (resultat) {
      let result=res.locals.employes;
       res.render('ajoutRemuneration', {employes: result,salaires:resultat});
   })

});

//affiche la liste des employés
app.get('/listeEmployes',listeS.afficheliste);

//affiche la vue du bilan
app.get('/bilan',function (req,res,next) {

    if (!req.session.admin === true) {

        res.send('ERROR404');

    }
    bilanS.getbilan(req.session.userLogin, function (resultat) {


        res.locals.bformation = resultat;

    });
    next();
},function(req,res,next){
    bilanS.getSalaire(req.session.userLogin,function(results){
        res.locals.salaire =results;
    });
    next();
    },function(req,res,next){
        bilanS.getsalaireb(req.session.userLogin,function(rows){
            res.locals.salaireb =rows;
        });
        next();
},
function(req,res) {
    bilanS.bilanavantages(req.session.userLogin,function(result){

console.log((result));
    let resultat=res.locals.bformation;
    let results= res.locals.salaire;
    let rows= res.locals.salaireb;

    res.render('bilanSalarie',{salarie:resultat,avantages:result,salaires:results,salaireb:rows});
});
});

//formulaire pour ajouter d'autres type d'avantages
app.get('/typeavant',function (req,res) {
    res.render('typeAvantages')
});
//ajout type avantage
app.post('/newtypeAvant',typeavant.typeAvant);

//affiche le formulaire pour les formations/salarie
app.get('/formationSalarie', function (req,res,next) {
    classSalarie.getsalarie(function (result) {
       /* console.log(result);*/
        /*variable qui recupere le resultat de la requete  dans une variable locals
         pour l'utilisation ds le middleware suivant*/
        res.locals.salarie = result;

    });
    next();
},function(req,res,next){
    salarieF.allformationS(function (resultat) {
        console.log(resultat);
        res.locals.allformations = resultat;
    });
    next();
},function(req,res){
    getFormations.listeFomation(function (results) {
        console.log(results);

        let result = res.locals.salarie;
        let resultat =res.locals.allformations;

        res.render('formationSalarie', {formation: results, employes: result,allformation:resultat});
    })
    });

app.get('/bilanFormation',bilanF.bilanformation);

//affiche le formulaire avantages

app.get('/ficheavantages',function (req,res,next) {
    if(!req.session.admin === true){
        res.send('ERROR404');
    }
    classSalarie.getsalarie(function(result)
    {
        res.locals.salarie =result;
    });

next();
},function(req,res) {
   avantages.getavantage(function(resultat){

        console.log(resultat);
        let result = res.locals.salarie;


        res.render('ajoutAvantages', {employes: result, typeavant: resultat});

});
});
app.post('/ficheavantages',getAvantage.getAvantages);

//Controllers pour enregistrer les données des formulaires dans la base de données
app.post('/newsalarie',ajoutsalarie.ajoutSctrl);

//Controllers formations
app.post('/newformation',formations.formationCtrl);

//Controllers remunerations
app.post('/remunerations', remunerations.remunerationCtrl);
app.post('/formationSalarie',formationSctrl.formationSctrl);

// Controllers avantages pour ajouter les avantages par salarié dans la base de données
app.post('/avantages', ajoutavantage.ajoutAvant);

//affiche la page de connexion
app.get('/connexion', function (req, res) {
    res.render('pageConnection');
});
//modifier une fiche salariée
app.get('/modifsalarie/:id', function(req,res) {
    classSalarie.finduser(req.params.id,function (result) {
        res.render('modiFiche',{result:result})
    });
});
//supprimer un salarie
app.delete('/deleteSalarie/:id', (req,res) => {
classSalarie.deleteuser(req.params.id,function(){

    res.redirect('/listeEmployes');
});
});
//authentification de l'utilisateur
  app.post('/connexion',connectRoutes.connect);

app.get('/deconnexion',logoutctrl.getlogoutctrl);
//enregistre les modifications dans la bdd
app.put('/salarie/:id',modifFiche.modifCtrl);


//ecouter le serveur sur le port 9000
app.listen(9000);