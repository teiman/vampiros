var Collection = function(items){

    function rand(){
        var len = items.length;
        var r = randomNames.rand()% len;
        return items[r];
    }

    var Col = {
        items:items,
        rand:rand
    };

    return Col;
};