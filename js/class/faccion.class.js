

var FaccionFactory = (function(){

    function logme(tag,msg){
        console.log("[Faccion]["+tag+"] "+msg);
    }

    function Faccion(nombre,poder,enfado){
        this.nombre = nombre;
        this.poder_base = poder; //Poder base, sin modificador
        this.enfado_base = enfado;
    }

    function create(nombre,poder,enfado){
        return new Faccion(nombre,poder,enfado);
    }

    Faccion.prototype.modificadorPoder = function(){
        return 0;
    };
    Faccion.prototype.modificadorEnfado = function(){
        return 0;
    };

    Object.defineProperty(Faccion.prototype, 'poder', {
        get: function() {
                return this.poder_base + this.modificadorPoder();
            }
        }
    ); 

    Object.defineProperty(Faccion.prototype, 'enfado', {
        get: function() {
                return this.enfado_base + this.modificadorEnfado();
            }
        }
    ); 

    Object.defineProperty(Faccion.prototype, 'podercocos', {
            get: function() {
                var num = Math.ceil(Math.log(this.poder+1))+1;
                var str = "";
                for(var t=0;t<num;t++){
                    str += "⬤";
                }
                return str;
            }
        }
    );   

    Object.defineProperty(Faccion.prototype, 'enfadococos', {
        get: function() {
                var num = Math.ceil(Math.log(this.enfado+1))+1;
                console.log("[enfadococos],enfado:"+this.enfado+",num:"+num);
                var str = "";
                for(var t=0;t<num;t++){
                    str += "⬤";
                }
                
                return str;
            }
        }
    );   

    return {
        create:create,
    };  

})();


/*
function Faccion(nombre, poderoriginal, enfadooriginal){
    this.nombre = nombre;
    this.poder = poderoriginal;
    this.enfado = enfadooriginal;
}

Module.prototype = (function() {


    Object.defineProperty(person, 'fullName', {
        get: function() {
        return firstName + ' ' + lastName;
        }
    );    
	
	
	return {
		publicFun: myPublicFun
	};
	
})();

var m = new Module("john");
m.publicFun(); // private 0 John
*/



/*
var Faccion = (function(){

    function Poder(nombre, poderoriginal, enfadooriginal){
        this.nombre = nombre;
        this.poder = poderoriginal;
        this.enfado = enfadooriginal;
    }

    function create(nombre,poder,enfado){
        return new Faccion();
    }

    return {
        faccion:create,
    };  

})();
*/

/*
function Person(firstName, lastName) {
  // the "new" operator sets the reference of
  // "this" to a new object
  this.firstName = firstName;
  this.lastName = lastName;
}

// this property referencing the function will
// be configured on person's prototype object,
// and will be inherited by students
Person.prototype.getFullName = function() {
  return this.firstName + " " + this.lastName;
};


Object.defineProperty(person, 'fullName', {
get: function() {
return firstName + ' ' + lastName;
},
set: function(name) {
var words = name.split(' ');
this.firstName = words[0] || '';
this.lastName = words[1] || '';
}
});

-------------------


function Module(name) {
	this.name = name;
} 

Module.prototype = (function() {
	var i = 0;

	function myPrivateFun() {
		console.log("private " + i++);
	}
	
	function myPublicFun() {
        myPrivateFun();
		console.log(this.name);
	}
	
	return {
		publicFun: myPublicFun
	};
	
})();

var m = new Module("john");
m.publicFun(); // private 0 John
-----------------

Object.defineProperty(Subclass.prototype, "myProperty", {
    get: function myProperty() {
        // code
    }
});
-----------------
var o = {
    a: 7,
    get b() {
        return this.a + 1;
    },
    set c(x) {
        this.a = x / 2
    }
};

*/