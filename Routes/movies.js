import { Router } from 'express'
import { MoviesController } from '../Controllers/movies.js'

export const movieRouter = Router()

movieRouter.get('/:id', MoviesController.getById)

movieRouter.get('/', MoviesController.getAll)

movieRouter.post('/', MoviesController.create)

movieRouter.patch('/:id', MoviesController.update)

movieRouter.delete('/:id', MoviesController.delete)
