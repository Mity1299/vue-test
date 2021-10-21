import Vue from 'vue';
import HelloWorld from './section.vue';
new Vue({
    name: 'App',
    // components: {
    //     HelloWorld
    // },
    render(createElement) {
        return createElement(HelloWorld);
    }
}).$mount('#app');
