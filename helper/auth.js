const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
require('dotenv').config()

const JWT_SECRET = process.env.JWT_SECRET

const hashPassword = async (password) => {
	return await bcrypt.hash(password, 10)
}

const comparePassword = async (password, hash) => {
	return await bcrypt.compare(password, hash)
}

const generateToken = (userId) => {
	return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' })
}

module.exports = {
	hashPassword,
	comparePassword,
	generateToken,
}
