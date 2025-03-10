const express = require('express')
const {
	createItem,
	updateItem,
	deleteItem,
	getItem,
	getItems,
} = require('../controller/item.controller')
const upload = require('../lib/multer')
const { validateCreateItem } = require('../validation/item')

const router = express.Router()

router.get('/', getItems)
router.get('/:id', getItem)
router.post('/', upload.single('photo'), validateCreateItem, createItem)
router.patch('/:id', upload.single('photo'), updateItem)
router.delete('/:id', deleteItem)

module.exports = router
