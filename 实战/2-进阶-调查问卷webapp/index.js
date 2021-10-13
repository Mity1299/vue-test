var dataUrl = "data.json";
var request = new XMLHttpRequest();
request.open('get',dataUrl);
request.send(null);

//初始化问卷数据
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
            data:function (){
                return {
                    questionInfos:data,
                    myAnswer:new Array(data.length),
                    currentIndex:1,
                    test:null,
                }
            },
            methods:{
                updateAnswer:function (questionId,val) {
                    this.myAnswer[questionId - 1] = val;
                    this.$forceUpdate();
                },
                updateIndex:function (val) {
                    this.currentIndex = val;
                },
                clearAnswer:function (questionId){
                    this.myAnswer[questionId - 1] = null;
                    this.$forceUpdate();
                }
            },
            mounted() {
            }
        })
    },e => console.error(e)
)


