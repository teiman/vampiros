var Bigotes = (function(){

    function logme(tag,msg){
        console.log("["+tag+"] "+msg);
    }

    function hidratar(id, data){
        /*
        var view = {
            title: "Joe",
            calc: function () {
              return 2 + 4;
            }
          };
          
          var output = Mustache.render("{{title}} spends {{calc}}", view);
          */
        var $item = $("#"+id);
        var template_name = "#"+id+"-template";
        var template = $(template_name).html(); 

        if(!template){
            logme("hidratar","Error: id="+template_name+" no encontrado");
            return;
        }

        var output = Mustache.render(template, data);

        logme("hidratar","id="+id);
        console.log(data);        
        console.log(output);

        $item.html( output );
    }

    return {
        hidratar:hidratar
    };

})(); 