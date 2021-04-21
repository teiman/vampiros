

var ZombieDirector = (function(){

    function logme(tag,msg){
        //console.log("[ZombieDirector]["+tag+"] "+msg);
    }

    var Maquina = {
        inicial: "paz",
        actual: "paz",
    };

    Maquina.paz = function(msg){
        logme("paz","...");
    };
    
    Maquina.conspirando = function(msg){
        logme("conspirando","...");
    };

    Maquina.revolucion = function(msg){
        logme("revolucion","...");
    };

    function receive(msg){
        var estado = Maquina.actual;
        logme("receive",",pensando en "+estado);

        Maquina[estado](msg);
    }


    return {
        name: "ZombieDirector",
        receive:receive
    };

})();

GameDirector.subscribe(ZombieDirector);