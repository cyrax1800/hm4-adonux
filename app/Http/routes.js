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

Route.group('playfab',function(){
  Route.get('/login','API/PlayfabController.loginCustomID')
  Route.get('/inventory','API/playfab/playfabInventoryController.getUserInventory')
  Route.delete('/inventory','API/playfab/playfabInventoryController.revokeAnItem')
  Route.delete('/inventory/all','API/playfab/playfabInventoryController.revokeAllItemInSegment')
}).prefix('api/playfab')

Route.group('backendless',function(){
  Route.get('/file/*','API/BackendlessController.file')
  Route.post('/file/download','API/BackendlessController.download')
  Route.get('/test','API/BackendlessController.test')
}).prefix('api/backendless')

Route.group('itemCollection',function(){
  Route.get('/','API/ItemController.item')
  Route.post('/add','API/ItemController.store')
}).prefix('api/item')

Route.post('api/image', 'API/ImageController.index');

Route.any('*', 'NuxtController.render')
