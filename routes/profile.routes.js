const express = require('express')
const { getMeController } = require('../controller/profile.controller')

const router = express.Router()

router.post('/', getMeController)

module.exports = router
