var Familia = (function(){
    function logme(tag,msg){
        console.log("[Familia]["+tag+"] "+msg);
    }

    var Familia = {
        lista: Coleccion([]),
        candidato: null
    };

    function eliminarCandidato(){
        var key = Familia.candidato.KEY;
        Familia.candidato = null;
        Mundo.borrarVampiro(key);
    }

    function agnadirVampiro(key){
        Familia.lista.push(key);
    }

    function ponCandidato(v){
        Familia.candidato = v;
    }

    function getMiembros(){
        var out = [];

        Familia.lista.foreach(function(key) {
            var v = Mundo.get().vampiros[key];
            out.push(v);
        });

        return { 
            lista: out
        };
    }

    function count(){
        return Familia.lista.count();
    }

    function get(){
        return Familia;
    }

    return {
        get:get,
        count:count,
        getMiembros:getMiembros,
        eliminarCandidato:eliminarCandidato,
        ponCandidato:ponCandidato,
        agnadirVampiro:agnadirVampiro
    };
})();