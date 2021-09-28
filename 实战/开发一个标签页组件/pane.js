Vue.component('pane', {
    name: 'pane',
    template:`
        <div class="pane" v-show="show"> 
            <slot></slot> 
        </div>
    `,
    props: {
        name: {
            type: String
        },
        label: {
            type: String,
            default: ''
        }
    },
    data: function () {
        return {
            show: true
        }
    },
    methods: {
        updateNav () {
            this.$parent.updateNav();
        }
    },
    watch: {
        //pane的唯一功能
        label () {
            this.updateNav();
        }
    },
    mounted () {
        this.updateNav();
    }
})
