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
	//初始化表单
	$('form').first().reset();
	//用户名验证
	$('form').form('user').bind('focus',function(){
		$('#reg .info_user').show();
		$('#reg .error_user').hide();
		$('#reg .succ_user').hide();
	}).bind('blur',function(){
		if(trim($(this).value())==''){
			$('#reg .info_user').hide();
		}else if(!check_user()){
			$('#reg .error_user').show();
			$('#reg .info_user').hide();
			$('#reg .succ_user').hide();
		}else{
			$('#reg .succ_user').show();
			$('#reg .error_user').hide();
			$('#reg .info_user').hide();
		};
		
	});	
	function check_user(){
		if(/[\w]{2,20}/.test(trim($('form').form('user').value()))){
			return true;
		}
		return false;
	}
	//密码验证
	$('form').form('pass').bind('focus',function(){
		$('#reg .info_pass').show();
		$('#reg .error_pass').hide();
		$('#reg .succ_pass').hide();
	}).bind('blur',function(){
		if(trim($(this).value())==''){
			$('#reg .info_pass').hide();			
		}else{
			if(check_pass()){
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
		check_pass();
	})	
	function check_pass(){
		var value=trim($('form').form('pass').value());
		var value_length=value.length;
		var code_length=0;
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
			$('#reg info_pass .s3').css('color','#ccc');			
			$('#reg info_pass .s4').html('中').css('color','#f60');			
		}else if(value_length>=1){
			$('#reg info_pass .s1').css('color','brown');
			$('#reg info_pass .s2').css('color','#ccc');
			$('#reg info_pass .s3').css('color','#ccc');			
			$('#reg info_pass .s4').html('低').css('color','brown');			
		}else{
			$('#reg info_pass .s').css('color','#ccc');
			$('#reg info_pass .s4').html('');				
		}
		if(value_length>=6&&value_length<=20&&!/\s/.test(value)&&code_length>=2){
			return true;
		}else{
			return false;
		}
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
			if(check_notpass()){
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
	function check_notpass(){
		if(trim($('form').form('notpass').value())==trim($('form').form('pass').value())){
			return true;
		}
		return false;
	}
	function check_ques(){
		if($('form').form('ques').value()==0){
			return false;
		}
		return true;
	}
	//回答问题
	$('form').form('ans').bind('focus',function(){
		$('#reg .info_ans').show();
		$('#reg .error_ans').hide();
		$('#reg .succ_ans').hide();
	}).bind('blur',function(){
		if(trim($(this).value())==''){
			$('#reg .info_ans').hide();			
		}else{
			if(check_ans()){
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
	function check_ans(){
		if(trim($('form').form('ans').value()).length>=2&&trim($('form').form('ans').value()).length<=32){
			return true;
		}
		return false;
	}
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
			if(check_email()){
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
	function check_email(){
		if(/^[\w\-\.]+@[\w\-]+(\.[a-zA-Z]{2,4}){1,2}$/.test(trim($('form').form('email').value()))){
			return true;
		}
		return false;
	}
	$('#reg .all_email li').hover(function(){
		$(this).css('background','#e5edf2').css('color','#369');
	},function(){
		$(this).css('background','none').css('color','#666');		
	});
	//电子邮件补全系统键入

	//电子邮件补全系统点击获取
	$('#reg .all_email li').bind('mousedown',function(){
		$('form').form('email').value($(this).Text());
	})
	// $('#reg .all_email li').click(function(){
	// 	alert('123');
	// })；//click事件是在弹起后触发的，而blur失去了焦点后，没有点击弹起的元素，导致click无法触发；
	$('form').form('email').bind('keyup',function(event){
		if($(this).value().indexOf('@')==-1){
			$('#reg .all_email').show();			
			$('#reg .all_email li span').html($(this).value());
		}else{
			$('#reg .all_email').hide();
		}
		if(event.keyCode==40){
			if(this.index==undefined||this.index>=$('#reg .all_email li').length()-1){
				this.index=0;
			}else{
				this.index++;
			}
			$('#reg .all_email li').css('background','none');
			$('#reg .all_email li').css('color','#666');
			$('#reg .all_email li').eq(this.index).css('background','#e5edf2');
			$('#reg .all_email li').eq(this.index).css('color','#369');
		}
		if(event.keyCode==38){
			if(this.index==undefined||this.index<0){
				this.index=0;
			}else{
				this.index--;
			}
			$('#reg .all_email li').css('background','none');
			$('#reg .all_email li').css('color','#666');
			$('#reg .all_email li').eq(this.index).css('background','#e5edf2');
			$('#reg .all_email li').eq(this.index).css('color','#369');
		}
		if(event.keyCode==13){
			$(this).value($('#reg .all_email li').eq(this.index).Text());
			$('#reg .all_email').hide();
			this.index=undefined;
		}
	})
	//生日
	var year=$('form').form('year');
	var month=$('form').form('month');
	var date=$('form').form('date');
	var day30=[4,6,9,11];
	var day31=[1,3,5,7,8,10,12];
	var cur_day=0;
	//注入年
	for(var i=1950;i<=2017;i++){
		year.first().add(new Option(i,i),undefined);
	}
	//注入月
	for(var i=1;i<=12;i++){
		month.first().add(new Option(i,i),undefined);
	}
	//注入日
	year.bind('change',select_day);
	month.bind('change',select_day);
	date.bind('change',function(){
		if(check_birthday()){
			$('#reg .error_birthday').hide();
		}
	})
	function select_day(){
		if(year.value()!=0&&month.value()!=0){
			date.first().options.length=1;
			if(inArray(day31,parseInt(month.value()))){
				cur_day=31;
			}else if(inArray(day30,parseInt(month.value()))){
				cur_day=30;			
			}else{
				if((parseInt(year.value())%4==0&&parseInt(year.value())%100!=0)||parseInt($(this).value())%400==0){
					cur_day=29;				
				}else{
					cur_day=28;				
				}

			}
			for(vari=1;i<=cur_day;i++){
				date.first().add(new Option(i,i),undefined);				
			}
		}else{
			date.first().options.length=1;			
		}		
	}
	function check_birthday(){
		if(year.value()!=0&&month.value()!=0&&date.value()!=0){
			return true;
		}
		return false;
	}
	//备注
	$('form').form('ps').bind('keyup',check_ps).bind('paste',function(){
		setTimeout(check_ps(),1);
	});
	$('#reg .clear').click(function(){
		$('form').form('ps').value($('form').form('ps').value().substring(0,200));
		check_ps();
	})
	function check_ps(){
		var num=200-$('form').form('ps').value().length;
		if(num>=0){
			$('#reg .ps').eq(0).show();
			$('#reg .num').eq(0).html(num);
			$('#reg .ps').eq(1).hide();
		}else{
			$('#reg .ps').eq(1).show();
			$('#reg .num').eq(1).html(-num);
			$('#reg .ps').eq(0).hide();			
		}		
	}
	//提交
	$('form').form('sub').click(function(){
		var flag=true;
		if(!check_user()){
			flag=false;
			$('#reg .error_user').show();			
		}
		if(!check_pass()){
			flag=false;
			$('#reg .error_pass').show();				
		}
		if(!check_pass()){
			flag=false;
			$('#reg .error_notpass').show();				
		}
		if(!check_ques()){
			flag=false;
			$('#reg .error_ques').show();
		}
		if(!check_ans()){
			flag=false;
			$('#reg .error_ans').show();			
		}
		if(!check_email()){
			flag=false;
			$('#reg .error_email').show();			
		}
		if(!check_birthday()){
			flag=false;
			$('#reg .error_birthday').show();			
		}		
		if(flag){
			$(this).submit();
		}
	})
	//轮播器初始化
	$('#banner img').opacity(0);
	$('#banner img').eq(0).opacity(100);
	$('#banner ul li').eq(0).css('color','#333');
	$('#banner strong').html($('#banner img').eq(0).attr('alt'));
	//手动轮播器
	$('#banner ul li').hover(function(){
		clearInterval(banner_timer);
		banner(this,banner_index==0?$('#banner ul li').length()-1:banner_index-1);
	},function(){
		banner_index=$(this).index()+1;
		banner_timer=setInterval(banner_fn,2000);		
	})
	//自动轮播器
	var banner_index=1;
	var banner_type=2;
	var banner_timer=setInterval(banner_fn,2000);

	function banner(obj,prev){
		if(banner_type==1){
			$('#banner img').eq(prev).animate({
				attr:'o',
				target:0,
				t:30,
				step:10,
			}).css('z-index','2');
			$('#banner img').eq($(obj).index()).animate({
				attr:'o',
				target:150,
				t:30,
				step:10,
			}).css('z-index','2');			
		}else if(banner_type==2){
			$('#banner img').eq(prev).animate({
				attr:'y',
				target:150,
				t:30,
				step:10,
			}).css('z-index','2').opacity(100);
			$('#banner img').eq($(obj).index()).animate({
				attr:'y',
				target:0,
				t:30,
				step:10,
			}).css('top','-150px').css('z-index','2').opacity(100);			
		}


		$('#banner ul li').css('color','#999');
		$(obj).css('color','#333');
		$('#banner strong').html($('#banner img').eq($(obj).index()).attr('alt'));		
	}
	function banner_fn(){
		if(banner_index>=$('#banner ul li').length()){
			banner_index=0;
		}
		banner($('#banner ul li').eq(banner_index).first(),banner_index==0?$('#banner ul li').length()-1:banner_index-1);
		banner_index++;			
	}
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


