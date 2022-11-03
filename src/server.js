//const express = require('express')

import express from 'express';
import configViewEngine from './config/viewEngine';
import initWebRouter from './route/web';
//import connection from './config/connectDB';
require('dotenv').config()


const app = express();
const port = process.env.PORT || 8080;

// Gửi data lên server
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

configViewEngine(app)
initWebRouter(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})