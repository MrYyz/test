<?php

// $newUser = array("userphone"=>$up,"password"=>$ps,"id"=>$newId);
// var_dump($newUser);
// 
// 

// 创建一个空对象
$obj=(object)array();
//假设这是从数据库取内容
$arr=["prod_id"=>103,"prod_name"=>"黑客技术从入门到入狱"];
// 遍历数组，并且填充进对象中
foreach($arr as $k=>$v) $obj->$k=$v;

// var_dump($obj);


// 创建一个空对象
$obj2=(object)array();
//假设这是从数据库取内容
$arr2=["prod_id"=>1010,"prod_name"=>"ekekkekekekeke"];
// 遍历数组，并且填充进对象中
foreach($arr2 as $k=>$v) $obj2->$k=$v;

$newArr = [];

 array_push($newArr,$obj);
 array_push($newArr,$obj2);

var_dump($newArr);



$arr_data=[];
$up = 123;$ps=111;

$newId = count($arr_data);
// 创建一个空对象
$newObj = (object)array();
// 添加数据
$newArr = ["userphone"=>$up,"password"=>$ps,"id"=>$newId];
// 遍历数组,并且填充进对象中
foreach($newArr as $k => $v) $newObj -> $k=$v;

array_push($arr_data,$newObj);

var_dump($arr_data);