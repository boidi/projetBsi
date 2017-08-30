function logoutCtrl(req,res) {
    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    })
};
//pour exporter le module en un objet (cle : valeur)
    module.exports ={
    getlogoutctrl: logoutCtrl};
