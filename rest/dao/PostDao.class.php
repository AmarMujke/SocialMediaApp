<?php
require_once __DIR__.'/BaseDao.class.php';

class PostDao extends BaseDao{
  /**
  * constructor of dao class
  */
  public function __construct(){
    parent::__construct("Post");
  }

  public function get_posts_by_user_id($user_id){
    return $this->query("SELECT * FROM Post WHERE user_id = :user_id", ['user_id' => $user_id]);
  }
}

?>