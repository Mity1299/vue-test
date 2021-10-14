var app = new Vue({
    el:'#app',
    data:{
        list:[
            {
                id: 1,
                name: 'iPhone 7',
                price: 6188,
                count: 1
            },
            {
                id: 2,
                name: 'iPad Pro',
                price: 5888,
                count: 1
            },
            {
                id: 3,
                name: 'MacBook Pro',
                price: 21488,
                count: 1
            }

        ],
        checkedItems:[],
        isSelectAll:false
    },
    computed:{
        totalPrice:function () {
            var total = 0;
            var checkedList = [];
            if(this.checkedItems.length === 0 || this.checkedItems.length === this.list.length){
                checkedList = this.list;
            }else{
                checkedList = this.list.filter(e => {
                    return this.checkedItems.includes(e.id);
                })
            }

            for(var i = 0; i< checkedList.length; i ++){
                var item = checkedList[i];
                total += item.price * item.count;
            }
            return total.toString().replace(/\B(?=(\d{3})+$)/g,',')
        }
    },
    watch:{
        isSelectAll:function (newVal,oldVal) {
            if(newVal === true){
                this.checkedItems = this.list.map(e => e.id);
            }else{
                this.checkedItems = [];
            }
        }
    },
    methods:{
        handleReduce:function (index) {
            if(this.list[index].count === 1) return;
            this.list[index].count --;
        },
        handleAdd:function (index) {
            this.list[index].count ++;
        },
        handleRemove:function (index) {
            this.list.splice(index,1);
        },
        toggleSelectAll:function(){

        }
    }

})
