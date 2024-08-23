// env
import 'dotenv/config'
import mysql from 'mysql2/promise'

const HOST = process.env.DB_HOST ?? '127.0.0.1'
const PORT = process.env.DB_PORT ?? 3306
const USER = process.env.DB_USER ?? 'root'
const PASSWORD = process.env.DB_PASSWORD ?? ''
const DATABASE = process.env.DB_NAME ?? 'MoviesDB'

const config = {
  host: HOST,
  user: USER,
  port: PORT,
  password: PASSWORD,
  database: DATABASE
}

const connection = await mysql.createConnection(config)

export class MovieModel {
  static async getAll ({ genre }) {
    if (genre) {
      const lowCaseGenre = genre.toLowerCase()

      // const [genres] = await connection.query('SELECT id, name FROM genre WHERE LOWER(name) = ?;', [lowCaseGenre])

      // if (genres.length === 0) return []

      // const [{ id }] = genres

      // get all movies ids from database table
      // const [movies] = await connection.query('SELECT BIN_TO_UUID(movie_id) id FROM Movies_genre WHERE genre_id = ?;', [id])
      // console.log(movies)

      // query to Movies_genre
      const [moviesWithGenres] = await connection.query(`
        SELECT Movies.title, Movies.year, Movies.director, Movies.duration, Movies.poster, Movies.genre, Movies.rate, BIN_TO_UUID(Movies.id) as id 
        FROM Movies 
        JOIN Movies_genre ON Movies_genre.movie_id = Movies.id 
        JOIN genre ON genre.id = Movies_genre.genre_id 
        WHERE LOWER(genre.name) = ?;`
      , [lowCaseGenre])

      return moviesWithGenres
    }

    const [movies] = await connection.query('SELECT title, year, director, duration, poster, genre, rate, BIN_TO_UUID(id) id FROM Movies;')
    return (movies)
  }

  static async getById ({ id }) {
    const [movies] = await connection.query('SELECT title, year, director, duration, poster, genre, rate, BIN_TO_UUID(id) id FROM Movies WHERE id = UUID_TO_BIN(?);', [id])

    if (movies.length === 0) return null

    return movies
  }

  static async create ({ input }) {
    const { title, year, director, duration, poster, genre, rate } = input

    const [uuidResult] = await connection.query('SELECT UUID() uuid;')

    const [{ uuid }] = uuidResult

    const genreString = genre.join(', ')

    const result = await connection.query('INSERT INTO Movies (id, title, year, director, duration, poster, genre, rate) VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?, ?);', [uuid, title, year, director, duration, poster, genreString, rate])

    // const resulRel = await connection.query(
    //   'INSERT INTO Movies_genre (movie_id, genre_id) VALUES ((SELECT id FROM Movies WHERE title = ?), (SELECT id FROM genre WHERE name = ?));',
    //   [title, genreString]
    // )

    // Obtener el ID de la película insertada
    const [[movie]] = await connection.query(
      'SELECT id FROM Movies WHERE title = ? AND UUID_TO_BIN(?) = id',
      [title, uuid]
    )

    if (!movie) {
      throw new Error('Movie not found after insertion')
    }

    // Obtener los IDs de los géneros
    const [genreIdsResult] = await connection.query(
      'SELECT id FROM genre WHERE name IN (?);',
      [genre]
    )

    // Insertar en Movies_genre para cada género
    const insertValues = []
    for (const genreId of genreIdsResult) {
      insertValues.push([movie.id, genreId.id])
    }

    await connection.query(
      'INSERT INTO Movies_genre (movie_id, genre_id) VALUES ?;',
      [insertValues]
    )

    console.log('Movie inserted and genres associated successfully.')
    console.log(result)
  }

  static async delete ({ id }) {
    const [result] = await connection.query('DELETE FROM Movies WHERE id = UUID_TO_BIN(?);', [id])
    return result
  }

  static async update ({ id, input }) {
    // eslint-disable-next-line no-unused-vars
    const { title, year, director, duration, poster, genre, rate } = input

    const updates = []
    const values = []

    // Iterar sobre las propiedades del objeto `input`
    for (const [key, value] of Object.entries(input)) {
      if (value !== undefined && value !== null) {
        // Agregar a la lista de actualizaciones
        updates.push(`${key} = ?`)
        // Agregar valor correspondiente
        values.push(value)
      }
    }

    // Si no hay campos para actualizar, lanzar un error
    if (updates.length === 0) {
      throw new Error('No fields to update')
    }

    // Agregar el ID al final de los valores
    values.push(id)

    // Construir la consulta SQL
    const sql = `UPDATE Movies SET ${updates.join(', ')} WHERE id = UUID_TO_BIN(?);`

    // Ejecutar la consulta
    const [result] = await connection.query(sql, values)

    return result
  }
}
