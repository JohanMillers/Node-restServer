
const express = require('express');
const bcrypt =  require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuario');

const app = express();

//Get para obtener data
app.get('/usuario', (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find({estado: true}, 'nombre email role estado google img ')
            .skip(desde)
            .limit(limite)
            .exec( (err,usuarios) => {

                if(err) {
                    return res.status(400).json({
                        ok: false,
                        err

                    });
                }

                Usuario.count({estado: true},(err, conteo) => {

                    res.json({
                        ok: true,
                        usuarios,
                        total: conteo
                    })
                })

            })

    
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
    let body = _.pick(req.body, ['nombre','email','img','role','estado']);

    Usuario.findByIdAndUpdate(id,body,{new: true, runValidators: true }, (err,usuarioDB) => {

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
app.delete('/usuario/:id', (req, res) => {

    let id = req.params.id;

    let cambiarEstado = {
        estado : false
    };

    // Usuario.findByIdAndRemove(id,(err,usuarioBorrando) => {

       Usuario.findByIdAndUpdate(id,cambiarEstado,{new: true}, (err,usuarioBorrando) => {


        if(err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if(!usuarioBorrando) {
            return res.status(400).json({
                ok: false,
                err: {
                    message:'Usuario no encontrado'
                }
            });

        }

        res.json({
            ok:true,
            usuario: usuarioBorrando
        });
    });
});

module.exports = app;