const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json())





//Get para obtener data
app.get('/usuario', (req, res) => {
    res.json('get usuario');
});
//Post para crear data
app.post('/usuario', (req, res) => {
    
    res.json('post usuario');
});
//Put para actualizar data
app.put('/usuario/:id', (req, res) => {

    let id = req.params.id;

    res.json({
        id
    });
});
//Delete para borrar data
app.delete('/usuario', (req, res) => {
    res.json('delete usuario');
});

app.listen(3000, () => {
    console.log('Escuchando el puerto:',3000);
    

});
