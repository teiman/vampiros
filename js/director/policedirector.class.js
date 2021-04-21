

var PoliceDirector = (function(){

    function logme(tag,msg){
        console.log("[PoliceDirector]["+tag+"] "+msg);
    }

    var Maquina = {
        inicial: "calma",
        actual: "calma",
    };

    Maquina.calma = function(msg){
        logme("calma","...");

        if(msg.action == "visto_policia"){
            logme("calma","Uh..oh... te han visto!");
            Maquina.actual = "investigando";
        } 

    };
    
    Maquina.investigando = function(msg){
        logme("investigando","...");
    };

    Maquina.raids = function(msg){
        logme("raids","...");
    };

    function receive(msg){
        var estado = Maquina.actual;
        logme("receive",",pensando en "+estado);

        Maquina[estado](msg);
    }


    return {
        name: "PoliceDirector",
        receive:receive
    };

})();

GameDirector.subscribe(PoliceDirector);
