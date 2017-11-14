/* 
* @Author: MrYyz
* @Date:   2017-11-11 21:19:28
* @Last Modified by:   Marte
* @Last Modified time: 2017-11-13 14:28:51
*/

jQuery(function($){
/*---------------设置:导航栏-->二级导航下拉显示--------------------*/ 
    $('.y_Nleft').on('mouseenter',function(){
        // 切换小三角图标
        $(this).find('i').removeClass('iconfont icon-arrow-up fr').addClass('iconfont icon-down-copy-copy fr');
        // 二级导航下拉显示
        $('.y_NL_2F').css({
            display:'block',
            height:0,
            overflow:'hidden'
        }).stop().animate({
            height:418
        });
    });
    $('.y_Nleft').on('mouseleave',function(){
        // 切换小三角图标
        $(this).find('i').removeClass('iconfont icon-down-copy-copy fr').addClass('iconfont icon-arrow-up fr');
        // 隐藏二级导航
        $('.y_NL_2F').stop().animate({
            height:0
        });
    });
    // 切换一级导航背景色
    $('.y_Ncenter').on('mouseover','a',function(e){
        $(e.target).css({
            background:'#C11E20',
            color:'#fff'
        });
    });
    // 切换一级导航背景色
    $('.y_Ncenter').on('mouseout','a',function(e){
        $(e.target).css({
            background:'none',
            color:'#000'
        });
    });

/*-------------------设置: 侧边栏---------------------------*/ 
    var $nav = $('<ul/>');
    var cn = ['icon-kefu','icon-shouhou','icon-jiameng','icon-erweima','icon-zhiding'];
    var neirong = ['售前客服','售后资讯','加盟资讯','二维码','返回顶部']
    // var links = ['#','#','#','#','#']
    for(var i=0;i<5;i++){
        var $li = $('<li/>');
        var $i = $('<i/>').addClass('iconfont').addClass(cn[i]);
        // var a = $('<a/>').attr('href',links[i]).append($i)[0];
        var a = $('<a/>').append($i)[0];
        a.innerHTML += neirong[i];
        var $a = $(a);
        $a.appendTo($li);

        $nav.append($li);
    }
    $nav.appendTo($('html')).addClass('sidebar');



     // 给二维码li添加position
    var qrFather = $nav[0].children[3];
    qrFather.style.position = 'relative';
    var $qr = $('<img/>').attr('src','img/qr.png').css({
        position:'absolute',
        left:'-150px',
        top:'-40px',
        width:'152px',
        height:'145px',
        display:'none'
    });
    $qr.appendTo(qrFather);

    qrFather.onmouseenter = function(){
        $qr.show();
    };
    qrFather.onmouseleave = function(){
        $qr.hide();
    };

    // 给toTop添加一个点击事件
    var toTop = $nav[0].children[4];
    toTop.onclick = function(){
        var timer = setInterval(function(){
            var topScroll = window.scrollY;
            var speed = topScroll/5;
            topScroll -=speed;
            if(topScroll<=0 || speed<0){
                clearInterval(timer);
                topScroll = 0;
            }
            scroll(0,topScroll);
        },20);
    }

/*---------------------下面是吸顶菜单的js代码--------------*/
    // window.onscroll = function(){
    //    var header_mx=document.getElementById('header_mx');
    //    var scrollTop=window.scrollY;
    //    if(scrollTop>=68){
    //     header_mx.style.display='block';
    //       header_mx.className='fixed';
    //    }
    //    else{
    //      header_mx.style.display='none';
    //       header_mx.className='';
    //    }
    //  }
     
/*----------------体验中心---------------*/ 
    $.ajax({
        url:'../api/BranchStore.php',

        success:function(data){

            // 接收从后台传来的信息
            var res = JSON.parse(data);
            var $y_SheaderUL = $('.y_SheaderUL');

            // 从数据中获取城市，生成字符串
            var content = res.map(function(item){
                return `<li>${item.city}</li>`
            }).join('');

            // 将城市字符串写入$y_SheaderUL
            $y_SheaderUL.html(content);

            // 生成小三角标记--没用上
            // console.log($y_SheaderUL.children())
            $y_SheaderUL.children().each(function(idx,item){
                var $triangle = $('<span/>')
                // console.log(idx,item)
                $triangle.appendTo(item);
            })

            // 默认体验中心
            var $y_SmLeft = $('.y_SmLeft');
            var $y_SmRight = $('.y_SmRight');
            // 分店名称
            var $y_storeh2 = $("<h2/>");
            $y_storeh2.html(res[1].name).appendTo($y_SmLeft);
            // 分店地址
            var $y_storep1 = $("<p/>");
            $y_storep1.html(res[1].address).appendTo($y_SmLeft);
            // 分店工作时间
            var $y_storep2 = $("<p/>");
            $y_storep2.html(res[1].worktime).appendTo($y_SmLeft);
            // 分店联系方式
            var $y_storep3 = $("<p/>");
            $y_storep3.html(res[1].tel).appendTo($y_SmLeft);
            // 分店照片
            var $y_storeImg = $("<img/>");
            $y_storeImg.attr('src',res[1].url).appendTo($y_SmRight);

            // 利用事件切换体验中心
            $y_SheaderUL.on('mouseover','li',function(e){
                var $curLi = $(e.target);
                // 事件源的索引值
                var idx = $curLi.index();
                // 清空中心信息
                $y_SmLeft.children().html('');
                $y_SmRight.children().html('');
                
                // 切换中心信息
                $y_storeh2.html(res[idx].name);
                $y_storep1.html(res[idx].address);
                $y_storep2.html(res[idx].worktime);
                $y_storep3.html(res[idx].tel);
                $y_storeImg.attr('src',res[idx].url)
            });
        }
    })
});



