define(['jquery'],function($){

	return com = {
		init:function(){

			com._putOutCity();//显示送达的城市
			com.goTop();//返回顶部动画
			com.getUser();//获取已登录的用户名

			//鼠标移入导航条的“建材”时
			$('.navlist li:contains(建材)').hover(function(){
				$('.classify').show()//显示分类菜单
			},function(){
				$('.classify').hide();
			})

			//防止鼠标从“建材”移入到分类菜单时，菜单消失
			$('.classify').hover(function(){//移入分类菜单时
				$('.classify').show();//显示分类菜单
			},function(){
				$('.classify').hide();
			})

			//鼠标移入购物车时，刷新购物车列表
			$('.buycar>a').mouseenter(function(){

				com.createCarList();//获取购物车cookie
			});

		},

		//设置cookie，功能仅限设置过期时间
		setCookie:function(name,value,deadline){
			var cookieStr = `${name}=${JSON.stringify(value)}`;
			
			if(deadline){//如果有设置过期时间(Number类型)
				var date = new Date();
				date.setDate(date.getDate() + deadline);
				cookieStr += `;expires=${date.toUTCString()}`;
			}

			cookieStr += ';path=/;domain=localhost';//拼接路径和域名,实现cookie的共享

			document.cookie = cookieStr;//写入cookie
		},

		//根据需要获取的cookie名字,获取cookie
		getCookie:function(name){

			var res = '';//提前创建空字符串用于存放cookie
			var cookies = document.cookie;//获取cookie

			cookies = cookies.split('; ');
			cookies.forEach(item=>{
				var temp = item.split('=');

				if(temp[0] == name){//如果存在该cookie
					res = temp[1];
				}
			})
			
			return res;
		},

		//显示需要派送的城市
		_putOutCity:function(){
			var resCity = com.getCookie('city');//获取cookie中的城市名

			if(resCity == ''){//当用户第一次进入页面时，默认显示“北京”
				$('.city').html('北京');

			}
			else{//根据cookie获取的城市名给对应li添加类名city-active
				resCity = resCity.slice(1,-1);//去除cookie中的双引号

				$(`.citylist span:contains(${resCity})`).parent().addClass('city-active').siblings().removeClass('city-active');

					$('.city').html(resCity);//显示的城市为cookie中获得的城市
			}
	
			$('.citylist').on('click','span',function(){//给城市列表下的li绑定点击事件

				$(this).parent().addClass('city-active').siblings().removeClass('city-active');//给点击的span的父级li添加高亮,并移除同级li的高亮

				var $cityHtml = $(this).html();//显示的城市为点击的城市
				$('.city').html($cityHtml);

				com.setCookie('city',$cityHtml,7);//将点击的城市存入cookie
			})
		},

		//返回顶部动画
		goTop:function(){console.log($('.gotop'))
			$('.gotop').on('click',function(){

				$('html,body').animate({'scrollTop':0},100)
			})
		},

		//随机验证码
		randomAuth:function(){
		
			arr = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('');

			// 循环数组拼接出验证码
			var res = '';
			for(var i=0;i<4;i++){
				var idx = parseInt(Math.random()*arr.length);
				res += arr[idx];
			}

			return res.toUpperCase();
		},

		//手机验证码
		randomTelAuth:function(num){

			num = 6;

			var res = String( parseInt(Math.random() * 1000000) );

			for(var i=0;i<num-res.length;i++){
				res += '0';
			}

			return res;
		},

		//获取已登录的用户
		getUser:function(){

			let user = com.getCookie('user');//获取cookie中已登录的用户
			user = user.slice(1,-1);//去除cookie中的双引号

			$('.user').html(user);//将用户名显示

			if(user != ''){//若存在用户名
				
				$('.placeEnter').html('退出').click(function(){//将“请登录”改为“退出”，并绑定事件

					com.setCookie('user','?',-1);//点击退出时，删除用户名的cookie
					com.setCookie('carlist','?',-1);//同时清除购物车

					com.getUser();//重新获取用户名 此时用户名为空
				});

			}else{//若不存在用户名

				$('.placeEnter').html('请登录').click(function(){

					location.href = 'enter.html';//跳转至登录页面
				});

			}
		},

		//生成购物车列表
		createCarList:function(){

			let res = com.getCookie('carlist');

			if(res != '[]' && res != ''){//如果cookie中的carlist不为空

				res = JSON.parse(res);//获取cookie中的购物车信息

				let html = res.map((item,idx)=>{//生成购物车列表结构

					return `<li class="clearfix" data-guid=${item.guid}>
						<img src="../${item.imgurl}">
						<p class="name">${item.goodsName}<br>
							<span class="carlist-config">${item.config}</span>
						</p>
						<p class="fr">
							<span class="price">${item.sale}</span>
							<br>
							<span>×</span>
							<span class="qty">${item.qty}</span>
							<br>
							<span class="del">删除</span>
						</p>
					</li>`
				}).join('');

				$('.carlist ul').html('').html(html);//将结构写入页面

				com.count();//计算总价

				//删除商品
				$('.del').click(function(){

					$(this).closest('li').remove();

					let guid = $(this).closest('li').attr('data-guid');//该商品的id
					let config = $(this).closest('li').find('span[class="carlist-config"]').html();//该商品的配置参数

					res.forEach((item,idx)=>{//找出删除的商品

						if(item.guid == guid && item.config == config){//id和参数都相等时，则为对应的商品
							res.splice(idx,1);

							return;
						}
					})

					com.setCookie('carlist',res,99);

					com.count();
				})
			}else {
				//购物车没有商品时，提示 购物车没有商品
				let html = '<p class="empty">您的购物车里没有商品 (购物车实时刷新)</p>';

				$('.buycar ul').html(html);
			}
		},

		//计算总价
		count:function(){

			let total = 0;

			$('.kind').html($('.buycar li').length);//显示 共有多少种商品

			$('.buycar .price').each((idx,ele)=>{

				let sale = $(ele).html();//每个商品的价钱
				let qty = $(ele).siblings('.qty').html();//每个商品的数量

				total = total +  sale * qty;//计算总价
			})
			
			$('.total').html(total.toFixed(2));//保留两位小数 并写入页面
		}
	}
})