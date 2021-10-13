/**
 * 这是表单的主体
 * 需要根据类型展示
 */

import {EventBus} from '../utils/eventBus.mjs';

Vue.component('question-form', {
    props: {
        description: String,
        type: {
            validator(value) {
                return ['radio', 'checkbox', 'textarea'].includes(value);
            }
        },
        questionId:Number,
        options: {
            validator(value) {
                //这里真的使用this吗？
                // if (['radio', 'checkbox'].includes(this.type)) {
                //     return value instanceof Array;
                // } else if (['textarea'].includes(this.type)) {
                //     return true;
                // } else {
                //     console.error('question-form:options数据验证不通过!')
                //     return false;
                // }
                return true;
            }
        },
        myAnswer: {}
    },
    data: function(){
        return {
            comAnswer: this.getInitComAnswer()
        }
    },
    methods:{
    /**
     * 答案是否合法
     * 单选题必须要选择，多选题最少选择2项，最多选择3项，文本框输入不能少于100字
     */
      isLegalAnswer:function () {
          let isLegal = false;
          if(this.type === 'radio'){
              isLegal = this.comAnswer.length !== 0;
          }else if(this.type === 'checkbox'){
              isLegal = this.comAnswer.length >= 2 && this.comAnswer.length <= 3;
          }else if(this.type === 'textarea'){
              isLegal = this.comAnswer.length >= 100;
          }else{
             isLegal = true;
          }
          return isLegal;
      },
        getInitComAnswer:function (){
            return this.type === 'textarea'? "": []
        }
    },
    emits: ['update-answer'],
    watch:{
        comAnswer:function (newVal,oldVal) {
            EventBus.$emit('update-answer',{
                isLegalAnswer:this.isLegalAnswer()
            });
        }
    },
    template: `
      <form>
      <header>
        {{ this.description }}
      </header>
      <section>
        <textarea v-if="type === 'textarea'" placeholder="请输入你的答案"
                  v-model="comAnswer"></textarea>
        <div v-else-if="['checkbox','radio'].includes(type)"
             v-for="option in options">
          <input :type="type" :id="questionId + '_' + option.id" :name="option.description"
                 :value="option.description"
                 v-model="comAnswer">
          <label :for="questionId + '_' + option.id">{{option.description}}</label>
        </div>
      </section>
      </form>
    `,
    mounted() {
        EventBus.$on('clear-answer',params => {
            if(params.questionId === this.questionId){
                this.comAnswer = this.getInitComAnswer();
            }
        })
        EventBus.$emit('update-answer',{
            isLegalAnswer:this.isLegalAnswer()
        });
    },
    activated(){
        EventBus.$emit('update-answer',{
            isLegalAnswer:this.isLegalAnswer()
        });
    }
})
