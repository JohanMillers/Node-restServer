
const express = require('express');
const bcrypt =  require('bcrypt');
const Usuario = require('../models/usuario');

const app = express();

//Get para obtener data
app.get('/usuario', (req, res) => {
    res.json('get usuario');
});
//Post para crear data
app.post('/usuario', function(req, res) {

  let body = req.body;

  let usuario = new Usuario(
      {
      nombre: body.nombre,
      email: body.email,
      password: bcrypt.hashSync(body.password,10), 
      role: body.role
  });

  usuario.save( (err, usuarioDB) => {
      
    if(err) {
        return res.status(400).json({
            ok: false,
            err
        })
    }
    res.json({
        ok:true,
        usuario : usuarioDB
    });
  });
});

//Put para actualizar data
app.put('/usuario/:id', (req, res) => {

    let id = req.params.id;
    let body = req.body;

    Usuario.findByIdAndUpdate(id,body,{new: true}, (err,usuarioDB) => {

        if(err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    })

});
//Delete para borrar data
app.delete('/usuario', (req, res) => {
    res.json('delete usuario');
});

module.exports = app;