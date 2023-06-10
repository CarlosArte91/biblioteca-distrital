import { useState } from 'react'
import BorrowedBooks from './BorrowedBooks';

export default function ManagementPanel() {
  const [activeTab, setActiveTab] = useState(1)

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  }

  return (
    <div className="flex flex-col flex-grow my-10 w-4/5 mx-auto mt-32">
      <div className="-mb-[1px] z-10">
        <button
          className={
            `px-6 py-1 rounded-ss-xl
            ${activeTab === 1 ? 'bg-white text-gray-800 border border-indigo-700 border-b-white' : 'bg-indigo-900 text-white'}`
          }
          onClick={() => handleTabClick(1)}
        >
          Libros prestados
        </button>
        <button
          className={
            `px-6 py-1
            ${activeTab === 2 ? 'bg-white text-gray-800 border border-indigo-700 border-b-white' : 'bg-indigo-900 text-white'}
            ${activeTab === 1 && 'border border-t-0 border-b-0 border-l-0 border-r-indigo-300'}
            ${activeTab === 3 && 'border border-t-0 border-b-0 border-r-0 border-l-indigo-300'}`
          }
          onClick={() => handleTabClick(2)}
        >
          Usuarios
        </button>
        <button
          className={
            `px-6 py-1 rounded-se-xl
            ${activeTab === 3 ? 'bg-white text-gray-800 border border-indigo-700 border-b-white' : 'bg-indigo-900 text-white'}`
          }
          onClick={() => handleTabClick(3)}
        >
          Agregar libros
        </button>
      </div>

      <div className="border border-indigo-700 rounded-bl-xl rounded-br-xl rounded-tr-xl  flex-grow bg-white px-5 py-6 mb-6">
        <div className="p-4">
          {activeTab === 1 && <BorrowedBooks />}
          {activeTab === 2 && <p>Contenido de la pestaña 2</p>}
          {activeTab === 3 && <p>Contenido de la pestaña 3</p>}
        </div>
      </div>
    </div>
  )
}
