import { apiLibrary } from "./index.service"

export const getBooks = () => {
  return apiLibrary.get('books')
}

export const getBooksBorroweds = () => {
  return apiLibrary.get('books_borrowed')
}

export const deleteBorrowed = (id) => {
  return apiLibrary.delete(`books_borrowed/${id}`)
}
