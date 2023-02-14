


const express = require('express');
const app = express();
const path = require('path');
const henkilotiedot = require('./henkilotiedot.json');


const polku = path.join(__dirname, './front');

app.use(express.static(polku));



app.get('/api/henkilotiedot', (req, res) => {
    res.json(henkilotiedot)
    })


app.listen(3300, () => {
    console.log('Server is up on port 3300.')
})