<?php
// 本类由系统自动生成，仅供测试用途
namespace Home\Controller;
use Think\Controller;
class UploadController extends Controller {
    private function index($dir){
        header('Content-Type: text/javascript');
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            echo(json_encode(array('error' => 'POST request method only.')));
            exit;
        }
        if (!$_FILES['file']) {
            echo(json_encode(array('error' => 'file field not found.')));
            exit;
        }
        if ($_FILES['file']['error'] !== 0) {
            echo(json_encode(array('error' => 'file field found but with error #' . $_FILES['file']['error'] . '.')));
            exit;
        }
        move_uploaded_file( $_FILES['file']['tmp_name'], $dir.$_FILES['file']['name']);
        echo(
            json_encode(
                array('result' => 'ok','filename' => 'an-introduction-to-any-colony-optimization')
            )
        );
    }
    public function thumb(){
        $this->index(env('THUMB_DIR'));
    }
    public function inset(){
        $this->index(env('INSET_DIR'));   
    }
    public function attachment(){
        $this->index(env('ATTACHMENT_DIR'));   
    }
}