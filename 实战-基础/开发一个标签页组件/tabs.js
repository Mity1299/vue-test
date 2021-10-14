Vue.component('tabs', {
    template: `
        <div class="tabs"> 
            <div class="tabs-bar"> 
                <div 
                    :class="tabCls(item)" 
                    v-for="(item, index) in navList" 
                    @click="handleChange(index)"> 
                    {{ item.label }} 
                  <button class="btn-close" v-if="item.closable" @click.stop="closeTab(index)"></button>
                </div> 
            </div> 
            <div class="tabs-content"> 
                <slot></slot> 
            </div>
        </div>`,
    props: {
        //这里的value是为了可以使用v-model
        value: {
            type: [String, Number]
        },
    },
    data: function () {
        return {
            //因为不能修改value，所以复制一份自己维护
            currentValue: this.value,
            navList: [],
            closeList:[],
        }
    },
    computed:{

    },
    methods: {
        getFilterTabs:function () {
            var _this = this;
            var navList = [];
            this.getTabs().forEach(function (pane, index) {
                if(_this.closeList.includes(pane.label)) return;

                navList.push({
                    label: pane.label,
                    name: pane.name || index,
                    closable: pane.closable
                });
                //如果没有给pane设置name,默认设置他的索引
                if (!pane.name) pane.name = index;
                if (index === 0) {
                    if (!_this.currentValue) {
                        _this.currentValue = pane.name || index;
                    }
                }

            })

            return navList;
        },
        tabCls: function (item) {
            return [
                'tabs-tab',
                {
                    'tabs-tab-active': item.name === this.currentValue
                }
            ]
        },
        getTabs() {
            return this.$children.filter(function (item) {
                return item.$options.name === 'pane';
            });
        },
        updateNav() {
            this.navList = [];
            this.navList = this.getFilterTabs();

            this.updateStatus();
        },
        updateStatus() {
            var tabs = this.getTabs();
            var _this = this;

            //显示当前选中的tab对应的pane组件，隐藏没有选中的
            tabs.forEach(function (tab) {
                return tab.show = tab.name === _this.currentValue;
            })
        },
        //点击tab标题时触发
        handleChange: function (index) {
            var nav = this.navList[index];
            var name = nav.name;
            //更新当前选中的tab，并触发watch
            this.currentValue = name;

            this.$emit('input', name);
            //触发一个自定义事件，供父级使用
            this.$emit('on-click', name);
        },
        closeTab:function (index) {
            var nav = this.navList[index];
            if(this.closeList.includes(nav.label)) return ;
            this.closeList.push(nav.label);
            this.updateNav();
        }
    },
    watch: {
        value: function (val) {
            this.currentValue = val;
        },
        currentValue: function () {
            this.updateStatus();
        }
    }
})
