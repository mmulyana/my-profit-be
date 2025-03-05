const express = require('express')
const itemRoutes = require('./item.routes')

const router = express.Router()

router.use('/items', itemRoutes)

module.exports = router
