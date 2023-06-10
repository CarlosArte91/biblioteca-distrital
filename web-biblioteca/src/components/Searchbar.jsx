import { useState } from 'react'

const columnsToFilter = ['name', 'author', 'publisher', 'year']

export default function Searchbar({ books, updateBooks }) {
  const [allBooks] = useState(books)
  const [booksFiltereds, setBooksFiltereds] = useState(books)

  const [inputValue, setInputValue] = useState('')
  const [selectValue, setSelectValue] = useState('Todos')

  const handleChangeSelect = (event) => {
    console.log('ejecuta');
    const { value } = event.target
    setSelectValue(value)

    let newBooks = []

    if (value === 'Todos') {
      newBooks = allBooks
    } else {
      newBooks = allBooks.filter((book) => book.genre === value)
    }
    updateBooks(newBooks)
    setBooksFiltereds(newBooks)
  }

  const handleChangeInput = (event) => {
    const { value } = event.target
    setInputValue(value)

    const newBooks = []

    columnsToFilter.forEach((column) => {
      booksFiltereds.forEach((book) => {
        const validated = column === 'year' ? book[column].toString() : book[column].toLowerCase()

        if(validated.includes(value.toLowerCase())) {
          const finded = newBooks.find((item) => item.id === book.id)
          if(!finded) newBooks.push(book)
        }
      })
    })
    updateBooks(newBooks)
  }

  const handleClean = () => {
    setInputValue('')
    setSelectValue('Todos')
    updateBooks(allBooks)
    setBooksFiltereds(allBooks)
  }

  return (
    <section className="flex gap-10 pl-16 py-5 bg-gray-300 shadow-xl z-20 mt-[77px] fixed w-full">
      <div className="flex items-center gap-3">
        <label htmlFor="category">Filtrar por género</label>
        <select
          className="pl-4 pr-6 py-1 rounded-md border border-indigo-300 focus:outline-none focus:border-indigo-800"
          name=""
          id="category"
          value={selectValue}
          onChange={handleChangeSelect}
        >
          <option value="Todos">todos</option>
          <option value="Ciencia ficción">ciencia ficción</option>
          <option value="Cuento">cuento</option>
          <option value="Ensayo">ensayo</option>
          <option value="Fantasía">fantasía</option>
          <option value="Poesía">poesía</option>
          <option value="Novela">novela</option>
          <option value="Teatro">teatro</option>
        </select>
      </div>

      <div className="flex items-center gap-3">
        <label htmlFor="search">Buscar</label>
        <input
          className="pl-4 py-0.5 rounded-md border border-indigo-300 focus:outline-none focus:border-indigo-800"
          type="text"
          id="search"
          value={inputValue}
          onChange={handleChangeInput}
        />
      </div>

      <button
        className='bg-indigo-500 hover:bg-indigo-800 text-white text-sm py-1 px-3 rounded-md'
        onClick={handleClean}
      >
        Limpiar filtros
      </button>
    </section>
  )
}
