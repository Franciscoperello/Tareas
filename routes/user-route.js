const express = require("express");
const router = express.Router();
const { addUser, getUsers, getUsersById, updateUser, delUserById, loginAction } = require('./../handlers/userHandle');

router.post('/users', async (req, res) => {
  try {
      const newUser = await addUser(req.body);
      res.send(newUser);
  } catch (error) {
      res.status(500).send('Error adding user');
  }
});
  
router.get('/GetAllUsers', async (req, res) => {
    try {
      let users = await getUsers();
      res.send(users);
    } catch (error) {
      res.status(500).send('Error serching users');
    }
});

router.get('/GetUserById/:id', async (req, res) => {
    try {
      let user = await getUsersById(req.params["id"]);
      res.send(user);
    } catch (error) {
      res.status(500).send('Error serching user by id');
    }
});

router.put('/UpdateUser/:id', async (req, res) => {
    try {
      await updateUser(req.params["id"], req.body);
      res.send("Usuario Actualizado");
    } catch (error) {
      res.status(500).send('Error Actualizando Usuario');
    }
});

router.delete('/DeleteUserById/:id', async (req, res) => {
    try {
      await delUserById(req.params["id"]);
      res.send("Usuario Eliminado");
    } catch (error) {
      res.status(500).send('Error Eliminando el Usuario');
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await loginAction(email, password);
        if (user) {
            res.json(user);
        } else {
            res.status(401).json({ error: 'Credenciales inválidas' });
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = router;