const express = require('express')
const app = express()

app.use(express.static('wwwroot'))

app.use(express.json())

app.use(express.urlencoded({ extended: true }))
module.exports = app