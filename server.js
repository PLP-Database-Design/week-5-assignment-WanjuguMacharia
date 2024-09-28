const express = require('express');
const app = express();
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const db = mysql.createConnection({
    host : process.env.DB_HOST,
    user : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME
});

db.connect((err) => {
    if(err){
        return console.log('Error connecting to mysql', err);
    }

    console.log('Connected successfully', db.threadId);
});

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


app.get('', (req, res) => {
    res.send('Welcome to the home page');
});

//Question 1

app.get('/data', (req, res) => {
    const getPatients = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients';

    db.query(getPatients, (err, results) => {

        if(err){
            return res.status(400).send('Failed to get patients', err)
        }
            res.status(200).render('data', {results: results});
        
        
    });
    
});

//Question 2

app.get('/provider', (req, res) => {
    const getProviders = 'SELECT first_name, last_name, provider_specialty FROM providers';

    db.query(getProviders, (err, results) => {

        if(err){
            return res.status(400).send('Failed to get providers', err)
        }
            res.status(200).render('provider', {results: results});
        
        
    });
    
});

//Question 3

app.get('/name', (req, res) => {
    const getName = 'SELECT first_name FROM patients';

    db.query(getName, (err, results) => {

        if(err){
            return res.status(400).send('Failed to get first name', err)
        }
            res.status(200).render('name', {results: results});
        
        
    });
    
});

//Question 4

app.get('/specialty', (req, res) => {
    const getSpecialty = 'SELECT provider_specialty FROM providers';

    db.query(getSpecialty, (err, results) => {

        if(err){
            return res.status(400).send('Failed to get specialty', err)
        }
            res.status(200).render('specialty', {results: results});
        
        
    });
    
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
