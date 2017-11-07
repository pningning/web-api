// 采用函数的立即执行表达式 （匿名函数的自调用） 将你要写的代码功能封装起来   给一个独立的命名空间 防止和外面的
		// 变量名称发生冲突    是一种模块化代码的方式
		(function(window){
		  
		  // 拖拽    一个拖拽元素    要有一个方法  实现拖动的方法 （有可能有很多方法 共同实现拖拽）
			// 学会抽象事物的能力   把拖拽这个功能的整体看成一个对象    
			// Drag 看成一个对象， 把被拖拽元素 看成一个对象的属性   把拖拽的函数看成这个对象的方法
			
			// 一般  属性 往 构造函数里面加       方法一般往构造函数的原型上面加
			// 方法可能有很多， 就要将方法划分清楚  分开来写， 面向对象的写法最大的特点： 分治
			
			//　面向对象的核心思想　　　：　分而治之
			
			// 创建一个拖拽的构造函数  
			function Drag(id) {
				// 把被拖拽元素看成一个属性   通过传入id值 获取页面上被拖拽元素  赋给当前的构造函数的this.ele
				//　实现了给当前构造内部this隐式对象添加了一个属性ele （ele就是那个被拖拽物体）
				this.ele = document.getElementById(id);
				// 将需要添加和设置的属性进行初始化设置
				this.disX = 0;
				this.disY = 0;
				this.fnDown();
			}
		
			
				//　给当前的构造函数的原型上添加了一个按下方法
			Drag.prototype.fnDown = function(){
				// 将当前函数里面的this存一下
				var that = this;
				//　给被拖拽元素添加按下鼠标事件
				this.ele.onmousedown = function(e){
					
					e = e ||event;
					// 获取固定距离
					that.disX = e.clientX - this.offsetLeft;
					that.disY = e.clientY - this.offsetTop;
					
					
					// 给document添加一个鼠标移动事件
					document.onmousemove = function(e){
						 that.fnMove(e);
					};
					
					// 给document添加一个鼠标弹起事件
					document.onmouseup  = that.fnUp;
				}
				return false;
			}
			
			// 给构造函数的原型上添加一个移动方法
			Drag.prototype.fnMove = function(e){
				e = e || event;
				/*console.log(this);*/
				// 让当前的被拖拽元素 的位置 跟着鼠标走
				this.ele.style.left = e.clientX - this.disX + "px";
				this.ele.style.top = e.clientY - this.disY + "px";
			}
			
			Drag.prototype.fnUp = function(){
				// 弹起鼠标 取消移动事件
				document.onmousemove = null;
			}
		    
		    //将当前的构造函数Drag挂载到window顶级对象的下面  作为一个属性存在
		    // 就可以将当前的构造函数从内部暴露出去
		    window.Drag = Drag;
		   
		})(window);