'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')

Route.group('backendless',function(){
  Route.get('/file','API/BackendlessController.file')
  Route.get('/test','API/BackendlessController.test')
}).prefix('api/backendless')

Route.group('itemCollection',function(){
  Route.get('/','API/ItemController.item')
}).prefix('api/item')
  

Route.any('*', 'NuxtController.render')
