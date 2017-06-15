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
  Route.get('/inventory','API/Playfab/playfabInventoryController.getUserInventory')
  Route.delete('/inventory','API/Playfab/playfabInventoryController.revokeAnItem')
  Route.delete('/inventory/all','API/Playfab/playfabInventoryController.revokeAllItemInSegment')
}).prefix('api/playfab')

Route.group('backendless',function(){
  Route.get('/file/*','API/BackendlessController.file')
  Route.post('/file/download','API/BackendlessController.download')
  Route.get('/test','API/BackendlessController.test')
}).prefix('api/backendless')

Route.group('itemCollection',function(){
  Route.get('/','API/ItemController.item')
}).prefix('api/item')

Route.any('*', 'NuxtController.render')
