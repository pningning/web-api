// 这是封装的获取id和标签名的兼容性函数
function $(selector,fuji) {
	// 如果想从某一个元素里面去获取标签名 那么你需要传入特定的父级 
	// 大部分情况下 一般是从整个文档下获取  所有我们最好在内部处理一下
	//如果没有传入父级　那么则直接从文档下获取标签　　如果传入了父级　那么从传入的父级下获取标签名
	fuji = fuji || document;
	
	if(selector.charAt(0)=="#") { 
		return document.getElementById(selector.substring(1));
	}else {
		return fuji.getElementsByTagName(selector);
	}
	
	
}

function startMove(obj,json,rate,callback) {
			
			clearInterval(obj.timer);
			var cur = 0;
			var speed = 0;
			obj.timer = setInterval(function(){
				
				var onOff = true;
				
				// 传入多个属性名和属性值 然后在定时器里面 循环遍历这个对象 每一次定时器执行的时候 都会遍历一次所有的属性
				//让所有的属性都往前挪一步
				for(var attr in json) {
					
					var target = json[attr];
					// 因为z-index这个属性 不需要什么运动 让它直接到达目标点就可以了  所以直接赋值
					if(attr == "z") {
						
						cur = target;
						obj.style.zIndex = cur;
					}//通过判断attr属性是什么 如果传入的属性是透明度 说明你一定是要让透明度运动
					else if(attr == "opacity") {
						cur = Math.round(getStyle(obj,attr)*100);
					}else {
						cur = parseInt(getStyle(obj,attr));
					}
		
					
					speed = (target-cur)/rate;   
					// style="width: 299.981px;" width: 298.8px;
					// 处理一下运动过程中的取整问题 将物体运动分别判断  将结果达到目标点
					speed = speed>0? Math.ceil(speed): Math.floor(speed);
					if(cur != target) {
						onOff = false;
						if(attr == "opacity") {
							obj.style.opacity = (cur + speed)/100 ;
							obj.style.filter = 'alpha(opacity='+ (cur + speed) +')';
						}else{
							obj.style[attr] = cur + speed + "px";
						}
					}
					
					
				}
				
				if(onOff) {
					clearInterval(obj.timer);
					obj.timer = null;
					// 这里清除了定时器 意味着所有的属性都运动完了
				/*	(typeof calllback === "function")&&callback();*/
					 if(typeof callback === "function") {
					 	callback.call(obj);
					 }
				}
				
				
			},30);
			
		}
		
function getStyle(obj,attr) {
	return obj.currentStyle? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
}
		