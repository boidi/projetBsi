let salarie= require("../models/salarie");

describe("test de l'ajout de salarie", function () {
    it("test requete sql", function () {
        let page = salarie.ajoutS();
        expect(page).toBedefined;
    });
})