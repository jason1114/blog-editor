<?php
return array(
	'URL_ROUTER_ON'   => true,
	'URL_ROUTE_RULES' => array( //定义路由规则
	    //'thumbnails/:filename\.:e' => 'File/thumbnail',
	    'thumbnails/:filename' => 'File/thumbnail',
	    'insets/:filename' => 'File/inset',
	    'attachments/:filename' => 'File/attachment'
	 )
);