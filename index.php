<?php
require 'vendor/autoload.php';

Flight::route('/', function(){
    echo 'Hello Edvin and Kurto!';
});

Flight::start();
?>