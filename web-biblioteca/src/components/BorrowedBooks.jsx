import { useEffect, useState } from "react"
import { deleteBorrowed, getBooksBorroweds } from "../services/books.service"
import Loading from "./Loading"
import Swal from "sweetalert2"

export default function BorrowedBooks() {
  const [borrowedBooks, setBorrowedBooks] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const getData = async () => {
    const { data } = await getBooksBorroweds()
    setBorrowedBooks(data)
    setIsLoading(false)
  }

  const handleDelete = async (id) => {
    const { data } = await deleteBorrowed(id)
    getData()

    Swal.fire({
      title: 'Entrega de libros',
      text: `${data.message}`,
      icon: 'success',
    })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <table className="min-w-full bg-white text-sm rounded-md">
          <thead className="bg-gray-300">
            <tr>
              <th className="border border-gray-400 py-2 px-4 text-center">Título</th>
              <th className="border border-gray-400 py-2 px-4 text-center">Prestado a</th>
              <th className="border border-gray-400 py-2 px-4 text-center">Autorizado leer en</th>
              <th className="border border-gray-400 py-2 px-4 text-center">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {borrowedBooks.map((item) => (
              <tr key={item.id}>
                <td className="border border-gray-400 pl-3 py-3">
                  {item.title}
                </td>

                <td className="border border-gray-400 pl-3">
                  {item.borrowed_to}
                </td>

                <td className="border border-gray-400 pl-3">
                  {item.read_in}
                </td>

                <td className="border border-gray-400 text-center">
                  <button
                    className="bg-green-700 hover:bg-green-500 text-white font-bold py-1 px-4 rounded-md"
                    onClick={() => handleDelete(item.id)}
                  >
                    Libro entregado
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
