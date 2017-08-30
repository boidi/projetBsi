let consql = require('../config/db');
let classSalarie = require('../models/salarie');
function avantForm(req,res) {
    if(!req.session.admin === true){
        res.send('ERROR404');
    }
    classSalarie.getsalarie(function(result)
    {
        res.render('ajoutAvantages', {employes: result})
    })
}
module.exports={
    getAvantages:avantForm};