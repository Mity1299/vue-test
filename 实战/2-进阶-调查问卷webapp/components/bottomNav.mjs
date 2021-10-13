import {EventBus} from "../utils/eventBus.mjs";

//编号从1开始
Vue.component('bottom-nav',{
    name:'bottom-nav',
    template:`
        <footer>
            <button v-show="showPreStep" @click="clickPreStep">上一步</button>
            <button v-show="showNextStep" v-bind:disabled="!isLegalAnswer" @click="clickNextStep">下一步</button>
            <button @click="clickReset">重置</button>
            <button v-show="showSubmit" @click="clickSubmit">提交</button>
        </footer>
    `,
    props:{
        questionIndex:{
            type:Number,
            default:1
        },
        questionLength: {type:Number}
    },
    data:function(){
        return {
            currentIndex:this.questionIndex,
            isLegalAnswer:false
        }
    },
    methods:{
        clickPreStep:function () {
           if(this.currentIndex === 1) return;
           this.currentIndex -= 1;
        },
        clickNextStep:function () {
            if(this.questionLength === this.currentIndex) return;
            this.currentIndex ++;
        },
        clickReset: function () {
            EventBus.$emit('clear-answer',{questionId: this.questionIndex});
        },
        clickSubmit: function () {
            alert("已提交");
        }
    },
    computed:{
        showPreStep:function(){
            return this.currentIndex !== 1;
        },
        showNextStep:function(){
            return this.currentIndex !== this.questionLength;
        },
        showSubmit: function () {
            return this.currentIndex === this.questionLength;
        },
    },
    mounted() {
        EventBus.$on('update-answer',params => {
            this.isLegalAnswer = params?.isLegalAnswer;
        })
    },
    watch:{
        currentIndex:function (newVal,oldVal) {
            this.$emit('update-index',newVal);
        }
    }

})
