<?php
// 本类由系统自动生成，仅供测试用途
namespace Home\Controller;
use Think\Controller;
class DraftController extends Controller {
	private $pdo;
	function __construct(){
		$this->pdo = pdo();
	}
    public function list_drafts(){
    	$statement = $this->pdo->query("select count(id) from draft");
    	$draft_num_result = $statement->fetchAll();
    	$draft_num = $draft_num_result[0][0];
    	$total = ceil($draft_num/$_GET['page_size']);
    	$current = $_GET['page_num'];
    	if($current>$total){
    		$current = $total;
    	}
    	if($current<1){
    		$current = 1;
    	}
    	$offset = ($current-1)*$_GET['page_size'];
    	$statement = $this->pdo->query(
    		"select id,title from draft order by create_time desc limit ".$offset." ,".$_GET['page_size']);
    	echo json_encode(array(
    		'total' => $total,
    		'current' => $current,
    		'drafts' => $statement->fetchAll()
    		//'draft_num' => $draft_num,
    		//'offset' => $offset,
    		//'size' => $_GET['page_size']
    		));
    	
    }
    public function load_draft(){
        $statement = $this->pdo->prepare(
            "select id,title,content,create_time,last_save_time from draft where id=?");
        $statement->execute(array($_GET['id']));
        echo json_encode($statement->fetch());
    }
    public function create_draft(){
        $statement = $this->pdo->prepare(
            "insert into draft(title,content,create_time,last_save_time) values(?,?,?,?)");
        $content = file_get_contents(C('APP_ROOT').'Public/draft_template.markdown');
        $now =  date("Y-m-d H:i:s");
        $statement->execute(array(date("Y-m-d")."-new-draft",$content,$now,$now));
        echo json_encode(array(
            'aff' => $statement->rowCount(),
            'error' => $statement->errorInfo()
            //'path' => C('APP_ROOT').'Public/draft_template.markdown',
            //'content' => $content
            ));
    }
    public function update_draft(){

    }
    public function delete_draft(){

    }
    public function rename_draft(){
        //get old title
        $statement = $this->pdo->prepare(
            "select title from draft where id=?");
        $statement->execute(array($_GET['id']));
        $r = $statement->fetch();
        $old_title = $r['title'];
        if($statement->rowCount()===0){
            return;
        }
        //update title
        $statement = $this->pdo->prepare(
            "update draft set title=?,last_save_time=? where id=? ");
        $statement->execute(array($_GET['new_title'],date("Y-m-d H:i:s"),$_GET['id']));
        if($statement->errorCode()==="00000"){
            $thumb = env('THUMB_DIR').$this->get_thumb_name($old_title).'.jpg';
            if(file_exists($thumb)){
                $new_title = env('THUMB_DIR').$this->get_thumb_name($_GET['new_title']).'.jpg';
                $result = rename($thumb, $new_title);
                if(!$result){
                    echo json_encode(array('result'=>'error','info' => array('thumb'=>$thumb,'new'=>$new_title)));
                    return ;
                }
            }
            echo json_encode(array('result' => 'ok','thumb'=>$thumb));
        }else{
            echo json_encode(array('result'=>'error','info' => $statement->errorInfo()));
        }
        
    }
    private function get_thumb_name($title){
        $splited = explode("-",$title);
        $start_idx = 4+3+strlen($splited[1])+strlen($splited[2]);
        return substr($title, $start_idx);
    }
}