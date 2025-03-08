const express = require('express')

const itemRoutes = require('./item.routes')
const authRoutes = require('./auth.routes')
const profileRoutes = require('./profile.routes')

const authMiddleware = require('../middleware')

const router = express.Router()

router.use('/auth', authRoutes)
router.use('/profile', authMiddleware, profileRoutes)
router.use('/items', itemRoutes)

module.exports = router
