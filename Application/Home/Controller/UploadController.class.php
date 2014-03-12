<?php
// 本类由系统自动生成，仅供测试用途
namespace Home\Controller;
use Think\Controller;
class UploadController extends Controller {
    private $pdo;
    function __construct(){
        $this->pdo = pdo();
    }
    private function index($dir,$filename){
        header('Content-Type: text/javascript');
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            echo(json_encode(array('result'=>'ok','info' => 'POST request method only.')));
            exit;
        }
        if (!$_FILES['file']) {
            echo(json_encode(array('result'=>'ok','info' => 'file field not found.')));
            exit;
        }
        if ($_FILES['file']['error'] !== 0) {
            echo(json_encode(array('result'=>'ok','info' => 'file field found but with error #' . $_FILES['file']['error'] . '.')));
            exit;
        }
        return move_uploaded_file( $_FILES['file']['tmp_name'], $dir.$filename);
        
    }
    public function thumb(){
        if (!file_exists(env('THUMB_DIR'))) {
            mkdir(env('THUMB_DIR'));         
        }
        $statement = $this->pdo->prepare("select title from draft where id=?");
        $statement->execute(array($_POST['id']));
        $r = $statement->fetch();
        if(!$r['title']){
            echo json_encode(array('result'=> 'error','info'=>'no such file','r'=>$r));
            return ;
        }
        $filename = $this->get_thumb_name($r['title']).'.jpg';
        $save_file_result = $this->index(env('THUMB_DIR'), $filename);
        if(!$save_file_result){
            echo json_encode(array('result' => 'error','info' => 'save file failure: on moving [' . $_FILES['file']['tmp_name'] . '] to ' . env('THUMB_DIR') . $filename));
            return ;
        }
        echo(
            json_encode(
                array('result' => 'ok','filename' => $filename)
            )
        );
    }
    public function inset(){
        if (!file_exists(env('INSET_DIR'))) {
            mkdir(env('INSET_DIR'));         
        }
        if(file_exists(env('INSET_DIR').$_FILES['file']['name'])){
            echo(json_encode(array('result'=>'error','info'=>'inset already exists.')));
            return ;
        }
        $save_file_result = $this->index(env('INSET_DIR'),$_FILES['file']['name']);
        if(!$save_file_result){
            echo json_encode(array('result' => 'error','info' => 'save file failure'));
            return ;
        }
        $statement = $this->pdo->prepare("insert into image(filename,draft_id) values(?,?)");
        $statement->execute(array($_FILES['file']['name'],$_POST['id']));
        echo(
            json_encode(
                array('result' => 'ok','filename' => $_FILES['file']['name'],
                    's'=>$statement->errorInfo())
            )
        );
    }
    public function attachment(){
        if (!file_exists(env('ATTACHMENT_DIR'))) {
            mkdir(env('ATTACHMENT_DIR'));         
        }
        if(file_exists(env('ATTACHMENT_DIR').$_FILES['file']['name'])){
            echo(json_encode(array('result'=>'error','info'=>'attachment already exists.')));
            return ;
        }
        $save_file_result = $this->index(env('ATTACHMENT_DIR'),$_FILES['file']['name']);
        if(!$save_file_result){
            echo json_encode(array('result' => 'error','info' => 'save file failure'));
            return ;
        }
        $statement = $this->pdo->prepare("insert into attachment(filename,draft_id) values(?,?)");
        $statement->execute(array($_FILES['file']['name'],$_POST['id']));
        echo(
            json_encode(
                array('result' => 'ok','filename' => $_FILES['file']['name'])
            )
        );
    }
    private function get_thumb_name($title){
        $splited = explode("-",$title);
        $start_idx = 4+3+strlen($splited[1])+strlen($splited[2]);
        return substr($title, $start_idx);
    }
}
