const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const prisma = require('../lib/prisma')
const { generateToken, comparePassword } = require('../helper/auth')

const registerController = async (req, res) => {
	const { email, password } = req.body

	const hashedPassword = await bcrypt.hash(password, 10)

	const data = await prisma.user.create({
		data: {
			email,
			password: hashedPassword,
		},
	})

	const token = generateToken(data.id)
	res.json({ token })
}

const loginController = async (req, res) => {
	const { email, password } = req.body

	const user = await prisma.user.findUnique({
		where: {
			email,
		},
	})
	if (!user || !comparePassword(password, user.password)) {
		throw new Error('Email atau password salah')
	}

	const token = generateToken(user.id)
	res.json({ token })
}

module.exports = { registerController, loginController }
