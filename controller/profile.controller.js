const prisma = require('../lib/prisma')

const getMeController = async (req, res) => {
	const { userId } = req.user

	const user = await prisma.user.findUnique({ where: { userId } })
	const data = {
		id: user.id,
		email: user.email,
		i18n: user.i18n || 'id',
		currency: user.currency || 'IDR',
		theme: user.theme || 'light',
	}

	res.json({ data })
}

module.exports = { getMeController }
