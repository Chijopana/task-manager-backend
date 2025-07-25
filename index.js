const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const userRoutes = require('./routes/userRoutes')
const taskRoutes = require('./routes/taskRoutes')

app.use('/api/users', userRoutes)
app.use('/api/tasks', taskRoutes)

app.get('/', (req, res) => {
  res.send('Servidor funcionando 🚀')
})

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`))
  })
  .catch(err => console.error('Error conectando a MongoDB', err))
