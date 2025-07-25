const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
  const { username, password } = req.body
  try {
    console.log('Intentando registrar usuario:', username)
    const userExists = await User.findOne({ username })
    if (userExists) {
      console.log('Usuario ya existe:', username)
      return res.status(400).json({ msg: 'El usuario ya existe' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({ username, password: hashedPassword })
    await newUser.save()
    console.log('Usuario registrado con éxito:', username)

    res.status(201).json({ msg: 'Usuario registrado correctamente' })
  } catch (err) {
    console.error('Error en register:', err)
    res.status(500).json({ msg: 'Error del servidor', error: err.message })
  }
}


exports.login = async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await User.findOne({ username })
    if (!user) return res.status(400).json({ msg: 'Credenciales incorrectas' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ msg: 'Credenciales incorrectas' })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })

    res.json({ token, username: user.username })
  } catch (err) {
  console.error('Error en el registro:', err)
  res.status(500).json({ msg: 'Error del servidor', error: err.message })
}
}
