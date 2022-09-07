<?php
require_once __DIR__.'/BaseDao.class.php';

class UserDao extends BaseDao{
    
  /**
  * constructor of dao class
  */
  public function __construct(){
    parent::__construct("User");
  }


  public function get_user_by_email($email){
    return $this->query_unique("SELECT * FROM User WHERE email = :email", ['email' => $email]);
  }
  
}

?>
