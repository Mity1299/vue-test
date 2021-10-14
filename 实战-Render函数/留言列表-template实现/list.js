Vue.component('list',{
    props:{
        list:{
            type: Array,
            default: function () {
                return [];
            }
        }
    },
    template:`
      <div v-if="list.length > 1" class="list">
          <div class="list-item" v-for="(msg, index) in list">
            <span>{{msg.name}}</span>
            <div class="list-msg">
              <p>{{msg.message}}</p>
              <a class="list-reply" @click="handleReply(index)">回复</a>
              <a class="list-delete" @click="handleDelete(index)">删除</a>
            </div>
          </div>
      </div>
      <div v-else class="list-nothing">
        留言表为空
      </div>
    `,
    methods:{
        handleReply:function (index) {
            this.$emit('reply', index);

        },
        handleDelete:function (index){
            this.$emit('delete',index)

        }
    }
})
