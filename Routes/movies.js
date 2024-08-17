import { Router } from 'express'
import { validateMovie, validatePartialMovie } from '../validateMovies.js'
import ACCEPTED_ORIGIN from '../originAccepted.js'
import { MovieModel } from '../Models/movie.js'

export const movieRouter = Router()

movieRouter.get('/:id', async (req, res) => {
  const { id } = req.params
  const movie = await MovieModel.getById({ id })

  if (movie) {
    res.send(movie)
  } else {
    res.status(404).send({ error: 'Movie not found' })
  }
})

movieRouter.get('/', async (req, res) => {
  const origin = req.header('origin')

  if (ACCEPTED_ORIGIN.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin)
  }

  const { genre } = req.query
  const movies = await MovieModel.getAll({ genre })
  res.json(movies)
})

movieRouter.post('/', async (req, res) => {
  const result = validateMovie(req.body)

  if (result.error) {
    return res.status(422).json({ error: JSON.parse(result.error.message) })
  }
  const newMovie = await MovieModel.create({ input: result.data })
  res.status(201).json(newMovie)
})

movieRouter.patch('/:id', async (req, res) => {
  const { id } = req.params

  const result = validatePartialMovie(req.body)
  if (result.error) {
    return res.status(422).json({ error: JSON.parse(result.error.message) })
  }

  const updatedMovie = await MovieModel.update({ id, input: result.data })

  return res.json(updatedMovie)
})

movieRouter.delete('/:id', async (req, res) => {
  const { id } = req.params

  const result = await MovieModel.delete({ id })

  if (result === false) {
    return res.status(404).json({ message: 'Movie not found' })
  }

  return res.json({ message: 'Movie deleted' })
})
