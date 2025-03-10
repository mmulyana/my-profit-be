const { body } = require('express-validator')

const validateCreateItem = [
	body('name')
		.trim()
		.notEmpty()
		.withMessage('Name is required')
		.isString()
		.withMessage('Name must be a string')
		.isLength({ max: 255 })
		.withMessage('Name must be at most 255 characters'),

	body('quantity')
		.notEmpty()
		.withMessage('Quantity is required')
		.isInt({ min: 0 })
		.withMessage('Quantity must be a non-negative integer'),

	body('purchasePrice')
		.notEmpty()
		.withMessage('Purchase price is required')
		.isFloat({ min: 0 })
		.withMessage('Purchase price must be a non-negative number'),

	body('sellingPrice')
		.optional()
		.isFloat({ min: 0 })
		.withMessage('Selling price must be a non-negative number'),

	(req, res, next) => {
		const { validationResult } = require('express-validator')
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}
		next()
	},
]

module.exports = { validateCreateItem }
