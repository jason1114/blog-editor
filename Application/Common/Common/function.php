<?php
function env($name){
	$env_map = C(RUN_TIME.'_ENV_MAP');
	return $env_map[$name];
}