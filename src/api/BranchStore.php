<?php
/**
 * @Author: Marte
 * @Date:   2017-11-11 09:46:12
 * @Last Modified by:   Marte
 * @Last Modified time: 2017-11-11 11:49:58
 */

// C:\Users\Administrator\Desktop\dionly\src\api\data\BranchStore.json
// 文件路径
$file_url = "./data/BranchStore.json";

// 打开文件
$myfile = fopen($file_url,'r');

// 读取文件内容
$content = fread($myfile,filesize($file_url));

// 关闭文件
fclose($myfile);


$arr_data = json_decode($content);

// 输出内容
echo $content;
// var_dump($arr_data);
// echo json_encode($content,JSON_UNESCAPED_UNICODE);




?>

