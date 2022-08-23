<?php
require_once __DIR__.'/BaseService.class.php';
require_once __DIR__.'/../dao/PostDao.class.php';

class PostService extends BaseService{

  public function __construct(){
    parent::__construct(new PostDao());
  }

  public function get_posts_by_user_id($user_id){
    return $this->dao->get_posts_by_user_id($user_id);
  }
}
?>