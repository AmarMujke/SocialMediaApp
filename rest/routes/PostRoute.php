<?php
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
// CRUD operations for posts entity

/**
 * @OA\Get(path="/posts", tags={"posts"}, security={{"ApiKeyAuth": {}}},
 *         summary="Return all user posts from the API. ",
 *         @OA\Response( response=200, description="List of posts.")
 * )
 */

 /**
  * get all posts
  */
Flight::route('GET /posts', function(){
  Flight::json(Flight::postService()->get_all());
});

/**
 * get posts by id in descending order
 */
Flight::route('GET /postsDesc', function(){
    Flight::json(Flight::postService()->get_posts_by_id_desc());
});

/**
* List invidiual post by id
*/
Flight::route('GET /posts/@id/', function($id){
    $user = Flight::get('User');
  Flight::json(Flight::postService()->get_by_id($user, $id));
});

/**
* add post
*/
Flight::route('POST /posts/@id/', function($user_id){
  Flight::json(Flight::postService()->add($user_id, Flight::request()->data->getData()));
});

/**
* like option
*/
Flight::route('PUT /posts/@id', function($id){
  $data = Flight::request()->data->getData();
  Flight::json(Flight::postService()->like($id));
});

/**
 * dislike function
 */
Flight::route('PUT /posts/dislike/@id', function($id){
  $data = Flight::request()->data->getData();
  Flight::json(Flight::postService()->dislike($id));
});

/**
* delete post
*/
Flight::route('DELETE /posts/@id', function($id){
  Flight::postService()->delete($id);
  Flight::json(["message" => "deleted"]);
});

/**
 * get post by user id 
 */
Flight::route('GET /postByUser/@user_id', function($user_id){    
  Flight::json(Flight::postService()->get_user_posts($user_id));
});

?>