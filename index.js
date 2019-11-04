const express = require('express')
const helmet = require('helmet')
const app = express()

const { config } = require('./config/index')
const authApi = require('./routes/auth')
const moviesApi = require('./routes/movies')
const userMoviesApi = require('./routes/userMovies')

const { logErrors, wrapErrors, errorHandler } = require('./utils/middleware/errorHandlers')
const notFoundHandler = require('./utils/middleware/notFoundHandler')

//Body parser middleware
app.use(express.json())
app.use(helmet())

//Routes
authApi(app)
moviesApi(app)
userMoviesApi(app)

//Catch 404 error
app.use(notFoundHandler)

//Errors middleware
app.use(logErrors)
app.use(wrapErrors)
app.use(errorHandler)

app.listen(config.port, function() {
  console.log(`Listening http://localhost:${config.port}`)
})