<?php
$dir    = './uploadedFiles/';

$allFiles = array_values(array_diff(scandir($dir), array('..', '.')));

$jsObj = "[";

foreach($allFiles as $key=>$value){

 $jsObj = $jsObj. '"' .$value .'",';

 }
 $jsObj = rtrim($jsObj,',');

 echo $jsObj .= "]";
 ?>