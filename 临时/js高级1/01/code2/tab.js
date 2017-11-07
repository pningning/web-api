	(function(window){
			
			
			//  Tab选项卡  把整体功能抽象成一个对象  Tab
		// 我们可以给这个对象添加属性和方法  
		/*input  div 把需要参与实现功能的元素看成对象的属性
		把 点击input实现对应的div切换这个功能 看成对象的方法*/
		
		
		// 面向对象的写法 最好将不要出现全局变量， 尽可能转换成对象的属性
		//　将不同的功能 用不同的方法去实现   功能划分清楚 尽可能不要功能嵌套
		// 遇到this出现指向错误问题 ，用更改this指向 或者用var that 存一下
		// 写一个Tab切换的构造函数
		function Tab(id){
			// 把属性往构造函数里面添加
			this.parent = document.getElementById(id);
			this.aInp = this.parent.getElementsByTagName("input");
			this.aDiv = this.parent.getElementsByTagName("div");
			this.timer = null;
			this.num = 0;
			this.isPlay = false;
			this.init();
		}
		// 给构造函数的原型添加一个初始化方法  （将其他需要调用的方法同一执行）
		Tab.prototype.init = function(){
			var that = this;
			// 循环所有的input  给所有的input添加单击事件
			for(var i = 0; i < this.aInp.length; i++) {
				this.aInp[i].index = i;
				this.aInp[i].onclick =function(){
					that.fnTab(this.index);
				};
				
			}
			
		}
		// 往原型上面添加一个切换方法 
		Tab.prototype.fnTab = function(idx){
			console.log(this);// 变成构造函数中的隐式对象this
			// 暴力清除
			for(var j = 0; j < this.aInp.length; j++){
				this.aInp[j].className = "";
				this.aDiv[j].style.display = "none";
			}
			//让当前单击的那个按钮加上类
			this.aInp[idx].className = "active";
			//让当前对应的那个div显示出来
			this.aDiv[idx].style.display = "block";
		}
		//自动播放
		Tab.prototype.autoPlay = function(){
			this.isPlay = true;
			var that = this;
			this.timer = setInterval(function(){
				that.num++;
				if(that.num>that.aInp.length-1){
					that.num = 0;
				}
				that.fnTab(that.num);
				
			},1000);
			
		}
		Tab.prototype.stop = function(){
			this.isPlay = false;
			clearInterval(this.timer);
		}
			
		window.Tab = Tab;//将内部的构造函数暴露出去	
			
		})(window);