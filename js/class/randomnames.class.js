var randomNames = randomNames || [];

randomNames.rand = function(){
    return (Math.random()*999999999).toFixed();
};
randomNames.planet =function(){

	var name = "";
	var parts1 = ["tan","to","ine","ven","us","mar","te","mon","mer",
				  "ury","tie","rra","lu","na","jup","ven","sat","urn","oor","t",
				  "eur","pe","ix","tran","tor","cal","la","dan","I","IV","IX"];

	var cuantos = randomNames.rand() % 2+2;
	var cuantas_partes = parts1.length;

	var part = "";
	for(var t=0;t<cuantos;t++){
		var n = randomNames.rand() % cuantas_partes;

		part = parts1[n];

		name += part;
	}

	name = name.substr(0, 1).toUpperCase() + name.substr(1);

	return name;
};



randomNames.get = function(){

	var name = "";
	var parts1 = ["tom","soon","joe","fra","ge","dur","hur","eden","mark","ross","wei",
				  "-",
				  "ur","Mc","luc","tah","von","gan","des",
				  "tu","juan","ash","solo","khan","eden","milo"];

	var cuantos = randomNames.rand() % 2+2;
	var cuantas_partes = parts1.length;

	var doTheUpperCaseThing = true;
	var oldname = "";
	var oldpart = "";
	var part = "";
	var firstalgo = true;
	for(var t=0;t<cuantos;t++){
		var n = randomNames.rand() % cuantas_partes;

		oldpart = part;
		part = parts1[n];

		if(doTheUpperCaseThing)
			part = part.substr(0, 1).toUpperCase() + part.substr(1);


		if(!name && (part==" " || part=="-")){
			part="";//don't start with space or -
		}

		name += part;

		if(part==" ")
			doTheUpperCaseThing = true;
		else
			doTheUpperCaseThing = false;
	}

	if(part=="-")
		name  = oldname;//undo the last part if ends with -
	if(oldpart=="-" && part==" "){
		name = oldname+""+ (randomNames.rand()%899+100);
	}


	if(!name)
		name = randomNames.get(name);//eeeek, ugly hack!, this is shit!

	name = name.substr(0, 1).toUpperCase() + name.substr(1);

	console.log("randomName:"+name);

	return name;
};

