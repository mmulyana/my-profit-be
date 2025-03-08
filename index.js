const express = require('express')
const cors = require('cors')
const path = require('path')
const routes = require('./routes')
const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.get('/', (req, res) => {
	res.json({ message: 'welcome' })
})
app.use('/api', routes)

app.use((error, req, res, next) => {
	const status = error.status || 500
	res.status(status).json({
		message: error.message,
		...(error.errors && { errors: error.errors }),
	})
})

const PORT = 4000
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`))
