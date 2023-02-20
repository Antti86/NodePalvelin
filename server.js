


const express = require('express');
const app = express();
const path = require('path');
const tietokanta = require('./Tietokanta.json');


const polku = path.join(__dirname, './front');

app.use(express.static(polku));



app.get('/api/Tietokanta', (req, res) => {
    res.json(tietokanta)
    })


app.listen(3300, () => {
    console.log('Server is up on port 3300.')
})