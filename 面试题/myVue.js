function myVue(option = {}){
    //内置数据定义 $option $data $methods $el
    this.$options = option;
    this.$data = option.data;
    this.$methods = option.methods;
    this.$el = document.querySelector(option.el);

    //这个很关键，是用来辅助绑定的
    this._binding = {};

    //数据劫持，劫持所有的属性
    this._obverse(this.$data);

    //视图解析，解析$el绑定的dom
    this._complie(this.$el);
}

myVue.prototype._obverse = function (obj) {
    /**
     * 核心：
     * 处理data的所有属性
     * 通过Object.defineProperty来做一个切面
     * 从而实现当数据更新的时候，去更新所有的订阅者
     *
     * 由于Vue里的所有指令都需要去监听消息，所以需要一个directives数据结构
     * 注意深度劫持
     */
    let _this = this;

    for(key in obj){
        if(obj.hasOwnProperty(key)){
            if(typeof obj[key] === 'object'){
                _this._obverse(obj[key]);
            }

            _this._binding[key] = {};
            _this._binding[key].directive = [];//这里注册了指令的watcher
            let value = obj[key];
            Object.defineProperty(obj,key,{
                enumerable: true,
                configurable: true,
                get(){
                    return value;
                },
                set(val){
                    _this._binding[key].directive.forEach(item => {
                        item.update();
                    })
                }
            })
        }
    }




}

myVue.prototype._complie = function (root) {
    /**
     * 解析模板，这里做三件事
     * 1. 解析v-click指令，调用对应的method函数
     * 2. 解析v-model指令，当dom的值改变时，发布数值改变的消息
     * 3. 解析v-bind指令，当vue实例数据改变时，更新dom的html内容
     */
    let _this = this;
    let nodes = Array.from(root.children);
    for (var i = 0; i < nodes.length; i++) {
        let node = nodes[i]
        if(node.children.length > 0){
            this._complie(node);
        }

        if(node.hasAttribute('v-click')){
            let attrVal = node.getAttribute('v-click');
            this.$methods[attrVal].bind(_this.$data);
            continue;
        }

        //TODO 核查tagname
        if(node.hasAttribute('v-model') && (node.tagName === 'INPUT' || node.tagName === 'TEXTAREA')){

            let attrVal = node.getAttribute('v-model');
            _this._binding[attrVal].directive.push(new Watcher(
                'input',
                node,
                _this,
                attrVal,
                'value'
            ))

            node.addEventListener('input',function (e) {
                _this.$data[attrVal] = e.target.value;
            })
        }

        if(node.hasAttribute('v-bind')){
            let attrVal = node.getAttribute('v-bind');
            _this._binding[attrVal].directive.push(new Watcher(
                'input',
                node,
                _this,
                attrVal,
                'innerHTML'
            ))
        }
    }


}

function Watcher(name, el, vm, exp, attr) {
    this.name = name;         //指令名称，例如文本节点，该值设为"text"
    this.el = el;             //指令对应的DOM元素
    this.vm = vm;             //指令所属myVue实例
    this.exp = exp;           //指令对应的值，本例如"number"
    this.attr = attr;         //绑定的属性值，本例为"innerHTML"

    //初始化
    this.update();
}

Watcher.prototype.update = function () {
    this.el[this.attr] = this.vm.$data[this.exp];
}
