
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
function verifcout(champ) {
    let cout = parseInt(champ.value);
    if(cout<10 ||isNaN(cout)||cout>10000){
        alert('le cout de la formation est anormal');
        surligne(champ,true);
        return false
    }
    else
    {
        surligne(champ, false);
        return true;
    }
}
//fonction pour obliger à saisir une date de fin superieur à la date de debut de formation

function dateCtrl(champ){
    let debut=document.getElementById('datedebut').value;
    let datedebut =new Date(debut);
    let datefin =new Date(champ.value);
    if(datedebut>datefin){
        alert ('La date de fin ne doit pas être antérieure à la date de début.');
        surligne(champ,true);
        return false
    }else{
        surligne(champ,false);
        return true
    }
}
function verifForm(f) {
    if(verifChamp(f.intitule)&& verifcout(f.montant)&& dateCtrl(f.datefin)){
        alert('les données ont été bien enregistrées!');
        return true
    }else {
        alert ('verifiez que tous les champs sont bien remplis');
        return false
    }
}
