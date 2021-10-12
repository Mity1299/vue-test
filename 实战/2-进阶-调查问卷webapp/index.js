var dataUrl = "data.json";
var request = new XMLHttpRequest();
request.open('get',dataUrl);
request.send(null);

var promise = new Promise(function (resolve, reject) {
    request.onload = function (){
        if(request.status == 200){
            var json = JSON.parse(request.responseText);
            resolve(json);
        }else{
            reject(request);
        }
    }
});

promise.then(
    function (data) {
        var app = new Vue({
            el: '#app',
            data:{
                questionInfos:data,
            }
        })
    },e => console.error(e)
)


