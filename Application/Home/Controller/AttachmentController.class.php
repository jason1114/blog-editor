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
    public function delete_attachment(){
        $del_result = unlink(env('ATTACHMENT_DIR').$_GET['filename']);
        if(file_exists(env('ATTACHMENT_DIR').$_GET['filename'])){
            echo json_encode(array('result'=>'error','info'=>'delete file fail'));
            return ;
        }
        $statement = $this->pdo->prepare(
            "delete from attachment where filename=?");
        $statement->execute(array($_GET['filename']));
        if($statement->rowCount()===1){
            echo json_encode(array('result'=>'ok'));
        }else{
            echo json_encode(array('result'=>'error','info'=>$statement->errorInfo()));
        }
    }
}