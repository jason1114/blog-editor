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
        $del_result = unlink(env('INSET_DIR').$_GET['filename']);
        if(file_exists(env('INSET_DIR').$_GET['filename'])){
            echo json_encode(array('result'=>'error','info'=>'delete file fail'));
            return;
        }
        $statement = $this->pdo->prepare(
            "delete from image where filename=?");
        $statement->execute(array($_GET['filename']));
        if($statement->rowCount()===1){
            echo json_encode(array('result'=>'ok'));
        }else{
            echo json_encode(array('result'=>'error','info'=>$statement->errorInfo()));
        }
    }
}