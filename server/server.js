// requires
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// modules
const pool = require('./modules/pool');

// uses
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({ extended: true }));

// globals
const port = 5000;

// spin up server
app.listen(port, () => {
    console.log('server is up on:', port);
})

// routes
app.get('/tasks', (req, res) => {
    console.log('/tasks GET hit', req.query);
    const queryString = 'SELECT * FROM tasks ORDER BY completed, person_assigned ASC';
    pool.query(queryString).then((results) => {
        res.send(results.rows);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    })
})


app.post('/tasks', (req, res) => {
    console.log('/tasks POST hit', req.body);
    let queryString = 'INSERT INTO "tasks" (person_assigned, task_assigned, date_assigned, completed) VALUES($1, $2, $3, $4)';
    let values = [req.body.person_assigned, req.body.task_assigned, req.body.date_assigned, req.body.completed];
    pool.query(queryString, values).then((results) => {
        res.sendStatus(201);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    })
})

app.delete('/tasks', (req, res) => {
    // delete row with imported id
    let queryString = `DELETE FROM "tasks" where id=${req.query.id};`;
    pool.query(queryString).then((results) => {
        res.sendStatus(200);
    }).catch((results) => {
        console.log('error in DELETE');
        res.sendStatus(500);
    })
})

app.put('/tasks', (req, res) => {
    let date = new Date().toISOString();
    let currentdate = (date.substring(0, 10));
    console.log(currentdate);
    let queryString = `UPDATE "tasks" SET date_assigned ='${currentdate}' WHERE id=${req.query.id};
    UPDATE "tasks" SET completed = NOT completed WHERE id=${req.query.id};`;
    pool.query(queryString).then((results) => {
        res.sendStatus(200);
    }).catch((results) => {
        console.log('error in PUT');
        res.sendStatus(500);
    })
})
