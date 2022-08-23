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
* List invidiual todo
*/
Flight::route('GET /posts/@id', function($id){
  Flight::json(Flight::postService()->get_by_id($id));
});

/**
* add todo
*/
Flight::route('POST /posts', function(){
  Flight::json(Flight::postService()->add(Flight::request()->data->getData()));
});

/**
* update todo
*/
Flight::route('PUT /posts/@id', function($id){
  $data = Flight::request()->data->getData();
  Flight::json(Flight::postService()->update($id, $data));
});

/**
* delete todo
*/
Flight::route('DELETE /posts/@id', function($id){
  Flight::postService()->delete($id);
  Flight::json(["message" => "deleted"]);
});

?>