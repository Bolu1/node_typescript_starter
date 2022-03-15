import express from 'express'
const {addUser, signin, getUsers, confirmation} = require('../../../controllers/user/auth')
const validateResult = require('../../../middleware/validateResource')
const {createUserSchema, signinSchema} = require('../../../schema/user.schema')
const requireUser = require('../../../middleware/requireUser')

const router = express()

router.post('/signup', validateResult(createUserSchema), addUser)
router.post('/signin', validateResult(signinSchema), signin)
router.get('/getUsers', getUsers)
router.get('/confirmation/:token', confirmation)

module.exports = router