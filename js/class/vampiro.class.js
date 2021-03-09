var Vampiro = (function(){

    var Estados = {
        NORMAL:1,
        INFECTADO:2,
        ESCLAVO:3,
        DURMIENTE:4,
        VAMPIRO:5       
    };

    var Profesion = {
        Vagabundo: "Vagabundo",
        Oficinista: "Oficinista",
        Policia: "Policia",
        Periodista: "Periodista"
    };

    var Base = {
        nombre: "desconocido",
        apellido: "desconocido",
        estado: Estados.INFECTADO,
        profesion: Profesion.Vagabundo,
        presentado: false, // si este vampiro ha visitado ya al patriarca
        papa: "player" //esto igual se cambia luego para que otro vampiro pueda ser el creador
    };


    Base.getFullName = function(){
        return this.nombre + " "+ this.apellido;
    };

    Base.render = function(){
        $(".data-vnombre").text( this.getFullName() );
        $(".data-vprofesion").text( this.profesion );
    };

    //Genera un identificador unico
    function genKey(v){
        return randomNames.rand();
    }

    function indexarVampiro(v){
        Mundo.indexarVampiro(v);
    }

    function create(){
        var v = Object.assign({}, Base)
        v.nombre = randomNames.get();
        v.apellido = randomNames.get();
        v.estado = Estados.NORMAL;
        v.papa = "player";
        v.KEY = genKey();

        indexarVampiro(v);
        return v;
    }

    return {
        create: create
    };
})();