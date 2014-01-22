<?php
function env($name){
	$val = getenv($name);
	if($val){
		return $val;
	}else{
		$local_env = C('LOCAL_ENV');
		return $local_env[$name];
	}
}