<?php
require_once __DIR__.'/BaseService.class.php';
require_once __DIR__.'/../dao/UserDao.class.php';

class UserService extends BaseService{

  public function __construct(){
    parent::__construct(new UserDao());
  }
  
  /**
   * function to add user
   */
 public function addUser($pass, $user){
    $user['password'] = $pass;
    return parent::addUser($pass,$user);
  }
}
?>