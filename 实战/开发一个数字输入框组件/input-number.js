Vue.component('input-number', {
    template: '<div class="input-number"></div>',
    props: {
        max: {
            type: Number,//校验
            default: Infinity,
        },
        min: {
            type: Number,
            default: -Infinity,
        },
        value: {
            type: Number,
            default: 0
        },
        step: {
            type:Number,
            default:1
        }
    },
    data: function () {
        return {
            //从父组件取值来初始化
            currentValue: this.value,
        }
    },
    watch: {
        currentValue: function (val) {
            this.$emit('input', val);
            this.$emit('on-change', val);
        },
        value: function (val) {
            this.updateValue(val);
        }
    },
    methods: {
        updateValue: function (val) {
            if (val > this.max) val = this.max;
            if (val < this.min) val = this.min;

            this.currentValue = val;
        },
        handleDown: function () {
            if(this.currentValue <= this.min) return;
            this.currentValue -= this.step;
        },
        handleUp: function () {
            if(this.currentValue >= this.max) return;
            this.currentValue += this.step;
        },
        handleChange: function (event) {
            var val = event.target.value.trim();
            var max = this.max;
            var min = this.min;
            if(isValueNumber(val)){
                val = Number(val);
                this.currentValue = val;

                if(val > max){
                    this.currentValue = max;
                }else if(val < min){
                    this.currentValue = min;
                }
            }else{
                event.target.value = this.currentValue;
            }
        }
    },
    //生命周期的钩子
    mounted: function () {
        this.updateValue(this.value);
    },
    template: `
      <div class="input-number">
      <input
          type="text"
          :value="currentValue"
          @keydown.down.prevent="handleDown"
          @keydown.up.prevent="handleUp"
          @change="handleChange">
      <button
          @click="handleDown"
          
          :disabled="currentValue <= min">-</button>
      <button
          @click="handleUp"
          
          :disabled="currentValue >= max">+</button>
      </div>
    `
})
function isValueNumber(value){
    return (/(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/).test(value + '');
}
