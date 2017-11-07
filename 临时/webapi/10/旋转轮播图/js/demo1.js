/**
 * Created by Lenovo on 2017/4/15.
 */
window.onload = function () {
    //我们拥有一套样式,可以赋值给所有的li,让他们完成旋转木马式的操作;
    var arrOfJson = [
        {   //  1
            "width":400,
            "top":70,
            "left":50,
            "opacity":0.2,
            "z-index":2
        },
        {  // 2
            width:600,
            top:120,
            left:0,
            opacity:0.8,
            "z-index":3
        },
        {   // 3
            width:800,
            top:100,
            left:200,
            opacity:1,
            "z-index":4
        },
        {  // 4
            width:600,
            top:120,
            left:600,
            opacity:0.8,
            "z-index":3
        },
        {   //5
            width:400,
            top:70,
            left:750,
            opacity:0.2,
            "z-index":2
        }
    ];



    //旋转木马原理: 通过更换数组中样式的位置;或者更换ul中li的职位,利用animate方法的缓慢移动,实现旋转木马;
                //1.点击右侧按钮: 把数组中的第一套样式删除添加到数组的最末尾;
                //2.点击左侧按钮: 把数组中的最后一套样式删除添加到数组的最前面;
                    //如果是操作ul中的li，逻辑相反；


    //0.获取相关元素,鼠标进入显示,移开隐藏;(左右小三角)
    //1.点击右侧按钮: 把数组中的第一套样式删除添加到数组的最末尾;
    //2.点击左侧按钮: 把数组中的最后一套样式删除添加到数组的最前面;


    //0.获取相关元素,鼠标进入显示,移开隐藏;(左右小三角)
    var slide = document.getElementById("slide");
    var arrow = document.getElementById("arrow");
    var liArr = slide.getElementsByTagName("li");
    var prev = arrow.children[0];
    var next = arrow.children[1];

    //鼠标进入显示,移开隐藏;(左右小三角)(操作透明度)
    slide.onmouseover = function () {
        animate(arrow,{"opacity":1});
    }
    slide.onmouseout = function () {
        animate(arrow,{"opacity":0});
    }

    //页面加载的时候,应该让所有的li,都到达数组中的样式设置的位置;
    for(var i=0;i<liArr.length;i++){
        animate(liArr[i],arrOfJson[i]);//每个li按照每套样式走;
    }

    //1.点击右侧按钮: 把数组中的第一套样式删除添加到数组的最末尾;
    next.onclick = function () {
        //操作数组,然后再次按照数组中的样式,设置所有li标签
        //(1).把数组中的第一套样式删除添加到数组的最末尾;
        var aaa = arrOfJson.shift();//删除第一项并返回;
        arrOfJson.push(aaa);//添加到最末尾;
        //(2).让所有li再次执行样式数组里面的内容;
        for(var i=0;i<liArr.length;i++){
            animate(liArr[i],arrOfJson[i]);//每个li按照每套样式走;
        }
    }


    //2.点击左侧按钮: 把数组中的最后一套样式删除添加到数组的最前面;
        //左侧按钮和右侧按钮,逻辑相反;
    prev.onclick = function () {
        //操作数组,然后再次按照数组中的样式,设置所有li标签
        //(1).把数组中的最后一套样式删除添加到数组的最前面;
        arrOfJson.unshift(arrOfJson.pop());
        //(2).让所有li再次执行样式数组里面的内容;
        for(var i=0;i<liArr.length;i++){
            animate(liArr[i],arrOfJson[i]);//每个li按照每套样式走;
        }
    }

}