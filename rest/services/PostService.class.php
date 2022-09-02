<?php
require_once __DIR__.'/BaseService.class.php';
require_once __DIR__.'/../dao/PostDao.class.php';

class PostService extends BaseService{

  public function __construct(){
    parent::__construct(new PostDao());
  }

  
  public function get_posts_by_id_desc(){
    return $this->dao->get_posts_by_id_desc();
  }

   public function add($user_id, $post){
    $post['user_id'] = $user_id;

    return parent::add($user_id,$post);
  }

  public function get_user_posts ($user_id){
    return $this->dao->get_user_posts($user_id);
  }
    
  public function delete($id){
    return $this->dao->delete($id);
  }
}
?>