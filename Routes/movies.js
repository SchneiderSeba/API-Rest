import { Router } from 'express'
import { MoviesController } from '../Controllers/movies.js'

export const movieRouter = Router()

movieRouter.get('/:id', MoviesController.getById)

movieRouter.get('/', MoviesController.getAll)

// const origin = req.header('origin')

// if (ACCEPTED_ORIGIN.includes(origin) || !origin) {
//   res.header('Access-Control-Allow-Origin', origin)
// }

movieRouter.post('/', MoviesController.create)

movieRouter.patch('/:id', MoviesController.update)

movieRouter.delete('/:id', MoviesController.delete)
