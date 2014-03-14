<?php
return array(
	//'配置项'=>'配置值'
	'LOCAL_ENV_MAP' => array(
		'MYSQL_HOST' => 'localhost',
		'MYSQL_PORT' => '3306',
		'MYSQL_SCHEMA' => 'blog_editor',
		'MYSQL_USERNAME' => 'root',
		'MYSQL_PASSWORD' => 'dd',
		'WEB_ROOT' => 'http://localhost/blog-editor/index.php/',
		"INSET_DIR" => __DIR__."/../../../Public/images/insets/",
		'THUMB_DIR' => __DIR__."/../../../Public/images/thumbnails/",
		'ATTACHMENT_DIR' => __DIR__."/../../../Public/attachments/"
		),
	'MOPAAS_ENV_MAP' => array(
		'MYSQL_HOST' => getenv('MOPAAS_MYSQL6757_HOST'),
		'MYSQL_PORT' => getenv('MOPAAS_MYSQL6757_PORT'),
		'MYSQL_SCHEMA' => getenv('MOPAAS_MYSQL6757_NAME'),
		'MYSQL_USERNAME' => getenv('MOPAAS_MYSQL6757_USERNAME'),
		'MYSQL_PASSWORD' => getenv('MOPAAS_MYSQL6757_PASSWORD'),
		'WEB_ROOT' => 'http://bolgeditor.sturgeon.mopaas.com/index.php/',
		"INSET_DIR" => getenv("MOPAAS_FILESYSTEM7012_LOCAL_PATH")."/".getenv("MOPAAS_FILESYSTEM7012_NAME")."/images/",
		'THUMB_DIR' => getenv("MOPAAS_FILESYSTEM7012_LOCAL_PATH")."/".getenv("MOPAAS_FILESYSTEM7012_NAME").'/thumbnails/',
		'ATTACHMENT_DIR' => getenv("MOPAAS_FILESYSTEM7012_LOCAL_PATH")."/".getenv("MOPAAS_FILESYSTEM7012_NAME").'/attachments/'
		),
	'MOCK' => false,
	'MIME_TYPES' => array(
		'jpg' => 'image/jpeg',
		'jpeg' => 'image/jpeg',
		'png' => 'image/png',
		'zip' => 'application/zip'
		),
	'APP_ROOT'=> __DIR__."/../../../"
);
