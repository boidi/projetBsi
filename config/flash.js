module.exports= function (req,res,next) {
if(req.session.flash){
    //on recupere l'erreur dans une variable locale
    res.locals.flash = req.session.flash
    //supprime la session
    req.session.flash = undefined
}
req.flash=function (type,content) {
    if(req.session.flash === undefined){
        req.session.flash = {}
    }
    req.session.flash[type] = content
}
next()
}