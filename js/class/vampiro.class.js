var Vampiro = (function(){

    var Base = {
        nombre: "desconocido",
        apellido: "desconocido",
        estado: Estados.INFECTADO,
        profesion: Profesion.VAGABUNDO,
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

    /**
     * Devuelve una profesion tipica del area indicada 
     * 
     * @param string area 
     * @returns string
     */

    function area2profesion(area){ 
        switch(area){
            case "callejon":
                return TablaVampiros.CALLEJON.rand();
            case "bar":
                return TablaVampiros.BAR.rand();
            default:
                logme("area2profesion","ERROR: no hay tabla de spawn de vampiros para el area:"+ area);
                break;        
        }

        return TablaVampiros.CALLEJON.rand();
    }

    function create(area){
        var v = Object.assign({}, Base)
        v.nombre = randomNames.get();
        v.apellido = randomNames.get();
        v.estado = Estados.NORMAL;
        v.profesion = area2profesion(area);
        v.KEY = genKey();
        
        return v;
    }

    return {
        create: create
    };
})();