
var Estados= {
    NORMAL:1, //No esta infectado
    INFECTADO:2, //Tiene sangre vampira
    ESCLAVO:3, //Vampiro sin mente
    DURMIENTE:4, //Ha perdido casi toda la sangre vampira, pero se le puede controlar con telepatia
    VAMPIRO:5 //Vampiro real       
};

var Profesion = {
    VAGABUNDO: "Vagabundo", //Neutral
    OFICINISTA: "Oficinista", //Neutral 
    POLICIA: "Policia", //Ayuda a matar enemigos o defender la base
    PERIODISTA: "Periodista" //Ayuda a controlar la notoriedad
};


var TablaVampiros = {};

TablaVampiros.BAR = Coleccion([
    Profesion.POLICIA,
    Profesion.OFICINISTA,
    Profesion.OFICINISTA,
    Profesion.OFICINISTA,
    Profesion.PERIODISTA
]);

TablaVampiros.CALLEJON = Coleccion([
    Profesion.VAGABUNDO
]);

TablaVampiros.PORTAL = Coleccion([
    Profesion.OFICINISTA
]);

