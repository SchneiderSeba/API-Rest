import { Router } from 'express'
import { createRequire } from 'node:module'
import { randomUUID } from 'node:crypto'
import { validateMovie, validatePartialMovie } from '../validateMovies.js'

import ACCEPTED_ORIGIN from '../originAccepted.js'

const require = createRequire(import.meta.url)
const movies = require('../movies.json')

const movieRouter = Router()

movieRouter.get('/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find(movie => movie.id === id)
  if (movie) {
    res.send(movie)
  } else {
    res.status(404).send({ error: 'Movie not found' })
  }
})

movieRouter.get('/', (req, res) => {
  const origin = req.header('origin')

  if (ACCEPTED_ORIGIN.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin)
  }

  const { genre } = req.query
  if (genre) {
    const filteredMovies = movies.filter(movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase()))
    return res.json(filteredMovies)
  }

  res.json(movies)
})

movieRouter.post('/', (req, res) => {
  const result = validateMovie(req.body)

  if (result.error) {
    return res.status(422).json({ error: JSON.parse(result.error.message) })
  }
  const newMovie = {
    id: randomUUID(),
    ...result.data
  }
  movies.push(newMovie)
  res.status(201).json(newMovie)
})

movieRouter.patch('/:id', (req, res) => {
  const { id } = req.params

  const movieIndex = movies.findIndex(movie => movie.id === id)

  const result = validatePartialMovie(req.body)
  if (result.error) {
    return res.status(422).json({ error: JSON.parse(result.error.message) })
  }
  const upDataMovie = {
    ...movies[movieIndex],
    ...result.data
  }

  movies[movieIndex] = upDataMovie

  return res.json(upDataMovie)
})

movieRouter.delete('/:id', (req, res) => {
  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)
  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
  }
  movies.splice(movieIndex, 1)
  return res.json({ message: 'Movie deleted' })
})

export { movieRouter }
