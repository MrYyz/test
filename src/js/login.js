/* 
* @Author: Marte
* @Date:   2017-11-13 15:39:29
* @Last Modified by:   Marte
* @Last Modified time: 2017-11-14 13:47:37
*/

jQuery(function($){
    // 借用头部
    $('#LoginHeader').load('public.html .BigHead');

    // 借用尾部-->利用回调函数加载public_2.js（预防加载速度过长）
    $('#LoginFooter').load('public.html .SmallTail',function(){
        // 删掉体验中心
        $('#y_store').remove();

        // 加载public_2.js
        $('html,body').append($('<script/>').attr('src','../js/public_2.js'));
    });

    /*-----------------主体部分开始---------------------*/ 
    var $LoginW = $('#LoginMain').find('.w');
    $LoginW.css('position','relative');

    // 生成表单信息
    var $form = $('<div/>');
    var loginCNT = `<form>
    <div><a href="registration.html">免费注册</a></div>
    <div><input placeholder="11位数字" id="username" name="username"/></div>
    <div><input placeholder="6-20位必须包含字母数字" id="password" name="password"/></div>
    <div><label for="autoLogin"><input type="checkbox" id="autoLogin">自动登录</label><a href="#">忘记密码？</a></div>
    <div><span class="submit">会员登录</span></div>
    <div><a href="#"></a><a href="#"></a><a href="#"></a></div>
                    <form/>`;

    $form.addClass('form');
    $form.html(loginCNT).addClass('form').appendTo($LoginW);

    var username = document.getElementById('username');
    var password = document.getElementById('password');

    console.log(username,password)
    
    username.onblur = function(){
        if(!/^\d{11}$/.test(this.value)){
            var span = document.createElement('span');
            $(span).css({
                'font-size':'12px',
                'color':'red',
                'padding':'10px'
            })
            span.innerText = '号码不对';
            this.parentNode.appendChild(span);
            this.value = '';
        }
    }
    username.onfocus = function(){
        var lastSpan = this.parentNode.lastElementChild;
        if(lastSpan.nodeName.toLowerCase() == 'span'){
            this.parentNode.removeChild(lastSpan);

        }
    }
    password.onblur = function(){
        if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test(this.value)){
            var span = document.createElement('span');
            $(span).css({
                'font-size':'12px',
                'color':'red',
                'padding':'10px'
            })
            span.innerText = '格式不对';
            this.parentNode.appendChild(span);
            this.value = '';
        }
    }
    password.onfocus = function(){
        var lastSpan = this.parentNode.lastElementChild;
        if(lastSpan.nodeName.toLowerCase() == 'span'){
            this.parentNode.removeChild(lastSpan);

        }
    }
    // 提交传参
    $form.find('.submit').click(function(){
        if(!/^\d{11}$/.test(username.value) && !/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/.test(password.value)){
            
            // 暂时没有实现任何提交功能
        }
    });
});