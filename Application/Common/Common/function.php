<?php
function env($name){
	$env_map = C(RUN_TIME.'_ENV_MAP');
	return $env_map[$name];
}
function pdo(){
	$pdo = new PDO("mysql:host=".env('MYSQL_HOST').";dbname=".env('MYSQL_SCHEMA'),
		env('MYSQL_USERNAME'),env('MYSQL_PASSWORD')); 
	return $pdo;
}