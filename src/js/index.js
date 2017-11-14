/* 
* @Author: MrYyz
* @Date:   2017-11-12 12:35:12
* @Last Modified by:   Marte
* @Last Modified time: 2017-11-14 21:39:34
*/

jQuery(function($){
/*---------------裸钻搜索--------------------*/
    // 记录克拉范围
    var $mincar = 0;
    $('.mincar').on('blur',function(){
        $mincar = this.value;
        return $mincar;
    });
    var $maxcar = 10;
    $('.maxcar').on('blur',function(){
        $maxcar = this.value;
        return $maxcar;
    });

    // 声明一个空变量接受用户选择讯息
    // 设置默认参数
    var res = {
        mincar:0,
        maxcar:10,
        ipolish:1,
        icolor:1,
        iclarity:1
    };

    // 外部声明用户选择的参数
    var ipolish,icolor,iclarity;

    // 给裸钻搜索框绑定事件
    $('.y_DR').on('click','span',function(e){
        var curPapa = e.target.parentNode;
        var curType = curPapa.previousElementSibling.innerText;
        var curTxt = e.target.innerText;
        var curLen = curPapa.children.length;
        var idx = $(this).index()+1;
        // console.log(curType,curTxt,curLen,idx);

        // 清除之前选过的背景图
        for(var i=0;i<curLen;i++){
            if(curType=='抛光' || curType=='净重'){
                curPapa.children[i].style.backgroundImage = "url('../css/img/1(1).png')";
            }else if(curType=='颜色'){
                curPapa.children[i].style.backgroundImage = "url('../css/img/1.png')";
            }
            curPapa.children[i].style.color = '#696969';
        };

        // 切换当前选项背景图
        if(curType=='抛光' || curType=='净重'){
            e.target.style.backgroundImage = "url('../css/img/4_4.png')";
            e.target.style.color = '#fff';
        }else if(curType=='颜色'){
            e.target.style.backgroundImage = "url('../css/img/1_1.png')";
            e.target.style.color = '#fff';
        }

        // 记录用户裸钻搜索选项
        if(curType=='抛光'){
            ipolish = idx;
        }else if(curType=='颜色'){
            icolor = idx;
        }else if(curType=='净重'){
            iclarity = idx;
        }
        console.log('抛光'+ipolish,'颜色'+icolor,'净重'+iclarity)

        // 用户选择的参数
        var selection = {
            mincar:$mincar,
            maxcar:$maxcar,
            ipolish:ipolish,
            icolor:icolor,
            iclarity:iclarity
        }
        // 整合用户选择内容
        res = Object.assign({},res,selection);
        return res;
    });
    
    // 用户提交裸钻搜索按钮
    $('.y_drillBtn').click(function(){
        var params = '/diamond/?mincar='+res.mincar+'&maxcar='+res.maxcar+'&icolor='+res.icolor+'&ipolish='+res.ipolish+'&iclarity='+res.iclarity;
        // 修改a标签跳转路径
        location.href = 'http://www.dionly.com'+ params;
        return;
    });

/*---------------钻戒专区--------------------*/
    $.ajax({
        type:'get',
        url:'../api/Diamond.php',
        success:function(data){
            var res = JSON.parse(data);
            console.log(res);

            var $y_content = $('.y_content');

            // 通过循环生成--钻戒&对戒&彩宝&珍珠&黄金--的html格式
            for(var i=0;i<res.length;i++){
                // 创建大盒子
                var $maxBox = $('<div/>').addClass('y_Cmaxbox clearfix');

                $y_content.append($maxBox);
                
                /*-----------左边内容---------------*/
                var $BoxLeft = $('<ul/>').addClass('y_Cleft fl');
                // 左边第一排-->链接地址未创建(备注)
                var li1 = '<li><a><img src="'+res[i].title+'" alt="" /></a></li>';
                // 左边第二排
                var li2 = res[i].species.map((item)=>{
                    return `<a>${item}</a>`;
                }).join('');
                li2 = '<li class="">'+li2+'</li>';
                // 左边第三排
                var li3 = res[i].price.map((item)=>{
                    return `<a>${item}</a>`;
                }).join('');
                li3 = '<li class="">'+li3+'</li>';
                // 左边合并
                var coalescing = li1+li2+li3;
                $BoxLeft.html(coalescing);
                // 将$BoxLeft写入$maxBox
                $maxBox.append($BoxLeft);

                /*-----------中间内容---------------*/
                var $BoxCenter = $('<div/>').css({
                    display:'flex',
                    'flex-wrap':'wrap',
                    'justify-content':'space-around'
                }).addClass('fl');

                var contentC;
                if(i%2==0){
                    $BoxCenter.css({'width':'259px'});
                    contentC = `<a href="#"><img src="${res[i].lPic}" alt="" /></a>`;
                }else{
                    $BoxCenter.css({'width':'600px'});
                    contentC = res[i].mPic.map(function(item){
                        return `<a href="#"><img src="${item}" alt="" /></a>`;
                    }).join('');
                    contentC += res[i].sPic.map(function(item){
                        return `<a href="#"><img src="${item}" alt="" /></a>`;
                    }).join('');
                }
                // 把中间内容写入$maxBox
                $BoxCenter.html(contentC);
                // 将$BoxCenter写入$maxBox
                $maxBox.append($BoxCenter);

                /*-----------右边内容---------------*/
                var $BoxRight = $('<div/>').addClass('fr').css({
                    display:'flex',
                    'flex-wrap':'wrap',
                    'justify-content':'space-around'
                });
                var contentR;

                if(i%2!==0){
                    $BoxRight.css({'width':'259px'});
                    contentR = `<a href="#"><img src="${res[i].lPic}" alt="" /></a>`;
                }else{
                    $BoxRight.css({'width':'600px'});
                    contentR = res[i].mPic.map(function(item){
                        return `<a href="#"><img src="${item}" alt="" /></a>`;
                    }).join('');
                    contentR += res[i].sPic.map(function(item){
                        return `<a href="#"><img src="${item}" alt="" /></a>`;
                    }).join('');
                }

                // 把右边内容写入$maxBox
                $BoxRight.html(contentR);
                // 将$BoxCenter写入$maxBox
                $maxBox.append($BoxRight);

                // 将$maxBox写入html里
                $y_content.append($maxBox);

                // 判断是否存在广告
                if(res[i].advertising){
                    // 创建广告容器
                    var $advBox = $('<div/>').css({
                        'box-shadow':'1px 1px 1px 0 #ccc',
                        'display':'flex',
                        'justify-content':'space-between',
                        'margin-top':'20px'
                    });

                    var advs = res[i].advertising.map((item)=>{
                        return `<a href="#"><img src="${item}" /></a>`;// -->链接地址未创建(备注)
                    }).join('');
                    // 将广告内容写入容器内
                    $advBox.html(advs);
                    // 将广告写入html里
                    $y_content.append($advBox);
                }
            }
        }
    })
});