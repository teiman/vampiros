
/**
 * Condicionantes, hace un test, y devuelve true si cumple la condicion
 */
var Condicion = (function(){

    function logme(tag,msg){
        console.log("[Condicion]["+tag+"] "+msg);
    }

    var Tests = {
        siemplefalsa:function(){
            return false;
        },
        nido_es_cloaca:function(){
            return (Jugador.get().base == "cloaca");
        },
        nido_es_fabrica:function(){
            return (Jugador.get().base == "fabrica");
        },
        nido_es_casona:function(){
            return (Jugador.get().base == "casona");
        },
        jugador_sucio:function(){
            return (Jugador.get().sucio);
        },
        victima_en_portal:function(){
            return (Mundo.get()['victima_en_portal']);
        },
        una_de_6:function(){
            return (randomNames.rand()%600<100);
        }
    };

    function test(tipo){
        if(Tests[tipo]){
            var result = Tests[tipo]();

            logme('test',"Test:"+tipo + "=" + (result?"true":"false"));

            return result;
        }
            
        logme('test',"ERROR: "+ tipo + " no es conocido");
    
        return null;
    }

    return  {
        test:test,
        v:1
    };
})();