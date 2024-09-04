const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('@replit/database');
const dbClient = new db();

app.use(bodyParser.json());

app.post('/save', (req, res) => {
    const data = req.body.data;
    dbClient.list().then(keys => {
        const id = keys.length + 1;
        dbClient.set(`data:${id}`, data).then(() => {
            res.json({ message: 'Dados salvos com sucesso!' });
        });
    });
});

app.get('/load', (req, res) => {
    dbClient.list().then(keys => {
        const promises = keys.map(key => dbClient.get(key));
        Promise.all(promises).then(results => res.json(results));
    });
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
