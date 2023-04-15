const Router = require('express')
const router = new Router()
const userController = require('../controller/user.controller')

router.post('/user', userController.createUser)
router.get('/user', userController.getUser)
router.put('/user', userController.updateUser)
router.delete('/user/:id', userController.deleteUser)
router.post('/user/new-to-do-list', userController.createToDoList)
router.put('/user/new-to-do-list', userController.updateToDoList)
router.post('/user/new-content', userController.createContent)
router.put('/user/new-content', userController.updateContent)

module.exports = router
