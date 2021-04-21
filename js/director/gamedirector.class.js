

var GameDirector = (function(){
    function logme(tag,msg){
        console.log("[GameDirector]["+tag+"] "+msg);
    }

    var Directors = [];

    function subscribe(director){
        logme("subscribe","subcribiendo..."+director.name);

        Directors.push(director);
    }

    function broadcast(msg){
        logme("subscribe","broadcasting..."+msg.action);

        Directors.forEach(function(dir){
            dir.receive(msg);
        });
    }

    return {
        subscribe: subscribe,
        broadcast: broadcast, 
    };

})();