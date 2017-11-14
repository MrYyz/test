<?php
/**
 * @Author: Marte
 * @Date:   2017-11-14 14:38:06
 * @Last Modified by:   Marte
 * @Last Modified time: 2017-11-14 20:47:57
 */


// 是否传有userphone
$userphone = isset($_GET['userphone']) ? $_GET['userphone'] : '';

$up = isset($_POST['up']) ? $_POST['up'] : '';
$ps = isset($_POST['ps']) ? $_POST['ps'] : '';

// 数据地址
$file_url = './data/registration.json';

// 以何种方式打开
$myfile = fopen($file_url,'r') or die("Unable to open file!");

// 存储数据内容
$content = fread($myfile,filesize($file_url));

// 关闭数据路径
fclose($myfile);


// 将读取到的数据转成数组形式
// 第二个参数设定是否转换成关联数组
$arr_data = json_decode($content,true);


// 验证电话号码是否已存在
if($userphone && (!$up && !$ps)){
    // echo $userphone,$up,$ps;
    $hasNum;

    foreach($arr_data as $idx =>$item){
        if($item['userphone'] == $userphone){
            // 若用户电话已占用
            $hasNum = 'No';
        }else{
            // 若用户电话未占用
            $hasNum = 'Yes';
        }
    }
    echo $hasNum;
}


// 添加用户电话、密码
// echo $up;
// echo $ps;


if($up && $ps){
    // echo 'OK';

    $newId = count($arr_data);

    // 创建一个空对象
    $newObj = (object)array();
    // 添加数据
    $newArr = ["userphone"=>$up,"password"=>$ps,"id"=>$newId];
    // 遍历数组,并且填充进对象中
    foreach($newArr as $k => $v) $newObj -> $k=$v;

    array_push($arr_data,$newObj);

    echo json_encode($arr_data);


    // 以何种方式打开数据链接
    $myfile = fopen($file_url,'w');
    // // 重写数据
    fwrite($myfile,json_encode($arr_data));

}




// // 创建一个空对象
// $obj=(object)array();
// //假设这是从数据库取内容
// $arr=["prod_id"=>103,"prod_name"=>"黑客技术从入门到入狱"];
// // 遍历数组，并且填充进对象中
// foreach($arr as $k=>$v) $obj->$k=$v;

// var_dump($obj);

// [
//     {
//         "userphone":"12312312312",
//         "password":"123123a",
//         "id":"0"

//     }
// ]
// http://localhost:1010/api/registration.php?userphone=12312312312