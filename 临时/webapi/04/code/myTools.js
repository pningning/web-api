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
