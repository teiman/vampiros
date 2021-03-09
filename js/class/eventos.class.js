/**
 *  Eventos que pueden ocurrir 
 */
var Eventos = (function(){
    // ----------------------

    function logme(tag,msg){
        console.log("["+tag+"] "+msg);
    }

    var estados = {
        inicio_matriarca1:function(){
            Jugador.setSexo("mujer");
            Jugador.setNombre(randomNames.get());
        },
        inicio_patriarca1:function(){
            Jugador.setSexo("hombre");
            Jugador.setNombre(randomNames.get());
        },
        recordar_nombre:function(){
            var nombre = prompt("¿Cual es tu nombre?",Jugador.get().nombre);
            Jugador.setNombre(nombre);
        },
        recordar_apellido:function(){
            var apellido = prompt("¿Cual es tu apellido?",Jugador.get().apellido);

            Jugador.setApellido(apellido);

            $(".mostrar-estado").removeClass("ocu");//habilitamos las estadisticas
        },
        usar_cloaca:function(){
            Jugador.deltaPrestigio(-20); //este sitio da asco
            Jugador.base = "cloaca";
            Jugador.deltaNotoriedad(-10); // buen escondite 
            Jugador.get().sucio = true; //Entrar en la cloaca ensucia tus ropas   
        },
        usar_fabrica:function(){
            Jugador.base = "fabrica";
            Jugador.deltaNotoriedad(1);// no es un gran escondite
        },
        usar_casona:function(){
            Jugador.deltaPrestigio(20);// ¡menuda casa!
            Jugador.base = "casona";
            Jugador.deltaNotoriedad(10);// no te ocultas demasiado
        },
        plaza_callejon:function(){
            Jugador.deltaPrestigio(-1);//se te han visto por callejones inmundos

            if(Mundo.get().policia_en_callejon){
                Pildoras.moverAEstado("plaza_callejon_policia");
            }
        },
        comer_vagabundo_callejon:function(){
            Mundo.get().policia_en_callejon = true;
            Jugador.deltaComida(20);        
            Mundo.nuevoInfectado();
            Jugador.get().sucio = true;//comer el vagabundo salpica tus ropas de sangre
        },
        plaza_callejon_policia: function(){
            Mundo.get().policia_en_callejon = false;
            Jugador.deltaNotoriedad(5);
            Jugador.deltaPrestigio(-1);
        },
        plaza_bar:function(){
            if(Jugador.get().prestigio<5){
                Pildoras.moverAEstado("plaza_expulsado_bar");
            }
        },
        plaza_bar_barra_esperar1:function(){
            Mundo.get().policia_en_callejon = false;//esperando bastante te vas del callejon
            Jugador.deltaPrestigio(0.01); // quizas es demasiado facil? simplemente bebiendo en el bar
                // te familiarizas con la ciudad, y nadie espera que alguien bebiendo alcohol sea un vampiro
                // es un buen disfraz
        },
        nido_lavarse:function(){
            Jugador.get().sucio = false;
        },
        renacer:function(){
            //GAME OVER
            //Reseteas jugador y mundo
            Mundo.renacer();
            Jugador.renacer();
        },
        nido:function(){
            if(!Jugador.get().nuevo_amigo){
                var v = Mundo.getInfectadoEnEspera();

                if(v){
                    Jugador.get().nuevo_amigo = v;
                    v.render();
                    Pildoras.moverAEstado("recibir_infectado");
                }
            }
        }
    };

    // ----------------------

    function entroEstado(estado){
        logme("entroEstado","...");

        var es_seguro_lux = Mundo.esSeguroLuz(estado);
        var es_luz_letal = Mundo.esLuzLetal();

        //console.log({estado:estado,seguro:es_seguro_lux,luz:es_luz_letal});

        if( !es_seguro_lux && es_luz_letal){
            logme("entroEstado","Vampiro al sol, en zona no segura");
            Pildoras.moverAEstado("muerte_luz_solar");
            return;
        }

        if( estados[estado]){
            estados[estado]();
        }

        Mundo.avanzarHora();
        Jugador.updatePlayerTexts();

        console.log(Jugador.get());
        console.log(Mundo.get());
    }

    logme("onload","Iniciando eventos..");
    
    return {
        entroEstado:entroEstado,
    };

})();