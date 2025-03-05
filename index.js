const express = require('express')
const cors = require('cors')
const path = require('path')
const routes = require('./routes')
const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use('/api', routes)

app.use((error, req, res, next) => {
	const status = error.status || 500
	res.status(status).json({
		message: error.message,
		...(error.errors && { errors: error.errors }),
	})
})

const PORT = 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
