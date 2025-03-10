const prisma = require('../lib/prisma')
const {
	generateToken,
	comparePassword,
	hashPassword,
} = require('../helper/auth')

const registerController = async (req, res) => {
	const { email, password, id } = req.body

	const exist = await prisma.user.findFirst({
		where: {
			AND: [{ email }, { id }],
		},
	})
	if (exist) {
		throw new Error('Gunakan emai lain')
	}

	const hashedPassword = await hashPassword(password)

	const data = await prisma.user.create({
		data: {
			id,
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
	if (!user) {
		throw new Error('Akun tidak ditemukan')
	}

	if (!(await comparePassword(password, user.password))) {
		throw new Error('Email atau password salah')
	}

	const token = generateToken(user.id)
	res.json({ token })
}

module.exports = { registerController, loginController }
