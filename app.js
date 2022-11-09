const express = require('express')
// import express from 'express' es6
const Joi = require('joi')
const mysql = require('mysql')
require('dotenv').config()
const app = express()
app.use(express.json())

const customers = [
    { id: 1, name: 'john'},
    { id: 2, name: 'mike'},
    { id: 3, name: 'jacks'},
]

app.get('/', (req, res) => {
    res.send('hello world')
    // res.send([1,2,4,])
})

const schema = Joi.object( {
    name: Joi.string().min(3).required()
})


// app.listen(3000, () => console.log('listening on port 3000...'))

// app.get('/api/customer/:id', (req, res) => {
//     // res.send(req.params.id)
//     res.status(200).send(req.query.name)
// })

app.get('/api/customer/:id', (req, res) => {
    const customer = customers.find(c => { 
        console.log(c)
        return c.id === parseInt(req.params.id) 
    })
    if (!customer) res.status(404).send('customer not found')
    res.send(customer)
})

// app.post('/api/customers',(req, res)=> {
//     const customer = {
//         id: customers.length + 1,
//         name: req.body.name
//     }
//     customers.push(customer)
//     res.send(customer)
// })

app.get('/api/customers',(req, res)=> {
    res.send(customers)
})

app.post('/api/customers',(req, res)=> {
    const result = schema.validate(req.body)
    console.log(result)
    if (result.error) {
        // res.status(400).send(result.error)
        res.status(400).send(result.error.details[0].message)
        return;
    }
    const customer = {
        id: customers.length + 1,
        name: req.body.name
    }
    customers.push(customer)
    res.send(customer)
})

function validateCustomer(customer) {
    const schema = Joi.object( {
        name: Joi.string().min(3).required()
    })
    return schema.validate(customer)
}

app.put('/api/customer/:id', (req, res) => {
    const customer = customers.find(c => c.id === parseInt(req.params.id))
    if (!customer) res.status(404).send('Customer not found')
    const { error } = validateCustomer(req.body)
    if (error) {
                res.status(400).send(error.details[0].message)
                return
            }
    customer.name = req.body.name
    res.send(customer)
})

app.delete('api/customer/:id', (req, res) => {
    const customer = customers.find(c => c.id === parseInt(req.params.id))
    if (!customer) return res.status(404).send('Customer not found')
    const index = customers.indexOf(course)
    customers.splice(index, 1)
    res.send(customer)
})

var con = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});


app.get('/api/items', (req, res) => {
    let sql = `SELECT * FROM items`;
    con.query(sql, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
        return res.status(200).json(results);
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`))
