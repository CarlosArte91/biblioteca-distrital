import { useEffect, useState } from 'react'

import Books from './components/Books';
import ManagementPanel from './components/ManagementPanel';
import Navbar from './components/Navbar';
import Searchbar from './components/Searchbar';

import { getBooks } from './services/books.service';
import Loading from './components/Loading';

export default function App() {
  const [books, setBooks] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [reload, setReload] = useState(0)
  const [showManagement, setShowManagement] = useState(false)

  const getData = async () => {
    const { data } = await getBooks()
    setBooks(data)
    setIsLoading(false)
  }

  const handleSearch = (searchBooks) => {
    setBooks(searchBooks)
  }

  const handleReload = () => {
    setReload(reload + 1)
  }

  const handleShowManagement = (value) => {
    setShowManagement(value)
  }

  const validateManagement = () => {
    const validate = localStorage.getItem('is_management')
    return validate
  }

  useEffect(() => {
    if(!validateManagement()) getData()
    else {
      setShowManagement(true)
      setIsLoading(false)
    }
  }, [reload])

  return (
    <main className="flex flex-col min-h-screen bg-gray-200">
      <Navbar
        showPanel={showManagement}
        handleShowPanel={handleShowManagement}
        handleReload={handleReload}
      />
      {books && !showManagement && (
        <Searchbar
          books={books}
          updateBooks={handleSearch}
        />
      )}
      {isLoading ? (
        <Loading />
      ) : showManagement ? (
        <ManagementPanel />
      ) : (
        <Books
          data={books}
          reload={handleReload}
        />
      )}
    </main>
  )
}
