/**
 * Control del patriarca activo.
 */
var Jugador = (function(){
    function logme(tag,msg){
        console.log("[Jugador]["+tag+"] "+msg);
    }
    
    var Base = {
        sexo: "?",
        prestigio: 20,
        notoriedad: 10,     
        dormidos: 0,
        comida: 10,
        sucio: false,
        base: "ninguna",
        zombies: 0,
    };

    //Creamos vampiro original 
    var v = Vampiro.create("cueva");
    v.estado = Estados.VAMPIRO;

    Mundo.indexarVampiro(v);

    var Jugador = {
        actual: v
    };


    //Al reiniciar el jugador, no sobreescribimos estos
    var no_reiniciar = [
        "apellido","dormidos","comida","base","sucio","zombies","actual"
    ];



    function iniciarJugador(){
        for (var propiedad in Base) {
            if (Base.hasOwnProperty(propiedad) && no_reiniciar.indexOf(propiedad)==-1) {
                logme("Jugador","Se ha reiniciado "+propiedad);
                Jugador[propiedad] =  Base[propiedad];
            }
        }
    }

    function get(){
        return Jugador;
    }

    function deltaAtributo(que,delta){
        Jugador.actual[que] = Jugador.actual[que] + delta;
        if(Jugador.actual[que]<0){
            Jugador.actual[que] = 0;
        }
        if(Jugador.actual[que]>150){
            Jugador.actual[que] = 150;
        }    
    }

    function deltaComida(delta){
        deltaAtributo("comida",delta);  
    }

    function deltaPrestigio(delta){
        deltaAtributo("prestigio",delta);
    }

    function deltaNotoriedad(delta){
        deltaAtributo("notoriedad",delta);
    }

    function setApellido(apellido){
        Jugador.actual.apellido = apellido;
    }

    function setNombre(nombre){
        Jugador.actual.nombre = nombre;
    }

    function setSexo(sexo){
        Jugador.actual.sexo = sexo;
    }

    function describePorcentaje(val, oa){
        if(val<10)
            return "muy baj"+oa;
        if(val<30)
            return "baj"+oa;
        if(val<60)
            return "medi"+oa;
        if(val<80)
            return "alt"+oa;
        if(val<100)
            return "altisim"+oa;    
        if(val<110)
            return "enorme";    
            
        return "gigantesc"+oa;
    }

    function describeHambre(val,oa){
        if(val<10)
            return "muy hambrient"+oa;
        if(val<30)
            return "hambrient"+oa;
        if(val<60)
            return "bien";
        if(val<80)
            return "saciad"+oa;

        return "llen"+oa;
    }

    function elegirSiguientePatriarca(este){
        logme('elegirSiguientePatriarca','...');

        var key = $(este).attr("data-key");
        var v = Mundo.getvampiro(key);

        console.log(key);
        console.log(v);

        Jugador.nombre = v.nombre;
        Jugador.apellido = v.apellido;
        Jugador.actual = v;

        updatePlayerTexts();

        Pildoras.moverAEstado("nido_base");
    }

    /**
     * Hay textos que se auto-actualizan esten donde esten.
     * Este metodo se encarga de hacer esa actualización automatica.
     */
    function updatePlayerTexts(){
        $(".data-nombre").text(Jugador.actual.nombre);
        $(".data-apellido").text(Jugador.actual.apellido);

        var desc_notoriedad = describePorcentaje(Jugador.notoriedad,"a");
        var desc_prestigio =  describePorcentaje(Jugador.prestigio,"o");
        var desc_comida = describeHambre(Jugador.comida,"o");

        $(".data-prestigio").text(desc_prestigio);
        $(".data-notoriedad").text(desc_notoriedad);
        $(".data-hambre").text(desc_comida);

        //TODO: este sera dinamico
        $(".data-patriarca-apellido").text(Jugador.actual.apellido);
        $(".data-patriarca-nombre").text(Jugador.actual.nombre);

        var ciclo = Mundo.getHoraDesc();
        $(".data-ciclo").text(ciclo);
    }

    logme("inicio","Iniciamos datos por defecto jugador...");
    iniciarJugador();

    return {
        renacer:iniciarJugador,
        elegirSiguientePatriarca:elegirSiguientePatriarca,
        updatePlayerTexts:updatePlayerTexts,
        get:get,
        setSexo:setSexo,
        setNombre:setNombre,
        setApellido:setApellido,
        delta: deltaAtributo,
        deltaComida:deltaComida,
        deltaPrestigio:deltaPrestigio,
        deltaNotoriedad:deltaNotoriedad,
    };
})();