let consql = require('../config/db');
let classSalarie = require('../models/salarie');
function afficheFormation (req,res) {
    if(!req.session.admin === true){
        res.send('ERROR404');
    }
   classSalarie.getsalarie(function(result)
    {
        res.render('ajoutFormation', {employes: result})
    })
}
module.exports={
   getformation:afficheFormation};
