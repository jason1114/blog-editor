<?php
function env($name){
	$val = getenv($name);
	if($val){
		return $val;
	}else{
		return C('LOCAL_ENV')[$name];
	}
}