/**
 * Control de estado del mundo
 */
var Mundo = (function(){

    var Base = {
        policia_en_callejon: false,
        infectados:0,
        hora:0    //  0-5 => noche, 5-8=>amanecer, 8->18 => dia, 18-19=>anochecer,  19-14=>noche
    };

    var Mundo = {};

    function logme(tag,msg){
        console.log("["+tag+"] "+msg);
    }
    
    function iniciarMundo(){
        for (var propiedad in Base) {
            if (Base.hasOwnProperty(propiedad)) {
                Mundo[propiedad] =  Base[propiedad];
            }
        }
    }

    function deltaInfectados(delta){
        Jugador.infectados = Jugador.infectados + delta;
        if(Jugador.infectados<0){
            Jugador.infectados = 0;
        }    
    }

    function avanzarHora(){
        Mundo.hora = Mundo.hora + 0.5;
        if(Mundo.hora>24)
            Mundo.hora = 0;
    }

    /**
     * Es de dia?
     * @return boolean 
     */
    function esLuzLetal(){
        var estado = getHoraDesc();

        return (estado == "dia");
    }

    function getHoraDesc(){
        if(Mundo.hora>14 || Mundo.hora<5){
            return "noche";
        }
        if(Mundo.hora>=5 && Mundo.hora<=8){
            return "amanecer";
        }
        if(Mundo.hora>=17 && Mundo.hora<=19){
            return "anochecer";
        }
        return "dia";
    }

    /**
     * Indica si este lugar esta protegido contra la luz
     * @param string estado 
     * @returns boolean
     */
    function esSeguroLuz(estado){
        var es_seguro = false;
        var $pildora = $(".pildora[data-estado="+estado+"]");
        if(!$pildora.length){
            logme('esSeguroLux',"E: no se encuentra pildora:"+estado);
            return false;
        }

        var es_seguro = $pildora.attr("data-seguro");

        if(es_seguro) return true;
        return false;
    }

    function get(){
        return Mundo;
    }

    logme("inicio","Iniciamos datos por defecto mundo...");
    iniciarMundo();

    return {
        renacer:iniciarMundo,
        esSeguroLuz:esSeguroLuz,
        esLuzLetal:esLuzLetal,
        getHoraDesc:getHoraDesc,
        avanzarHora:avanzarHora,
        deltaInfectados:deltaInfectados,
        get:get
    };

})();