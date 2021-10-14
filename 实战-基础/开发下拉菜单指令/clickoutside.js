Vue.directive('clickoutside',{
    bind:function (el, binding, vnode, oldVnode) {
        function documentHandler(e){
            if(el.contains(e.target)) return false;
            //执行当前上下文中，methods中指定的函数，即handleClose
            if(binding.expression) binding.value(e);
        }

        function keyboardHandler(e){
            if(e.code == 'Escape'){
                if(binding.expression){
                    binding.value(e);
                }
            }
        }

        el.__vueClickOutside__ = documentHandler;

        document.addEventListener('click',documentHandler);


        /**
         * 把esc设置为退出的快捷键
         * 1. 获取binding.modifiers.esc
         * 2. 如果为false，则不管，如果为true，则添加按键监听器
         */

        el.__vueKeyboardHandler__ = keyboardHandler;

        if(binding?.modifiers?.esc){
            document.addEventListener('keydown',keyboardHandler)
        }
    },
    unbind:function (el, binding, vnode, oldVnode) {
        document.removeEventListener('click',el.__vueClickOutside__);
        document.removeEventListener('keydown',el.__vueKeyboardHandler__);
        delete el.__vueClickOutside__;
        delete el.__vueKeyboardHandler__;
    },
    update:function (el, binding, vnode, oldVnode) {
        console.log(this.app.$data.show);
    }
})
