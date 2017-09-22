$(function(){


	//个人中心
	$("header .member").hover(function(){
		$(this).css("backgroundColor","lightgray");
		$("header .member_ul").show().animate({
			t:30,
			step:10,
			mul:{
				o:100,
				h:120,
			}
		});
	},function(){
		$("header .member").css("backgroundColor","white");
		$("header .member_ul").animate({
			mul:{
				h:0,
				o:0,
			},
			t:30,
			step:10,
			fn:function(){
				$("header .member_ul").hide();
			}			
		});
	})
	//登录框+遮罩
	$("#login").center(350,250);
	$("#login").resize(function(){
		if($("#login").css("display")=="block"){
			$("#screen").lock();
		}
		
	})
	$("#login .close").click(function(){
		$("#login").css("display","none");
		//先执行动画效果，再执行关闭
		$("#screen").animate({
			attr:"o",
			target:0,
			t:30,
			step:10,
			fn:function(){
				$("#screen").unlock();
			}			
		});
	})
	$("header .login").click(function(){
		$("#login").center(350,250).css("display","block");
		$("#screen").lock().animate({
			attr:"o",
			target:30,
			t:30,
			step:10,
			fn:function(){

			},
		});
	})
	//拖拽
	$("#login").drag([$("#login h3").first()]);
	//注册框+遮罩
	$("#reg").center(600,550);
	$("#reg").resize(function(){
		if($("#reg").css("display")=="block"){
			$("#screen").lock();
		}
		
	})
	$("#reg .close").click(function(){
		$("#reg").css("display","none");
		//先执行动画效果，再执行关闭
		$("#screen").animate({
			attr:"o",
			target:0,
			t:30,
			step:10,
			fn:function(){
				$("#screen").unlock();
			}			
		});
	})
	$("header .reg").click(function(){
		$("#reg").center(600,550).css("display","block");
		$("#screen").lock().animate({
			attr:"o",
			target:30,
			t:30,
			step:10,
			fn:function(){

			},
		});
	})
	//拖拽
	$("#reg").drag([$("#reg h3").first()]);
	//用户名验证
	$('form').form('user').bind('focus',function(){
		$('#reg .info_user').show();
		$('#reg .error_user').hide();
		$('#reg .succ_user').hide();
	}).bind('blur',function(){
		if(trim($(this).value())==''){
			$('#reg .info_user').hide();
		}else if(!/[\w]{2,20}/.test(trim($(this).value()))){
			$('#reg .error_user').show();
			$('#reg .info_user').hide();
			$('#reg .succ_user').hide();
		}else{
			$('#reg .succ_user').show();
			$('#reg .error_user').hide();
			$('#reg .info_user').hide();
		};
		
	});	
	//密码验证
	$('form').form('pass').bind('focus',function(){
		$('#reg .info_pass').show();
		$('#reg .error_pass').hide();
		$('#reg .succ_pass').hide();
	}).bind('blur',function(){
		if(trim($(this).value())==''){
			$('#reg .info_pass').hide();			
		}else{
			if(check_pass(this)){
				$('#reg .info_pass').hide();
				$('#reg .error_pass').hide();
				$('#reg .succ_pass').show();			
			}else{
				$('#reg .info_pass').hide();
				$('#reg .error_pass').show();
				$('#reg .succ_pass').hide();			
			}
		}
		
	});	
	//密码强度验证
	$('form').form('pass').bind('keyup',function(){
		check_pass(this);
	})	
	function check_pass(_this){
		var value=trim($(_this).value());
		var value_length=value.length;
		var code_length=0;
		var flag=false;
		if(value_length>=6&&value_length<=20){
			$('#reg .info_pass .q1').html('●').css('color','green');
		}else{
			$('#reg .info_pass .q1').html('○').css('color','#ccc');			
		}
		if(value.length>0&&!/\s/.test(value)){
			$('#reg .info_pass .q2').html('●').css('color','green');			
		}else{
			$('#reg .info_pass .q2').html('○').css('color','#ccc');			
		}
		if(/[\d]/.test(value)){
			code_length++;
		}
		if(/[a-z]/.test(value)){
			code_length++;
		}
		if(/[A-Z]/.test(value)){
			code_length++;
		}
		if(/[^\w]/.test(value)){
			code_length++;
		}
		if(code_length>=2){
			$('#reg .info_pass .q3').html('●').css('color','green');
		}else{
			$('#reg .info_pass .q3').html('○').css('color','#ccc');			
		}
		//安全级别
		if(value_length>=10&&code_length>=3){
			$('#reg info_pass .s').css('color','green');
			$('#reg info_pass .s4').html('高');
		}else if(value_length>=8&&code_length>=2){
			$('#reg info_pass .s1').css('color','#f60');
			$('#reg info_pass .s2').css('color','#f60');
			$('#reg info_pass .s4').html('中').css('color','#f60');			
		}else if(value_length>=1){
			$('#reg info_pass .s1').css('color','brown');
			$('#reg info_pass .s4').html('低').css('color','brown');			
		}else{
			$('#reg info_pass .s').css('color','#ccc');
			$('#reg info_pass .s4').html('');				
		}
		if(value_length>=6&&value_length<=20&&!/\s/.test(value)&&code_length>=2){
			flag=true;
		}
		return flag;
	}
	//密码确认
	$('form').form('notpass').bind('focus',function(){
		$('#reg .info_notpass').show();
		$('#reg .error_notpass').hide();
		$('#reg .succ_notpass').hide();
	}).bind('blur',function(){
		if(trim($(this).value())==''){
			$('#reg .info_notpass').hide();			
		}else{
			if(trim($(this).value())==trim($('form').form('pass').value())){
				$('#reg .info_notpass').hide();
				$('#reg .error_notpass').hide();
				$('#reg .succ_notpass').show();	
			}else{
				$('#reg .info_notpass').hide();
				$('#reg .error_notpass').show();
				$('#reg .succ_notpass').hide();			
			}
		}	
	});	
	//回答问题
	$('form').form('ans').bind('focus',function(){
		$('#reg .info_ans').show();
		$('#reg .error_ans').hide();
		$('#reg .succ_ans').hide();
	}).bind('blur',function(){
		if(trim($(this).value())==''){
			$('#reg .info_ans').hide();			
		}else{
			if(trim($(this).value()).length>=2&&trim($(this).value()).length<=32){
				$('#reg .info_ans').hide();
				$('#reg .error_ans').hide();
				$('#reg .succ_ans').show();	
			}else{
				$('#reg .info_ans').hide();
				$('#reg .error_ans').show();
				$('#reg .succ_ans').hide();			
			}
		}	
	});	
	//电子邮件
	$('form').form('email').bind('focus',function(){
		$('#reg .all_email').show();
		$('#reg .info_email').show();
		$('#reg .error_email').hide();
		$('#reg .succ_email').hide();
	}).bind('blur',function(){
		$('#reg .all_email').hide();		
		if(trim($(this).value())==''){
			$('#reg .info_email').hide();			
		}else{
			if(/^[\w\-\.]+@[\w\-]+(\.[a-zA-Z]{2,4}){1,2}$/.test(trim($(this).value()))){
				$('#reg .info_email').hide();
				$('#reg .error_email').hide();
				$('#reg .succ_email').show();	
			}else{
				$('#reg .info_email').hide();
				$('#reg .error_email').show();
				$('#reg .succ_email').hide();			
			}
		}	
	});	
	$('#reg .all_email li').hover(function(){
		$(this).css('background','#e5edf2').css('color','#369');
	},function(){
		$(this).css('background','none').css('color','#666');		
	});
	//电子邮件补全系统点击获取
	$('#reg .all_email li').bind('mousedown',function(){
		$('form').form('email').value($(this).Text());
	})
	// $('#reg .all_email li').click(function(){
	// 	alert('123');
	// })；//click事件是在弹起后触发的，而blur失去了焦点后，没有点击弹起的元素，导致click无法触发；



	$('form').form('email').bind('keyup',function(){
		if($(this).value().indexOf('@')==-1){
			$('#reg .all_email').show();			
			$('#reg .all_email li span').html($(this).value());
		}else{
			$('#reg .all_email').hide();
		}

	})
	//分享侧栏初始化位置
	$("#share").css('top',(getInner().height-parseInt(getStyle($('#share').first(),'height')))/2+"px");
	$(window).bind('scroll',function(){
		$("#share").animate({
			attr:"y",
			target:getScroll().top+(getInner().height-parseInt(getStyle($('#share').first(),'height')))/2,
		})		
	})
	//分享侧栏收缩效果
	$("#share").hover(function(){
		$(this).animate({
			"attr":"x",
			"target":0,
		});
	},function(){
		$(this).animate({
			"attr":"x",
			"target":-211,
		});
	});
	//滑动导航
	$('nav .about li').hover(function(){
		var target=$(this).first().offsetLeft;
		$('nav .nav_bg').animate({
			attr:'x',
			target:target+20,
			t:30,
			step:10,
			fn:function(){
				$("nav .white").animate({
					attr:'x',
					target:-target,
					t:30,
					step:10,					
				})
			}
		})
	},function(){
		$('nav .nav_bg').animate({
			attr:'x',
			target:20,
			t:30,
			step:10,
			fn:function(){
				$("nav .white").animate({
					attr:'x',
					target:0,
					t:30,
					step:10,					
				})
			}			
		})		
	})
	//左侧菜单
	$('#sidebar h2').toggle(function(){
		$(this).next().animate({
			mul:{
				h:0,
				o:0,
			}
		});
	},function(){
		$(this).next().animate({
			mul:{
				h:150,
				o:100,
			}
		});
	})
})


