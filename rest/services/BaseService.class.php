<?php
abstract class BaseService {

  protected $dao;

  /**
   * constructor of BaseService
   */
  public function __construct($dao){
    $this->dao = $dao;
  }

  /**
   * function to get all
   */
  public function get_all(){
    return $this->dao->get_all();
  }

  /**
   * function to get entity by id
   */
  public function get_by_id($user, $id){
    return $this->dao->get_by_id($id);
  }

  /**
   * function to add entity
   */
  public function add($user, $entity){
    return $this->dao->add($entity);
  }

  /**
   * function to add user
   */
   public function addUser($pass,$entity){
    $entity['password'] = $pass;
    return $this->dao->add($entity);
  }

  /**
   * function to update entity
   */
  public function update($user, $id, $entity){
    return $this->dao->update($id, $entity);
  }

  /**
   * function to delete entity
   */
  public function delete($id){
    return $this->dao->delete($id);
  }
}
?>