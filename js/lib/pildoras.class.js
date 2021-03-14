
/**
 * Gestiona las pildoras informativas 
 */
var Pildoras = (function(){

    function logme(tag,msg){
        console.log("["+tag+"] "+msg);
    }

    function moverAEstado(estado){
        logme("moverAEstado","Avanzando a estado "+estado);

        //oocultamos todos
        $("div.pildora").addClass("ocu");

        //seleccionamos la que usaremos
        var $pildora = $(".pildora[data-estado="+estado+"]");

        if(!$pildora){
            logme("moverAEstado","ERROR[1]: no se ha encontrado "+estado);
            alert("No se ha encontrado estado: "+estado)
            moverAEstado("inicio");
            return;
        }

        if(!$pildora.length){
            logme("moverAEstado","ERROR[2]: no se ha encontrado "+estado);
            alert("No se ha encontrado estado: "+estado)
            moverAEstado("inicio");
            return;
        }

        //mostramos
        $pildora.removeClass("ocu");

        //Si ademas de flujo narrativo hay cambios de estado
        // se ejecutaran aqui
        Eventos.entroEstado(estado);

        //Muestra o oculta enlace basandose en una condición
        $("a",$pildora).each(function(){
            var condicion = $(this).attr("data-condicion");

            if(condicion){
                var visible = Condicion.test(condicion);

                if(visible){
                    $(this).removeClass("ocu");
                }else{
                    $(this).addClass("ocu");
                }
            }
        });

        //Muestra o oculta parrafos basandose en una condición
        $("p",$pildora).each(function(){
            var condicion = $(this).attr("data-condicion");

            if(condicion){
                var visible = Condicion.test(condicion);

                if(visible){
                    $(this).removeClass("ocu");
                }else{
                    $(this).addClass("ocu");
                }
            }
        });

    }

    $(function(){
        logme("onload","Iniciando pildoras");

        $("div.pildora").each(function(){
            var $pildora = $(this);

            $("a",$pildora).attr("href","javascript:void(0)");

            $("a",$pildora).click(function(){
                logme("onload","click en pildora");

                var estado = $(this).attr("data-next");
                moverAEstado(estado);
            });
        });
    });

    return {
        moverAEstado:moverAEstado,
        v:1
    };
})();