;(function(w){
			
			function Drag2(id){
				//通过  借用构造函数继承  实现继承父级构造函数里面的属性 
				Drag.call(this,id);
			}
			
			// 通过拷贝继承 实现继承父级的构造函数的原型上的方法
			for(var attr in Drag.prototype) {
				Drag2.prototype[attr] = Drag.prototype[attr];
			}
			// 因为这个对象要实现限制范围  但是限制范围必须要往移动方法里面加  在移动过程中防止出去
			// 所以需要重写fnMove方法
			Drag2.prototype.fnMove = function(e){
				e = e || event;
				var x = e.clientX -this.disX;
				var y = e.clientY - this.disY;
				var maxL = document.documentElement.clientWidth - this.obj.offsetWidth;
				var maxT = document.documentElement.clientHeight - this.obj.offsetHeight;
				
				x = x< 0 ? 0 : x;
				x = x > maxL ? maxL : x;
				y = y <0 ? 0 : y;
				y = y>maxT ? maxT : y;
			   this.obj.style.left = x + "px";
			   this.obj.style.top = y+ "px";
			   
				
			}
			
			w.Drag2 = Drag2;
		})(window);