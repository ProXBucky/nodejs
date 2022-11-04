import express from 'express';
import configViewEngine from './config/viewEngine';
import initWebRouter from './route/web';
import initAPIRouter from './route/api'

require('dotenv').config()

var morgan = require('morgan')
const app = express();
const port = process.env.PORT || 8080;

app.use((req, res, next) => {
  //check => return res.send()
  console.log('>>> run into my middleware')
  //console.log(req.method)
  next();
})

app.use(morgan('combined'))

// Gửi data lên server
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

configViewEngine(app)
initWebRouter(app)
initAPIRouter(app)

app.use((req, res) => {
  return res.render('404.ejs')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})