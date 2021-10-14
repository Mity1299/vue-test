Vue.directive('birthday',{
    bind:function (el, binding, vnode, oldVnode) {
        /**
         * 1. 计算出生了多少天
         * 2. 显示
         */
        if(!(binding.value && binding.value instanceof Date)){
            el.innerHTML = '数据类型错误！';
            return;
        }
        var today = new Date();
        today.setHours(0);
        today.setMinutes(0);
        today.setSeconds(0);
        today.setMilliseconds(0);

        var birthday = binding.value;

        if(today.getTime() - birthday.getTime() < 0) {
            el.innerHTML = '我还没出生欸！';
            return;
        }

        var days = Math.floor((new Date() - binding.value.getTime())/ (24 * 60 * 60 * 1000));

        el.innerHTML = '我已经出生' + days + '天啦！';

        /**
         * 计算相差的年月日
         */
        var calInfo = {
            today:{
                year:today.getFullYear(),
                month:today.getMonth(),
                day:today.getDate()
            },
            birthday:{
                year:birthday.getFullYear(),
                month:birthday.getMonth(),
                day:birthday.getDate()
            }
        }
        var diffDay;
        var diffMonth;
        var diffYear;
        if(calInfo.today.day >= calInfo.birthday.day){
            diffDay = calInfo.today.day - calInfo.birthday.day;
        }else{
            diffDay = calInfo.today.day
                + Time.getMonthDays(today.getMonth() === 0? 12: today.getMonth(), today.getFullYear())
                - calInfo.birthday.day;
            calInfo.today.month -= 1;
        }
        if(calInfo.today.month >= calInfo.birthday.month){
            diffMonth = calInfo.today.month - calInfo.birthday.month;
        }else{
            diffMonth = calInfo.today.month + 12 - calInfo.birthday.month;
            calInfo.today.year -= 1;
        }

        diffYear = calInfo.today.year - calInfo.birthday.year;

        el.innerHTML += `<br>我今天${diffYear}岁${diffMonth}个月${diffDay}天啦~`;


    }
})

var Time = {
    //入参 month 从 1 开始算
    getMonthDays: function(month,year){
        if(typeof month !== 'number' || typeof year !== 'number') throw new Error("calcMonthDays:入参类型不正确");
        if(month === 2){
            return this.isLeapYear(time.getFullYear)? 29 : 28;
        }else if([1,3,5,7,8,10,12].includes(month)){
            return 30;
        }else if([2,4,6,9,11].includes(month)){
            return 31;
        }else{
            throw new Error("calcMonthDays:time.getMonth()出现异常，非1到12月");
        }
    },
    isLeapYear: function(year){
        if(typeof year != 'number') throw new Error("isLeapYear:入参不是数字类型");
        return year % 4 === 0 || year % 400 === 0;
    }
}
