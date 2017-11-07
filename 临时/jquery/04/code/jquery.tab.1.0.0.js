(function($){
	
	var settings = {};
	
	function tabFn(options){
		// 你考虑一下 哪些东西需要扩展 或者需要传参
		// 这个插件内部的默认参数
		var defaultSettings = {
			btnVal:["按钮1","按钮2","按钮3"],
			divCon:["内容1","内容2","内容3"],
			evType:"click"
		}
		
		// 建立一个空的json对象    
		settings = {}
		// 使用这个方法  将 用户传入的参数  和默认的参数 将属性一个个的分别赋值到setttings对象身上   后续就可以用
		/*settings 的参数了  这样的目的 是为了防止 默认参数发生覆盖   
		如果用户传入的参数 按照用户来   如果用户没有传入参数  按照默认来*/
		$.extend(settings,defaultSettings,options);
		
		 console.log(settings);
		create.call(this);
		
		eventFn.call(this);
	}
	
	function create(){
		console.log(123);
		// 循环 所有的settings的参数 
		for(var i = 0; i < settings.btnVal.length; i++) {
			
			var $btn = $('<input type="button" value="'+ settings.btnVal[i] +'" />')
			if(i==0) {
				$btn.addClass("active");
			}
			
			this.append($btn);
		}
		
		for(var i = 0; i < settings.divCon.length; i++) {
			var $div = $('<div>'+ settings.divCon[i] +'</div>');
			if(i==0){
				$div.show();
			}
			this.append($div);
		}
	}
	
	function eventFn(){
		for(var i = 0; i < settings.btnVal.length; i++) {
			
			this.find("input").on(settings.evType,function(){
				
				$(this).addClass("active").siblings("input").removeClass("active");
				
				$(this).siblings("div").eq($(this).index()).show().siblings("div").hide();
				
				
			})
			
		}
		
		
	}
	
	
	$.fn.extend({
		tab:tabFn
	})
	
})(jQuery);
