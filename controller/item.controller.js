const prisma = require('../lib/prisma')

const getItems = async (req, res) => {
	const { name, userId } = req.query

	const where = {
		AND: [
			name ? [{ name: { contains: name } }] : [],
			userId ? [{ userId }] : [],
		],
	}
	const data = await prisma.item.findMany({ where })
	res.json({ data })
}

const getItem = async (req, res) => {
	const { id } = req.params
	const data = await prisma.item.findUnique({ where: { id: Number(id) } })
	if (!data) {
		throw new Error('Data tidak ditemukan')
	}

	res.json({ data })
}

const createItem = async (req, res) => {
	const { name, quantity, purchasePrice, sellingPrice } = req.body
	const photo = req.file ? `/uploads/${req.file.filename}` : null

	const data = await prisma.item.create({
		data: {
			name,
			quantity: Number(quantity),
			purchasePrice: Number(purchasePrice),
			sellingPrice: sellingPrice ? Number(sellingPrice) : null,
			photo,
		},
	})
	res.json({ data })
}

const updateItem = async (req, res) => {
	const { id } = req.params
	const { name, quantity, purchasePrice, sellingPrice } = req.body
	const photo = req.file ? `/uploads/${req.file.filename}` : undefined

	const existingItem = await prisma.item.findUnique({
		where: { id: Number(id) },
	})
	if (!existingItem) {
		throw new Error('Data tidak ditemukan')
	}

	const data = await prisma.item.update({
		where: { id: Number(id) },
		data: {
			name,
			quantity: Number(quantity),
			purchasePrice: Number(purchasePrice),
			sellingPrice: sellingPrice ? Number(sellingPrice) : null,
			photo,
		},
	})

	res.json({ data })
}

const deleteItem = async (req, res) => {
	const { id } = req.params
	await prisma.item.delete({ where: { id: Number(id) } })
	res.json({ message: 'item deleted' })
}

module.exports = { getItems, getItem, createItem, updateItem, deleteItem }
