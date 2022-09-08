<?php
require_once __DIR__.'/BaseDao.class.php';

class PostDao extends BaseDao{
  /**
  * constructor of dao class
  */
  public function __construct(){
    parent::__construct("Post");
  }

  public function get_posts_by_id_desc(){
    return $this->query("SELECT * FROM Post ORDER BY id DESC", null);
  }

  public function get_user_posts($user_id){
    return $this->query("SELECT * FROM Post WHERE user_id = :user_id ORDER BY id DESC", ['user_id' => $user_id]);
  }

  public function like($id){
    return $this->query("UPDATE Post SET likes = likes+1  WHERE id = :id", ['id' => $id]);
  }

   public function dislike($id){
    return $this->query("UPDATE Post SET dislikes = dislikes+1  WHERE id = :id", ['id' => $id]);
  }
}

?>