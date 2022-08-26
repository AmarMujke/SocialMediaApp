<?php

// CRUD operations for posts entity

/**
 * @OA\Get(path="/posts", tags={"posts"}, security={{"ApiKeyAuth": {}}},
 *         summary="Return all user posts from the API. ",
 *         @OA\Response( response=200, description="List of posts.")
 * )
 */
Flight::route('GET /posts', function(){
  Flight::json(Flight::postService()->get_all());
});

/**
* List invidiual post
*/
Flight::route('GET /posts/@id', function($id){
    $user = Flight::get('User');
  Flight::json(Flight::postService()->get_by_id($user, $id));
});

/**
* add post
*/
Flight::route('POST /posts', function(){
    $user = Flight::get('User');
  Flight::json(Flight::postService()->add($user, Flight::request()->data->getData()));
});

/**
* update post
*/
Flight::route('PUT /posts/@id', function($id){
  $data = Flight::request()->data->getData();
  $user = Flight::get('User');
  Flight::json(Flight::postService()->update($user, $id, $data));
});

/**
* delete post
*/
Flight::route('DELETE /posts/@id', function($id){
    $user = Flight::get('User');
  Flight::postService()->delete($user, $id);
  Flight::json(["message" => "deleted"]);
});

Flight::route('GET /userPost/@id', function($id){
    Flight::json(Flight::postService()->get_posts_by_user_id($id));
})

?>