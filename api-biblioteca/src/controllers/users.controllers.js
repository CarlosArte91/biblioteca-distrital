import { pool } from '../db.js'

/**
 * Este método permite validar si el usuario existe, en caso de no existir lo
 * crea y en cualquier caso, crea el registro del prestamo del libro
 */
export const createUser = async (req, res) => {
  const { identification, name, lastname } = req.body.user
  const { bookId, library, home } = req.body.book

  const response = { message: '' }

  try {
    const userExists = await pool.query('SELECT * FROM users WHERE identification = ?', [identification])

    let userId = 0

    if (!userExists[0][0]) {
      const [ rows ] = await pool.query(
        'INSERT INTO users(identification,name,lastname) VALUES (?, ?, ?)',
        [identification, name, lastname],
      )

      userId = rows.insertId
    } else {
      userId = userExists[0][0].id
    }

    const borrowed = await pool.query(
      'INSERT INTO borrowed_books(user_id,book_id,library,home) VALUES (?, ?, ?, ?)',
      [userId, bookId, library, home],
    )

    await pool.query(
      'UPDATE books SET is_borrowed = true WHERE id = ?', [bookId]
    )

    response.message = 'Tu solicitud se realizó con éxito'
  } catch (error) {
    response.message = error.message
  }

  res.json(response)
}
