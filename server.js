const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Endpoint personalizado para actualizar la contraseña
server.post('/updatePassword', (req, res) => {
  const { id, newPassword } = req.body;
  const db = router.db;

  const user = db.get('estudiantes').find({ id }).value() || db.get('docentes').find({ id }).value();

  if (user) {
    user.clave = newPassword;
    db.write();
    res.status(200).json({ message: 'Contraseña actualizada exitosamente' });
  } else {
    res.status(404).json({ message: 'Usuario no encontrado' });
  }
});

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server está corriendo en http://localhost:3000');
});
