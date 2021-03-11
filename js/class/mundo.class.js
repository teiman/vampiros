/**
 * Control de estado del mundo
 */
var Mundo = (function(){

    var Base = {
        policia_en_callejon: false,
        hora:0,    //  0-5 => noche, 5-8=>amanecer, 8->18 => dia, 18-19=>anochecer,  19-14=>noche
        //vampiros: {}  no lo incluimos, sino al reiniciar se perderia esta informacion
    };

    var Mundo = {};

    function logme(tag,msg){
        console.log("["+tag+"] "+msg);
    }
    
    function iniciarMundo(){
        logme("iniciarMundo","Se ha reiniciado el mundo con los valores por defecto");

        for (var propiedad in Base) {
            if (Base.hasOwnProperty(propiedad)) {
                Mundo[propiedad] =  Base[propiedad];
            }
        }

        //Si no se ha inicializado antes, lo inicializamos ahora 
        if(Mundo['vampiros'] === undefined){
            logme("iniciarMundo","Inicializando tabla de vampiros");
            Mundo['vampiros'] = {};
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

    function espearALaNoche(){
        Mundo.hora = 20;
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

    function indexarVampiro(v){
        var key = v.KEY;

        Mundo.vampiros[key] = v;
    }

    function nuevoInfectado(area){
        logme('nuevoInfectado',"Creando aspirante..");

        var v = Vampiro.create(area);
        console.log(v);
        if(!v) return;

        indexarVampiro(v);
        v.render();
    }

    function borrarVampiro(key){
        delete Mundo.vampiros[key];
    }

    function getInfectadoEnEspera(){
        logme('getInfectadoEnEspera',"Buscando aspirantes..");

        var vampiros = Mundo.vampiros;
        for (var propiedad in vampiros) {
            if (vampiros.hasOwnProperty(propiedad)) {
                var v =  Mundo.vampiros[propiedad];
                if( !v.presentado ){
                    logme('getInfectadoEnEspera',"encontrado vampiro para presentar..");
                    v.presentado = true;
                    return v;
                }

            }
        }
        logme('getInfectadoEnEspera',"no se ha encontrado ningun aspirante");
        return null;
    }


    function get(){
        return Mundo;
    }

    logme("inicio","Iniciamos datos por defecto mundo...");
    iniciarMundo();

    return {
        espearALaNoche:espearALaNoche,
        borrarVampiro:borrarVampiro,
        getInfectadoEnEspera:getInfectadoEnEspera,
        nuevoInfectado:nuevoInfectado,
        indexarVampiro:indexarVampiro,
        renacer:iniciarMundo,
        esSeguroLuz:esSeguroLuz,
        esLuzLetal:esLuzLetal,
        getHoraDesc:getHoraDesc,
        avanzarHora:avanzarHora,
        get:get
    };

})();