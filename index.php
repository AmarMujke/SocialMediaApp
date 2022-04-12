<?php

include("functions.php");
include("views/header.php");
include("views/home.php");
include("views/footer.php");


require 'vendor/autoload.php';

Flight::route('/', function(){
    
});

Flight::start();
?>