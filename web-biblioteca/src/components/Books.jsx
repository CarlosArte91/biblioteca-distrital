import { useEffect, useState } from 'react'
import coverDefault from '../assets/images/cover_default.png'
import Book from './Book'
import ModalForm from './ModalForm'

export default function Books({ data, reload }) {
  const [books, setBooks] = useState(null)
  const [openModal, setOpenModal] = useState(false)
  const [info, setInfo] = useState(null)

  const getData = (data) => {
    setBooks(data)
  }

  const handleOpenModal = (data, open) => {
    setInfo(data)
    setOpenModal(open)
  }

  useEffect(() => {
    getData(data)
  }, [data])

  return (
    <section className="bg-gray-200 flex flex-wrap justify-center gap-x-10 gap-y-14 pb-6 px-4 pt-48 h-full">
      {books &&
        books.map((book) => (
          <Book
            key={book.id}
            name={book.name}
            author={book.author}
            publisher={book.publisher}
            year={book.year}
            genre={book.genre}
            cover={book.cover ? book.cover : coverDefault}
            isBorrowed={book.is_borrowed}
            data={book}
            openModal={handleOpenModal}
          />
      ))}
      {openModal && (
        <ModalForm
          data={{ openModal, info }}
          handleModal={handleOpenModal}
          reload={reload}
        />
      )}
    </section>
  )
}
