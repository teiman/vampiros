var Vampiro = (function(){

    var Base = {
        nombre: "desconocido",
        apellido: "desconocido"
    };


    function create(){
        var v = Object.assign({}, Base)
        v.nombre = randomNames.get();
        v.apellido = randomNames.get();
        v.estado = "";
        return v;
    }

    return {
        create: create
    };
})();