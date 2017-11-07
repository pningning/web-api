/**
 * Created by Lenovo on 2017/4/15.
 */
//缓动框架;(普通属性和层级透明度)
function animate(ele,json,fn){
    //要用定时器,先清定时器;
    clearInterval(ele.timer);
    ele.timer = setInterval(function () {
        var bool = true;
        for(var k in json){
            //1.不带单位的属性;               z-index;
            //2.小数为主的属性;(兼容问题)      opacity;
            //思路：普通属性普通处理;如果是特殊属性,特殊处理;  (if判断;)

            //如果是z-index: 直接赋值;因为层级不需要循序渐进;
            if(k === "z-index"){
                //不涉及清除定时器;
                ele.style.zIndex = json[k];

                //如果是opacity: 进行小数到整数转换, 兼容ie678;
            }else if(k === "opacity"){
                //1.计算的时候放大10倍(100倍),赋值的时候缩小10(100倍);
                //如果透明度为0,那么特殊处理,不都能与0才取整;
                if(getStyle(ele,k)*10 === 0){
                    var leader = 0;
                }else{
                    var leader = parseInt(getStyle(ele,k)*10) || 10;//因为带有单位,所以去除px;
                }
                var step = (parseInt(json[k]*10)-leader)/10;
                //二次处理;  大于0向上取整,小于0向下取整;//三元运算只能计算值,不能赋值;
                step = step>0?Math.ceil(step):Math.floor(step);
                //赋值
                leader = leader + step;
                //赋值的时候要缩小10倍;
                ele.style[k] = leader/10;
                //赋值的时候要兼容ie678;  filter;
                ele.style.filter = "alpha(opacity="+leader*10+")";

                //有一个没有到达指定位置也不能清除定时器;
                if(parseInt(json[k]*10) !== leader){
                    bool = false;
                }

                //普通属性;普通处理;
            }else{
                //获取步长;leader理解为当前值的意思;
                var leader = parseInt(getStyle(ele,k)) || 0;//因为带有单位,所以去除px;
                var step = (json[k]-leader)/10;
                //二次处理;  大于0向上取整,小于0向下取整;//三元运算只能计算值,不能赋值;
                step = step>0?Math.ceil(step):Math.floor(step);
                //赋值
                leader = leader + step;
                ele.style[k] = leader + "px";
                //有一个没有到达指定位置也不能清除定时器;
                if(json[k] !== leader){
                    bool = false;
                }
            }
        }
        //console.log(1);
        if(bool){
            clearInterval(ele.timer);
            if(fn){
                fn();
            }
        }
    },30);
}

//封装一个方法
function getStyle(ele,attr){
    //判断:浏览器支持哪个方法或者属性;支持哪个调用哪个;
    if(window.getComputedStyle !== undefined){
        return window.getComputedStyle(ele,null)[attr];
    }else{
        return ele.currentStyle[attr];
    }
}