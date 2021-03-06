/**
 * Control de estado del mundo
 */
var Mundo = (function(){
    function logme(tag,msg){
        console.log("[Mundo]["+tag+"] "+msg);
    }

    var Reseteo = {
        policia_en_callejon: false,
        hora:0,    //  0-5 => noche, 5-8=>amanecer, 8->18 => dia, 18-19=>anochecer,  19-14=>noche

        //vampiros: {}  no lo incluimos, sino al reiniciar se perderia esta informacion
    };

    //Propiedades de inicio, solo se resetean una vez
    var Mundo = {
        local:"cueva",
        poder: {
            //facciones
            policia: FaccionFactory.create('Policia',100,0), // raids, tomar poder? 
            mundooscuro: FaccionFactory.create('Mundo oscuro',20,0),  // otros vampiros, raids de vampiros / apoyo?,  tomar poder? 
            zombies: FaccionFactory.create('Zombies',0,0),  // rebelion 
            publico: FaccionFactory.create('Publico',20,0), //ciudadadanos
            player: FaccionFactory.create('Familia',0,0)//tu, tu familia de vampiros
        }
    };

    Mundo.poder.player.modificadorPoder = function(){
        var familiaActual = Familia.getMiembros();
        var num_miembros = familiaActual.lista.length * 1;
        var zombies = Jugador.get().zombies * 1;
        var poder_player = (num_miembros + zombies/5).toFixed(0) * 1;

        return poder_player;
    }

    function faccionesInfo(){
        var out = {lista:[]};

        out.lista.push(Mundo.poder.policia);
        out.lista.push(Mundo.poder.mundooscuro);
        out.lista.push(Mundo.poder.zombies);
        out.lista.push(Mundo.poder.publico);
        out.lista.push(Mundo.poder.player);
        
        return out;
    }
    
    function iniciarMundo(){
        logme("iniciarMundo","Se ha reiniciado el mundo con los valores por defecto");

        //Reseteamos estas propiedades
        for (var propiedad in Reseteo) {
            if (Reseteo.hasOwnProperty(propiedad)) {
                Mundo[propiedad] =  Reseteo[propiedad];
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

    function esperarALaNoche(){
        Mundo.hora = 20;
    }


    /**
     * Indica si este lugar esta protegido contra la luz
     * @param string estado 
     * @returns boolean
     */
    function esSeguroLuz(estado){
        var seguro = getPropiedadArea('seguro_luz');
        logme('esSeguroLux',",estado:"+estado+",seguroluz:"+(seguro?'si':'no'));
        return seguro;
    }

    function indexarVampiro(v){
        var key = v.KEY;

        Mundo.vampiros[key] = v;
    }

    function nuevoInfectado(area){
        logme('nuevoInfectado',"Creando aspirante..");

        var v = Vampiro.create(area, Jugador.get().actual);
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

    function getvampiro(key){
        return Mundo.vampiros[key];
    }

    function getPropiedadArea(prop){
        var local = Mundo.local;

        if(LocalMundo[local]==undefined){
            return {nombre:'error', local: local};
        }

        return LocalMundo[local][prop];
    }

    function setLocal(local){
        logme('setLocal',"newlocal:"+local);
        Mundo.local = local;
    }

    function get(){
        return Mundo;
    }

    logme("inicio","Iniciamos datos por defecto mundo...");
    iniciarMundo();

    return {
        setLocal:setLocal,
        getPropiedadArea:getPropiedadArea,
        faccionesInfo:faccionesInfo,
        getvampiro:getvampiro,
        esperarALaNoche:esperarALaNoche,
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