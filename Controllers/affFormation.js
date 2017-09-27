let consql = require('../config/db');
let getFormations =require('../models/classFormations');
function afficheFormation (req,res) {
    if(!req.session.admin === true){
        res.send('ERROR404');
    }
   getFormations.listeFomation(function(results) {


        res.render('ajoutFormation',{formations:results})
    })
}
module.exports={
   getformation:afficheFormation};
