<?php
// 本类由系统自动生成，仅供测试用途
namespace Home\Controller;
use Think\Controller;
class ImageController extends Controller {
    private $pdo;
	function __construct(){
		$this->pdo = pdo();
	}
    public function list_images(){
    	$statement = $this->pdo->prepare(
    		"select filename from image where draft_id=?");
    	$statement->execute(array($_GET['id']));
    	echo json_encode($statement->fetchAll());
    }
    public function delete_image(){

    }
    public function upload_image(){

    }
}