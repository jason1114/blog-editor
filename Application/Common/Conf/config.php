<?php
return array(
	//'配置项'=>'配置值'
	'LOCAL_ENV_MAP' => array(
		'MYSQL_HOST' => 'localhost',
		'MYSQL_PORT' => '3306',
		'MYSQL_SCHEMA' => 'blog_editor',
		'MYSQL_USERNAME' => 'root',
		'MYSQL_PASSWORD' => 'dd'	
		),
	'MOPAAS_ENV_MAP' => array(
		'MYSQL_HOST' => getenv('MOPAAS_MYSQL6757_HOST'),
		'MYSQL_PORT' => getenv('MOPAAS_MYSQL6757_PORT'),
		'MYSQL_SCHEMA' => getenv('MOPAAS_MYSQL6757_NAME'),
		'MYSQL_USERNAME' => getenv('MOPAAS_MYSQL6757_USERNAME'),
		'MYSQL_PASSWORD' => getenv('MOPAAS_MYSQL6757_PASSWORD')
		)
);