<?php
// 本类由系统自动生成，仅供测试用途
namespace Home\Controller;
use Think\Controller;
use \Common\Util\HttpClient;
class IndexController extends Controller {
    public function index(){
		//$this->show('<style type="text/css">*{ padding: 0; margin: 0; } div{ padding: 4px 48px;} body{ background: #fff; font-family: "微软雅黑"; color: #333;} h1{ font-size: 100px; font-weight: normal; margin-bottom: 12px; } p{ line-height: 1.8em; font-size: 36px }</style><div style="padding: 24px 48px;"> <h1>:)</h1><p>欢迎使用 <b>ThinkPHP</b>！</p></div><script type="text/javascript" src="http://tajs.qq.com/stats?sId=9347272" charset="UTF-8"></script>','utf-8');
		/*echo "<h1>Hello PHP!</h1>";
	    $host = env("MYSQL_HOST");
	    $port = env("MYSQL_PORT");
	    $dbname = env("MYSQL_SCHEMA");
	    $username = env("MYSQL_USERNAME");
	    $password = env("MYSQL_PASSWORD");
	    echo "<h1>host: $host</h1>";
	    echo "<h1>port: $port</h1>";
	    echo "<h1>dbname: $dbname</h1>";
	    echo "<h1>username: $username</h1>";
	    echo "<h1>password: $password</h1>";*/
	    $this->display();
    }
    public function highlight(){
    	$client = new HttpClient('http://www.baidu.com',80);
    	$client->post('/', array(
		    'lang' => $_GET['lang'],
		    'code' => $_GET['code']
		));
		$pageContents = $client->getContent();
		echo $pageContents;
    }
}