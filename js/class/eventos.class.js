/**
 *  Eventos que pueden ocurrir 
 */
var Eventos = (function(){
    // ----------------------

    function logme(tag,msg){
        console.log("[Eventos]["+tag+"] "+msg);
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
            var nombre = prompt("¿Cual es tu nombre?",Jugador.get().actual.nombre);
            Jugador.setNombre(nombre);
        },
        recordar_apellido:function(){
            var apellido = prompt("¿Cual es tu apellido?",Jugador.get().actual.apellido);

            Jugador.setApellido(apellido);

            $(".mostrar-estado").removeClass("ocu");//habilitamos las estadisticas
        },
        usar_cloaca:function(){
            Jugador.deltaPrestigio(-20); //este sitio da asco
            Jugador.get().base = "cloaca";
            Jugador.deltaNotoriedad(-10); // buen escondite 
            Jugador.get().sucio = true; //Entrar en la cloaca ensucia tus ropas   
        },
        usar_fabrica:function(){
            Jugador.get().base = "fabrica";
            Jugador.deltaNotoriedad(1);// no es un gran escondite
        },
        usar_casona:function(){
            Jugador.deltaPrestigio(20);// ¡menuda casa!
            Jugador.get().base = "casona";
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
            Mundo.nuevoInfectado("callejon");
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
                return;
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
            //Quitamos el vampiro actual.. que ha muerto
            var KEY = Jugador.get().actual.KEY;
            Familia.quitarVampiro(KEY);
            Mundo.borrarVampiro(KEY);
            logme("renacer","Se ha eliminado el v:"+KEY+" de global y la familia");

            if(Familia.count()){
                logme("renacer","Aun quedan posibles patriarcas");
                Pildoras.moverAEstado("elegir_siguiente_patriarca");
                return;
            }

            logme("renacer","¡Han muerto todos los vampiros!");

            //TODO: testear esta linea
            //GAME OVER
            //Reseteas jugador y mundo
            Mundo.renacer();
            Jugador.renacer();
            Pildoras.moverAEstado("inicio");
        },
        nido:function(){
            if(!Familia.get().candidato){
                var v = Mundo.getInfectadoEnEspera();

                if(v){
                    Familia.ponCandidato(v);
                    v.render();
                    Pildoras.moverAEstado("recibir_infectado");
                }
            }
        },
        hacer_dormido:function(){
            Jugador.delta("dormidos",1);
            Familia.eliminarCandidato();
        },
        hacer_esclavo:function(){
            Jugador.delta("zombies",1);
            Familia.eliminarCandidato();
        },
        hacer_vampiro:function(){
            logme("hacer_vampiro","se va a intentar convertir candidato en familiar");
            var key = Familia.get().candidato.KEY;
            Familia.get().candidato = null;
            Familia.agnadirVampiro(key);
        },
        dormir_hasta_la_noche:function(){
            Mundo.esperarALaNoche();
        },
        ver_miembros:function(){
            var familiaActual = Familia.getMiembros();
            
            //no_hay_miembros
            Bigotes.hidratar("tabla-miembros", familiaActual);
        },
        elegir_siguiente_patriarca:function(){
            var familiaActual = Familia.getMiembros();
            
            //no_hay_miembros
            Bigotes.hidratar("tabla-miembros2", familiaActual);
        },
        ver_facciones:function(){
            var datosFacciones = Mundo.faccionesInfo();

            Bigotes.hidratar("poder-facciones", datosFacciones);            
        },
        plaza_portal_esperar1:function(){
            if((randomNames.rand() % 100)>90){
                Mundo.get().victima_en_portal = true;
            }
        },
        alimentarse_portal:function(){
            Jugador.deltaComida(50);        
            Mundo.nuevoInfectado("portal");
            Jugador.get().victima_en_portal = false;
        },
        alimentarse_muchacha:function(){
            Jugador.deltaComida(50);        
            Mundo.nuevoInfectado("bar");
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