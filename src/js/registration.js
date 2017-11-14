/* 
* @Author: Marte
* @Date:   2017-11-13 20:38:43
* @Last Modified by:   Marte
* @Last Modified time: 2017-11-14 20:56:07
*/
jQuery(function($){
     // 借用头部
    $('#RegHeader').load('public.html .BigHead');

    // 借用尾部-->利用回调函数加载public_2.js（预防加载速度过长）
    $('#RegFooter').load('public.html .SmallTail',function(){
        // 删掉体验中心
        $('#y_store').remove();

        // 加载public_2.js
        $('html,body').append($('<script/>').attr('src','../js/public_2.js'));
    });

/*-----------手动生成表格-------------------*/ 
    var $register = $('.register');//大盒子

    var $h3 = $('<h3/>').text('免费注册').append($('<span/>').text('REGISTER')).append($('<a/>').text('会员登录').attr({
        'href':'../html/login.html',
        'target':'_brank'
    }));
    $h3.appendTo($register);//头部写入大盒子

    // userphone
    var $div1 = $('<div/>').addClass('form-group clearfix').append($('<label/>').text('手机号码').attr('for','userphone')).append($('<input/>').attr({
        'id':'userphone',
        'name':'userphone',
        'type':'text',
        'placeholder':'11位数字'
    }))
    $div1.appendTo($register);

    // code
    var $div2 = $('<div/>').addClass('form-group clearfix').append($('<label/>').text('验证码').attr('for','code')).append($('<input/>').attr({
        'id':'code',
        'name':'code',
        'type':'text'
    })).append($('<i/>').addClass('idCode')).append($('<a/>').text('换一张').addClass('changeCode'));
    $div2.appendTo($register);

    // 短信验证
    var $div3 = $('<div/>').addClass('form-group clearfix').append($('<label/>').text('短信验证').attr('for','sms')).append($('<input/>').attr({
            'id':'sms',
            'name':'code',
            'type':'text',
            'placeholder':'6位数字'
        })).append($('<i/>').addClass('sms iconfont icon-shouji').text('获取验证码'));
    $div3.appendTo($register);

    // password1
    var $div4 = $('<div/>').addClass('form-group clearfix').append($('<label/>').text('设置密码').attr('for','password1')).append($('<input/>').attr({
        'id':'password1',
        'name':'password1',
        'type':'text',
        'placeholder':'6-20位必须包含字母数字'
    }))
    $div4.appendTo($register);

    // password2
    var $div5 = $('<div/>').addClass('form-group clearfix').append($('<label/>').text('设置密码').attr('for','password2')).append($('<input/>').attr({
        'id':'password2',
        'name':'password2',
        'type':'text',
        'placeholder':'6-20位必须包含字母数字'
    }))
    $div5.appendTo($register);

    // protocol
    var $div5 = $('<div/>').addClass('form-group clearfix')
    .append($('<input/>').attr({
        'id':'protocol',
        'name':'protocol',
        'type':'checkbox',
        'checked':'checked'
    })).append($('<a/>').text('我已阅读并同意《戴欧妮珠宝用户协议》').attr('href','#'));
    $div5.appendTo($register);

    // button   
    var $div6 = $('<div/>').addClass('form-group clearfix')
    .append($('<span/>').text('会员注册').addClass('regBtn'));
    $div6.appendTo($register);

    // 第三方帐号登录1
    var $div7 = $('<div/>').addClass('form-group clearfix')
    .append($('<span/>').text('使用第三方帐号登录'));
    $div7.appendTo($register);

    // 第三方帐号登录2   
    var $div7 = $('<div/>').addClass('form-group clearfix')
    .append($('<ul/>').addClass('clearfix').append($('<li/>')).append($('<li/>')).append($('<li/>')));
    $div7.appendTo($register);


/*----------设置各个事件---------------*/ 

    // 声明变量判断各条件是否成立，待提交时用
    var ph = false,co = false,ms = false,ps1 = false,ps2 = false,pro = false;
        // userphone
        $('#userphone').blur(function(){
            ph = false;
            if(!/^\d{11}$/.test(this.value)){
                this.value = '输入的格式有误';
                $(this).css({
                    'color':'red',
                    'font-size':'12px'
                });
            }else{
                // 格式对了，判断有没有被注册？
                $.ajax({
                    url:'../api/registration.php',
                    data:{'userphone':this.value},
                    success:function(data){
                        try{
                            if(data == 'No'){
                                var $span =  $('<u/>').text('您的手机号码已被注册').css({
                                    'color':'red',
                                    'font-size':'12px',
                                    'line-height':'12px',
                                    'height':'12px',
                                    'position':'absolute',
                                    'bottom':'-14px',
                                    'left':'72px',
                                    'text-decoration':'none'
                                }).appendTo($div1).slideDown();
                                $('#userphone').css('color','#f00');
                            }else if(data == 'Yes'){
                                $('#userphone').css('color','#58bc58');
                                ph = true;
                            }
                        }catch(e){
                            console.log(e);
                        }
                    }
                })
            }
            return ph;
        });
        $('#userphone').focus(function(){
            if(!/^\d{11}$/.test(this.value)){
                this.value = '';
                $(this).css({
                    'color':'#000',
                    'font-size':'14px'
                });
            }
            var lastChild = $div1[0].lastElementChild;
            // console.log(lastChild.nodeName)
            if(lastChild.nodeName.toLowerCase() == 'u'){
                $div1[0].removeChild(lastChild)
            }
        });
        // code
        $('.idCode').text(MyObj.randomCode());
        $('.changeCode').click(()=>{
            // 调用MyObj里面的randomCode方法
            var res = MyObj.randomCode();
            console.log(res)
            $('.idCode').text(res);
        })
        $('#code').blur(function(){
            co = false;
            if(this.value == $('.idCode').text()){
                this.style.color = '#58bc58';
                co = true;
            }else{
                this.value = '验证码有误';
                $(this).css({
                    'color':'red',
                    'font-size':'12px'
                });
                $('.idCode').text(MyObj.randomCode());
            }
            return co;
        });
        $('#code').focus(function(){
            if(this.value != $('.idCode').text()){
                $(this).val('').css({
                    'font-size':'14px',
                    'color':'#000'
                });

            }
        })
        // 短信验证
        ms = true;
        // 
        // password1
        $('#password1').blur(function(){
            ps1 = false;
            if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test(this.value)){
                this.value = '格式有误';
                $(this).css({
                    'color':'red',
                    'font-size':'12px'
                })
            }else{
                this.style.color = '#58bc58';
                ps1 = true;
            }
            return ps1;
        });
        $('#password1').focus(function(){
            if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test(this.value)){
                $(this).val('').css({
                    'font-size':'14px',
                    'color':'#000'
                });
            }else{$(this).css('color','#000');}
        });
        // password2
        $('#password2').blur(function(){
            ps2 = false;
            if(this.value === $('#password1').val()){
                this.style.color = '#58bc58';
                ps2 = true;
            }else{
                this.value = '密码与前面不一致';
                $(this).css({
                    'color':'red',
                    'font-size':'12px'
                });
            }
            return ps2;
        });
        $('#password2').focus(function(){
            if(this.value === $('#password1').val()){
                $(this).css({
                    'font-size':'14px',
                    'color':'#000'
                });
            }else{$(this).val('');}
        });

        // 提交
        $('.regBtn').click(function(){
            pro = $('#protocol')[0].checked;
            // 判断是否全通过？
            var judge = [ph,co,ms,ps1,ps2,pro];
            // index 获取错误序号
            var index;
            for(var i=0;i<judge.length;i++){
                if(judge[i] == false){
                    index = i;
                    break;
                }
            }
            // 根据错误序号输出提示信息
            var opt = ['手机号有误','验证码有误','短信验证有误','密码有误','密码与前面不一致','未达成协议'];
            if(index !== undefined){
                // console.log(opt[index*1]);
                alert(opt[index*1]);
            }else{
                // 全通过时操作
                console.log(judge);
                console.log($('#userphone').val());
                console.log($('#password1').val());

                var up = $('#userphone').val();
                var ps = $('#password1').val();

                $.ajax({
                    type:'POST',
                    url:'../api/registration.php',
                    data:{
                        up:up,
                        ps:ps
                    },
                    success:function(data){
                        // console.log(data);
                        window.location.href='login.html';
                    },
                })
                
            }

        });


});


var MyObj = {
    randomCode:function(){
        var arr = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('');
        // 循环数组拼接出验证码
        var res = '';
        for(var i=0;i<4;i++){
            var idx = parseInt(Math.random()*arr.length);
            res += arr[idx];
        }
        return res;
    }
}
