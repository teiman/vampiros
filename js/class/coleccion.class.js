var Coleccion = function(items){

    function rand(){
        var len = items.length;
        var r = randomNames.rand()% len;
        return items[r];
    }

    function push(item){
        items.push(item);
    }

    function foreach(method){
        items.forEach(function(element) {
            method(element);
        });
    }

    var Col = {
        items:items,
        push:push,
        foreach:foreach, 
        rand:rand
    };

    return Col;
};