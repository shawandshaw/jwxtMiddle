var express = require('express')
var router = express.Router()
const login=require('../middleware/login')
const course=require('../middleware/courses')
const select=require('../middleware/selectCourse')
const quit=require('../middleware/quitCourse')



/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index')
})

router.post('/middle/login', login)

router.get('/middle/courses', course)

router.post('/middle/select', select)
router.post('/middle/quit', quit)

module.exports = router
