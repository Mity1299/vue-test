//编号从1开始
Vue.component('bottom-nav',{
    name:'bottom-nav',
    template:`
    <button v-if="show.preStep">上一步</button>
    <button v-if="show.nextStep" v-bind:disabled="isLeagalAnswer">下一步</button>
    <button>重置</button>
    <button v-if="show.submit">提交</button>
    `,
    props:{
        questionIndex:{
            type:Number,
            default:1
        },
        myAnswer:{}
    },
    data:{
        show:{
            preStep:false,
            nextStep:false,
            submit:false
        },
        isLeagalAnswer:false,
        currentIndex:this.questionIndex,
    },
    methods:{
        clickPreStep:function () {
           if(this.currentIndex === 1) return;
           this.currentIndex -= 1;
        },
        clickNextStep:function () {
            if(this.myAnswer.length === this.currentIndex) return;
            this.currentIndex ++;
        },
        clickReset: function () {
            this.myAnswer[this.currentIndex - 1] = null;
        },
        clickSubmit: function () {
            alert("已提交");
        }
    },
    computed:{
        "show.preStep":function(){
            return this.currentIndex !== 1;
        },
        "show.nextStep":function(){
            return this.currentIndex !== this.myAnswer.length;
        },
        "show.submit": function () {
            return this.currentIndex === this.myAnswer.length;
        }
    }

})
