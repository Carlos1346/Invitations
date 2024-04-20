<?php

use Illuminate\Support\Facades\Route;


route::view('/{path?}', 'welcome')
->where('path','.*');



//Route::get('/', function () {
//    return view('welcome');
//});
