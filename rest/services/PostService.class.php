<?php
require_once __DIR__.'/BaseService.class.php';
require_once __DIR__.'/../dao/PostDao.class.php';

class PostService extends BaseService{

  public function __construct(){
    parent::__construct(new PostDao());
  }

  /**
   * function to get posts by id in descending order
   */
  public function get_posts_by_id_desc(){
    return $this->dao->get_posts_by_id_desc();
  }

  /**
   * function to add post, user's id is set to know who's post it is
   */
   public function add($user_id, $post){
    $post['user_id'] = $user_id;

    return parent::add($user_id,$post);
  }

  /**
   * function to get users posts by user id
   */
  public function get_user_posts ($user_id){
    return $this->dao->get_user_posts($user_id);
  }
    
  /**
   * function to delete post
   */
  public function delete($id){
    return $this->dao->delete($id);
  }

  /**
   * function to like post
   */
  public function like($id){
    return $this->dao->like($id);
  }

  /**
   * function to dislike post
   */
  public function dislike($id){
    return $this->dao->dislike($id);
  }
}
?>