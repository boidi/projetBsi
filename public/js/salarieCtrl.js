function surligne(champ, erreur)
{
    if(erreur)
        champ.style.backgroundColor = "#fba";
    else
        champ.style.backgroundColor = "";
}
//
function verifChamp(champ)
{
    if(champ.value.length < 2 || champ.value.length > 100 || !isNaN(champ.value))
    {
        surligne(champ, true);
        return false;
    }
    else
    {
        surligne(champ, false);
        return true;
    }
}
function verifCp(champ) {
    let cout = parseInt(champ.value);
    if(champ.value.length<5||isNaN(cout) ||champ.value.length>5){
        alert('le code postal n\'est pas bien renseigné!');
        surligne(champ,true);
        return false
    }
    else
    {
        surligne(champ, false);
        return true;
    }
}

function verifSaisie(f) {
    if(verifChamp(f.nom)&& verifChamp(f.prenom)&& verifChamp(f.poste) && verifChamp(f.motDePass) && verifChamp(f.login)&& verifChamp(f.adresse)&& verifCp(f.codeposte)){
        alert('les données ont été bien enregistrées!');
        return true
    }else {
        alert ('verifiez que tous les champs sont bien remplis');
        return false
    }
}
