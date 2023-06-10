import { pool } from '../db.js'

/**
 * Método para obtener todos los libros de la base de datos
 */
export const getBooks = async (req, res) => {
  const [ rows ] = await pool.query('SELECT * FROM books')

  rows.sort((a, b) => {
    if(a.name < b.name) return -1
    if(a.name > b.name) return 1
    return 0
  })
  res.json(rows)
}

/**
 * Método para devolver un listado de los libros prestados
 */
export const getBorrowedBooks = async (req, res) => {
  const [ rows ] = await pool.query(
    `SELECT
      borrowed_books.id AS 'id',
      books.name AS title,
      CONCAT(users.name, ' ', users.lastname) AS 'borrowed_to',
      CASE
          WHEN borrowed_books.home = 1 THEN 'Casa'
          WHEN borrowed_books.library = 1 THEN 'Biblioteca'
          ELSE 'Desconocido'
      END AS 'read_in'
    FROM
      books
    INNER JOIN
      borrowed_books ON books.id = borrowed_books.book_id
    INNER JOIN
      users ON users.id = borrowed_books.user_id
    ORDER BY books.name ASC;`
  )

  res.json(rows)
}

/**
 * Método para agregar un nuevo libro a la base de datos
 */
export const addBook = async (req, res) => {
  const {
    name,
    description,
    author,
    publisher,
    year,
    genre,
  } = req.body

  const [ rows ] = await pool.query(
    'INSERT INTO books(name,description,author,publisher,year,genre) VALUES (?, ?, ?, ?, ?, ?)',
    [name, description, author, publisher, year, genre],
  )

  res.json({ id: rows.insertId, name })
}

export const deleteBorrow = async (req, res) => {
  const { id } = req.params

  await pool.query('DELETE FROM borrowed_books WHERE id = ?', [id])

  res.json({ message: 'El libro ha sido devuelto con éxito' })
}
