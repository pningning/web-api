// 这是封装的获取id和标签名的兼容性函数
function $(selector) {
			
			if(selector.charAt(0)=="#") { "#div"
				return document.getElementById(selector.substring(1));
			}else {
				return document.getElementsByTagName(selector);
			}
			
			
		}

// 这是一个获取兼容性样式的函数
function getStyle(obj,attr) { // 形参相当于局部变量
			if(obj.currentStyle){
				return obj.currentStyle[attr];
			}else {
				return getComputedStyle(obj)[attr];
			}
		}
// 下面四个小函数  是操作节点的兼容性函数
function first(obj){
		var ele = obj.firstElementChild || obj.firstChild;
		if(ele&&ele.nodeType==1) {
			return ele
		}else {
			return null;
		}
	}

function last(obj){
		var ele = obj.lastElementChild || obj.lastChild;
		if(ele&&ele.nodeType==1) {
			return ele
		}else {
			return null;
		}
	}
function prev(obj){
		var ele = obj.previousElementSibling || obj.previousSibling;
		if(ele&&ele.nodeType==1) {
			return ele
		}else {
			return null;
		}
	}
function next(obj){
		var ele = obj.nextElementSibling || obj.nextSibling;
		if(ele&&ele.nodeType==1) {
			return ele
		}else {
			return null;
		}
	}
// 这是封装了一个解绑的函数
function unbind(obj,evType,evFn) {
	if(obj.removeEventListener) {
		obj.removeEventListener(evType,obj.handle,false);
	}else if(obj.detachEvent) {
		obj.detachEvent("on"+evType,obj.handle);
	}else {
		obj["on"+evType] = null;
	}
	
}

// 这是一个绑定方式的兼容性函数
function bind(obj,evType,evFn) {
	// 根据浏览器能力进行检测  如果识别支持addEventListener 就直接使用这个绑定方式
	// 如果不支持这个方法 则按照后面的方式进行绑定
	
	obj.handle = function(){
		evFn.call(obj);
	}
	
	if(obj.addEventListener){
		// 标准浏览器走这个绑定
		obj.addEventListener(evType,evFn,false);
		obj.handle = evFn;
	}else if(obj.attachEvent) {
		//IE6 7 8 走这个绑定方式
		obj.attachEvent("on"+evType,obj.handle);
	} else {
		// 以上方法都不支持的很老的浏览器 走这个方法
		obj["on"+evType] = evFn;
		
	}
}