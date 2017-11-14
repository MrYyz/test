<?php
/**
 * @Author: Marte
 * @Date:   2017-11-12 16:35:01
 * @Last Modified by:   Marte
 * @Last Modified time: 2017-11-12 16:59:53
 */

// 找到数据路径
$file_url = "./data/Diamond.json";
// 以何方式打开数据接口
$myfile = fopen($file_url,'r');
// 记录数据
$content =fread($myfile,filesize($file_url)); 
// 关闭数据接口
fclose($myfile);
// $arr_data = json_decode($content);
$res = json_decode($content);
echo $content;
// var_dump($res);
