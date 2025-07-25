const jwt = require('jsonwebtoken')

function auth(req, res, next) {
  const authHeader = req.header('Authorization')
  if (!authHeader) return res.status(401).json({ msg: 'Token requerido' })

  // Asegurarse de que el token venga con el prefijo "Bearer "
  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'Formato de token inválido' })
  }

  const token = authHeader.replace('Bearer ', '')

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (err) {
    res.status(401).json({ msg: 'Token inválido' })
  }
}

module.exports = auth
