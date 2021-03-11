/**
 * Control del patriarca activo.
 */
var Jugador = (function(){

    var Base = {
        sexo: "?",
        nombre: randomNames.get(),
        apellido: randomNames.get(),
        prestigio: 20,
        notoriedad: 10,     
        dormidos: 0,
        comida: 10,
        sucio: false,
        base: "ninguna",
        nuevo_amigo: null //posible vampiro para reclutar 
    };
    var Jugador = {};

    function logme(tag,msg){
        console.log("["+tag+"] "+msg);
    }

    function iniciarJugador(){
        for (var propiedad in Base) {
            if (Base.hasOwnProperty(propiedad)) {
                Jugador[propiedad] =  Base[propiedad];
            }
        }
    }

    function get(){
        return Jugador;
    }

    function deltaAtributo(que,delta){
        Jugador[que] = Jugador[que] + delta;
        if(Jugador[que]<0){
            Jugador[que] = 0;
        }
        if(Jugador[que]>150){
            Jugador[que] = 150;
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
        Jugador.apellido = apellido;
    }

    function setNombre(nombre){
        Jugador.nombre = nombre;
    }

    function setSexo(sexo){
        Jugador.sexo = sexo;
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

        return "lleno"+oa;
    }

    /**
     * Hay textos que se auto-actualizan esten donde esten.
     * Este metodo se encarga de hacer esa actualización automatica.
     */
    function updatePlayerTexts(){
        $(".data-nombre").text(Jugador.nombre);
        $(".data-apellido").text(Jugador.apellido);
        $(".data-infectado").text(Mundo.get().infectados);

        var desc_notoriedad = describePorcentaje(Jugador.notoriedad,"a");
        var desc_prestigio =  describePorcentaje(Jugador.prestigio,"o");
        var desc_comida = describeHambre(Jugador.comida,"o");

        $(".data-prestigio").text(desc_prestigio);
        $(".data-notoriedad").text(desc_notoriedad);
        $(".data-hambre").text(desc_comida);

        //TODO: este sera dinamico
        $(".data-patriarca-apellido").text(Jugador.apellido);
        $(".data-patriarca-nombre").text(Jugador.nombre);

        var ciclo = Mundo.getHoraDesc();
        $(".data-ciclo").text(ciclo);
    }

    logme("inicio","Iniciamos datos por defecto jugador...");
    iniciarJugador();

    return {
        renacer:iniciarJugador,
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