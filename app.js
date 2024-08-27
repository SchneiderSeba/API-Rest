import express, { json } from 'express'
import { corsMiddleware } from './Middlewares/cors.js'
import { movieRouter } from './Routes/movies.js'

const app = express()

app.use(json())
app.use(corsMiddleware())

app.use('/movies', movieRouter)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`)
})
// 🗡️
