var Vampiro = (function(){
    function logme(tag,msg){
        console.log("[Vampiro]["+tag+"] "+msg);
    }

    var Base = {
        nombre: "desconocido",
        apellido: "desconocido",
        estado: Estados.INFECTADO,
        profesion: Profesion.VAGABUNDO,
        presentado: false, // si este vampiro ha visitado ya al patriarca
        papa: null //esto igual se cambia luego para que otro vampiro pueda ser el creador
    };

    Base.getFullName = function(){
        return this.nombre + " "+ this.apellido;
    };

    Base.render = function(){
        $(".data-vnombre").text( this.getFullName() );
        $(".data-vprofesion").text( this.profesion );
    };

    Base.describeRoles = function(){
        var es_patriarca = (this.KEY == Jugador.get().actual.KEY);
        if(es_patriarca)
            return "(patriarca)";

        return "";    
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
            case "bar":
                return TablaVampiros.PORTAL.rand();
            case "cueva":
                return TablaVampiros.CUEVA.rand();    
            default:
                logme("area2profesion","ERROR: no hay tabla de spawn de vampiros para el area:"+ area);
                break;        
        }

        return TablaVampiros.CALLEJON.rand();
    }

    function create(area,father){
        logme('create','Creando vampiro...');

        //Apellido aleatorio 
        var newapellido = Chicago.names.rand();
        if(father){
            newapellido = father.apellido;
        }

        var v = Object.assign({}, Base)
        v.nombre = randomNames.get();
        v.apellido = newapellido;
        v.estado = Estados.NORMAL;
        v.profesion = area2profesion(area);
        v.KEY = genKey();

        if(father){
            logme('create',"asignando padre:"+father.KEY)
            v.papa = father.KEY;
        }

        return v;
    }

    return {
        create: create
    };
})();