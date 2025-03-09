const express = require('express')
const { getMeController } = require('../controller/profile.controller')

const router = express.Router()

router.get('/', getMeController)

module.exports = router
