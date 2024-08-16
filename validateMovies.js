const z = require('zod')

const movieSchema = z.object({
  title: z.string().max(255).min(1),
  year: z.number().int().min(1900).max(2024),
  director: z.string(),
  duration: z.number().int().positive().min(20),
  poster: z.string().url(),
  genre: z.array(z.string()),
  rate: z.number().min(0).max(10)
})

function validateMovie (object) {
  return movieSchema.safeParse(object)
}

function validatePartialMovie (object) {
  return movieSchema.partial().safeParse(object)
}

module.exports = { validateMovie, validatePartialMovie }
