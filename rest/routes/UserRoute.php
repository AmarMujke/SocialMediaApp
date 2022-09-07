<?php
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

/**
* @OA\Post(
*     path="/login",
*     description="Login to the system",
*     tags={"post"},
*     @OA\RequestBody(description="Basic user info", required=true,
*       @OA\MediaType(mediaType="application/json",
*    			@OA\Schema(
*    				@OA\Property(property="email", type="string", example="amar.mujka@outlook.com",	description="Email"),
*    				@OA\Property(property="password", type="string", example="123",	description="Password" )
*        )
*     )),
*     @OA\Response(
*         response=200,
*         description="JWT Token on successful response"
*     ),
*     @OA\Response(
*         response=404,
*         description="Wrong Password | User doesn't exist"
*     )
* )
*/
Flight::route('POST /login', function(){
    $login = Flight::request()->data->getData();
    $user = Flight::userDao()->get_user_by_email($login['email']);
    if (isset($user['id'])){
      if($user['password'] == md5($login['password'])){
        unset($user['password']);
        $jwt = JWT::encode($user, Config::JWT_SECRET(), 'HS256');
        Flight::json(['token' => $jwt]);
       }else{
        Flight::json(["message" => "Wrong password"], 404);
      }
    }else{
      Flight::json(["message" => "User doesn't exist"], 404);
    }
});

// get all users
Flight::route('GET /users', function(){
  Flight::json(Flight::userService()->get_all());
});

// get users by id
Flight::route('GET /users/@id', function($id){
    $user = Flight::get('User');
  Flight::json(Flight::userService()->get_by_id($user, $id));
});

// delete users
Flight::route('DELETE /users/@id', function($id){
$user = Flight::get('User');
  Flight::userService()->delete($user, $id);
  Flight::json(["message" => "deleted"]);
});

// create new user 
Flight::route('POST /users', function(){
$login = Flight::request()->data->getData();
$pass = md5($login['password']);
Flight::json(Flight::userService()->addUser($pass, Flight::request()->data->getData()));
});



?>
