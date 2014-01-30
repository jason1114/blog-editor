<?php
// 本类由系统自动生成，仅供测试用途
namespace Home\Controller;
use Think\Controller;
class AttachmentController extends Controller {
    private $pdo;
	function __construct(){
		$this->pdo = pdo();
	}
    public function list_attachments(){
    	$statement = $this->pdo->prepare(
    		"select filename from attachment where draft_id=?");
    	$statement->execute(array($_GET['id']));
    	echo json_encode($statement->fetchAll());
    }
    public function upload_attachment(){

    }
}