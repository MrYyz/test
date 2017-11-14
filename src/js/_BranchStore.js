/* 
* @Author: MrYyz
* @Date:   2017-11-11 09:35:23
* @Last Modified by:   Marte
* @Last Modified time: 2017-11-12 17:12:03
*/

// jQuery的ajax方法
// $.ajax(settings)
//     type:请求类型，默认GET
//     url:数据请求地址（API地址）
//     data:发送到服务器的数据对象，格式：{Key:value}。
//     success:请求成功时回调函数。
//     dataType:设定返回数据的格式，json, jsonp, text(默认), html, xml, script
//     async：是否为异步请求，默认true
    
jQuery(function($){
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
