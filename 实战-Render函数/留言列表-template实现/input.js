Vue.component('vInput',{
    props:{
        value:{
            type:[String, Number],
            default:'',
        }
    },
    emits:['update:value'],
    watch:{
        value:function (newVal,oldVal) {
            this.$emit('input',newVal);
        }
    },
    template:`
      <div>
        <span>昵称</span>
        <input type="text" :value="value" @input="$emit('update:value',$event.target.value)">
      </div>
    `
})

Vue.component('vTextarea', {
    props:{
        value:{
            type:String,
            default: ''
        }
    },
    template:`
      <div>
        <span>留言内容</span>
        <textarea v-model="value" ref="message"></textarea>
      </div>
    `,
    emits:['update:value'],
    computed:{
        value:{
            get(){
                return this.value;
            },
            set(value){
                this.$emit('update-value',value);
            }
        }
    },
    methods:{
        focus: function () {
            // this.$refs.message.focus();
        }
    }
})
