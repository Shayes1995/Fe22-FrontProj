const app = require('./app')
const mongoose = require('mongoose');
const { config } = require('dotenv');
config()

const PORT = process.env.PORT || 3000;

const SERVER_URI = `http://localhost:${PORT}`
const MONGO_URI = process.env.MONGO_URI

app.listen(PORT, () => console.log('Server is connected to' + SERVER_URI))

const connectDataBase = () => {
  mongoose.connect(MONGO_URI)
    .then(() => {
      console.log('we are connected to the database')
    })
    .catch((err) => {
      console.log('first error', err)
    })
}

connectDataBase()
