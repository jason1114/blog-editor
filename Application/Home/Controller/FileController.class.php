<?php
// 本类由系统自动生成，仅供测试用途
namespace Home\Controller;
use Think\Controller;
class FileController extends Controller {
    public function thumbnail(){
        $this->readfile_chunked(env('THUMB_DIR'));
    }
    public function inset(){
        $this->readfile_chunked(env('INSET_DIR'));
    }
    public function attachment(){
        $this->readfile_chunked(env('ATTACHMENT_DIR'));
    }
    private function readfile_chunked($dir) {
        $path_info = $_SERVER['PATH_INFO'];
        $info = explode("/", $path_info);
        $filename = $info[count($info)-1];
        $filename_parts = explode(".", $filename);
        $ext = end($filename_parts);
        $mime_table = C('MIME_TYPES');
        $mime = $mime_table[$ext];
        if($mime){
            $file = $dir.$filename;  
            if(!file_exists($file)){
                E("Not Found",404);
                return;
            }          
            $fp = fopen($file, 'rb');
            header('Content-Type: '.$mime );
            while (!feof($fp)) {
                echo fgets($fp, 128);
            }
        }
        else{
            echo "Not supported file type.";
        }
    }
}