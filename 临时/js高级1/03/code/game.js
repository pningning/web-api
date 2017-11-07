function bind(obj,evType,evFn) {
	if(obj.addEventListener){
		obj.addEventListener(evType,evFn,false);
	}else if(obj.attachEvent) {
		obj.attachEvent("on"+evType,evFn);
	}else {
		obj["on"+evType] = evFn;
	}
	
}


// 创建一个整体的游戏对象  将里面的小对象们（食物  蛇  地图）    统一起来

// 创建一个游戏的构造函数   Game
// Game的属性：
   //    把小对象们统一作为他的属性挂载
(function(window){
	/*console.log(window.Food);
	console.log(window.Snake);*/
	// 创建一个游戏的构造函数   Game
	function Game(map){
		// 将食物构造函数实例化一下 产生一个实例对象 食物  存到当前的游戏Game构造函数里面的this身上
		this.food = new Food();
		// 把蛇实例化一下 产生一个蛇 把这个蛇挂载到当前的this的属性snake身上
		this.snake = new Snake();
		
		// 把传入的地图对象也挂载到当前的this身上 作为属性存在
		this.map = map;
	}
	// 给游戏添加一个开始游戏 一键触发 就可以让蛇动起来啦
	// 给游戏构造函数的原型上面添加一个方法 开始游戏方法
	Game.prototype.start = function(){
		// 让食物随机产生一个 让食物执行渲染方法
		this.food.render(this.map);
		// 让蛇执行一下渲染方法 将蛇放入页面中
		this.snake.render(this.map);
		
		//==============================================
		// 不应该让蛇动一下 应该让蛇自动走起来 需要开定时器
		runSnake(this);
		// 将蛇的方向控制的方法作为私有方法 进行编写
		// 调用键盘绑定事件方法
		bindKey(this);
	}
	// 我们可以不往构造函数的原型上添加 （这样加 会暴露外面去 ）
	// 如果你想只是在内部使用一下 可以直接写一个函数作为私有方法 外面访问不到
	function runSnake(that){
		// 开启一个定时器 在定时器中 调用蛇的移动方法
		var timer = setInterval(function(){
			//console.log(this);// window*/
			// 调用蛇的移动方法的时候 只是将蛇的body里面的每一节的身体的坐标往前挪了一下 页面上没有发生变化
			that.snake.move(that.food,that.map);
			
			
			
			// 检测是否撞墙
			
			// 先获取蛇头的坐标  
			var headX = that.snake.body[0].x * that.snake.width;
			var headY = that.snake.body[0].y * that.snake.height;
			// 地图 最左边0 最上面0  最右边maxX  最下面 maxY
			var maxX = that.map.offsetWidth;
			var maxY = that.map.offsetHeight
			
			// 判断是否坐标出去 是否撞墙
			if(headX < 0 || headX >= maxX) { // 39*20==780 ==> 800   800
				// 清除定时器
				clearInterval(timer);
				alert("Game Over");
				return 
			}
			if(headY <0 || headY >= maxY) {
				// 清除定时器
				clearInterval(timer);
				alert("Game Over");
				return;
			}
			
			
			// 你需要在蛇移动方法执行完之后， 需要渲染到页面上去， 
			// 在渲染蛇之前先删除原来页面上渲染的蛇  再去渲染新的蛇放到页面上去
			that.snake.render(that.map);
			
		},200);
		
		
	}
	
	// 编写键盘控制方向方法
	function bindKey(that){
		
		// 在整个文档下document 下 添加键盘按下事件 
		// 调用封装好的一个兼容性的绑定事件的函数
		// 实现键盘控制方向
		bind(document,"keydown",function(ev){
			// 做事件对象兼容
			ev = ev || event;
			// 根据按下的键盘编码是多少 从而 将蛇的对应的方向改成对应的左或者右或者其他方向
			switch(ev.keyCode) {
				case 37:
				that.snake.direction = "left";
				break;
				case 39:
				that.snake.direction  = "right";
				break;
				case 38:
				that.snake.direction  = "up";
				break;
				case 40:
				that.snake.direction = "down";
				break;
			}
			
		})
		
	}
	
	
	// 暴露出去
	window.Game = Game;
})(window);
	     