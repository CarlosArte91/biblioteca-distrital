import { useEffect, useState } from 'react'
import { REGEX_LETTER, REGEX_NUMBER } from '../constants/regex'
import Swal from 'sweetalert2'

import coverDefault from '../assets/images/cover_default.png'
import { userBorrowed } from '../services/users.service'

export default function ModalForm({ data, handleModal, reload }) {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [info, setInfo] = useState(null)

  const [userData, setUserData] = useState({
    identification: '',
    name: '',
    lastname: '',
  })

  const [loanData, setLoanData] = useState({
    inLibrary: true,
    inHome: false,
  })

  const [errors, setErrors] = useState({
    identification: { isActive: false, message: '' },
    name: { isActive: false, message: '' },
    lastname: { isActive: false, message: '' },
  })

  const borrowBook = async (borrowData) => {
    const { data } = await userBorrowed(borrowData)
    handleModal(null, false)
    reload()

    Swal.fire({
      title: 'Felicidades',
      text: `${data.message}`,
      icon: 'success',
    })
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setUserData({
      ...userData,
      [name]: value,
    })

    setErrors({
      ...errors,
      [name]: { isActive: false, message: '' },
    })
  }

  const handleRadio = (event) => {
    const { name, checked } = event.target
    const newLoanData = {}

    if (name === 'inHome') {
      newLoanData.inLibrary = !checked
      newLoanData.inHome = checked
    } else {
      newLoanData.inLibrary = checked
      newLoanData.inHome = !checked
    }
    setLoanData(newLoanData)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!userData.identification) {
      setErrors({ ...errors, identification: { isActive: true, message: 'Este campo no puede ser vacío' } })
      return
    } else if (!REGEX_NUMBER.test(userData.identification)) {
      setErrors({ ...errors, identification: { isActive: true, message: 'La identificación solo pueden ser números' } })
      return
    } else if (userData.identification.length < 7) {
      setErrors({ ...errors, identification: { isActive: true, message: 'La identificación debe tener al menos 7 digitos' } })
      return
    } else if (!userData.name) {
      setErrors({ ...errors, name: { isActive: true, message: 'Este campo no puede ser vacío' } })
      return
    } else if (!REGEX_LETTER.test(userData.name)) {
      setErrors({ ...errors, name: { isActive: true, message: 'El nombre no puede contener números' } })
      return
    } else if (userData.name.length < 3) {
      setErrors({ ...errors, name: { isActive: true, message: 'El nombre debe tener al menos 4 caracteres' } })
      return
    } else if (!userData.lastname) {
      setErrors({ ...errors, lastname: { isActive: true, message: 'Este campo no puede ser vacío' } })
      return
    } else if (!REGEX_LETTER.test(userData.lastname)) {
      setErrors({ ...errors, lastname: { isActive: true, message: 'El apellido no puede contener números' } })
      return
    } else if (userData.lastname.length < 3) {
      setErrors({ ...errors, lastname: { isActive: true, message: 'El apellido debe tener al menos 4 caracteres' } })
      return
    }

    const borrowedInfo = {
      user: {
        identification: userData.identification,
        name: userData.name,
        lastname: userData.lastname,
      },
      book: {
        bookId: info.id,
        library: loanData.inLibrary,
        home: loanData.inHome,
      },
    }
    borrowBook(borrowedInfo)
  }

  const handleClose = (event) => {
    event.preventDefault()
    handleModal(null, false)
  }

  useEffect(() => {
    setIsOpenModal(data.openModal)
    setInfo(data.info)
  }, [data])

  return (
    <div>
      {isOpenModal ? (
        <section className="fixed inset-0 flex justify-center bg-modal-black z-40">
          <div className="flex flex-col gap-4 h-fit bg-neutral-100 p-6 rounded-xl w-2/5 relative my-auto">
            {info ? (
              <section className='flex justify-between rounded-lg border border-indigo-600 mx-auto w-fit'>
                <div className="flex flex-col gap-1 w-full text-center py-2 px-6">
                  <h3 className="font-semibold text-indigo-800 px-0 mb-1">
                    {info.name}
                  </h3>

                  <p className="text-sm font-semibold text-neutral-600">
                    <span className="text-indigo-700 mr-3">Autor:</span>{info.author}
                  </p>

                  <p className="text-sm font-semibold text-neutral-600">
                    <span className="text-indigo-700 mr-3">Editor:</span>{info.publisher}
                  </p>

                  <p className="text-sm font-semibold text-neutral-600">
                    <span className="text-indigo-700 mr-3">Año:</span>{info.year}
                  </p>

                  <p className="text-sm font-semibold text-neutral-600">
                    <span className="text-indigo-700 mr-3">Genero:</span>{info.genre}
                  </p>
                </div>

                <img
                  className="w-20 rounded-e-lg"
                  src={info.cover ? info.cover : coverDefault}
                  alt={info.name}
                />
              </section>
            ) : null}

            <span className='bg-indigo-500 text-sm text-justify px-8 py-4 mx-5 font-semibold text-white rounded-lg'>
              Para solicitar este libro en calidad de prestamo, ingresa los datos del formulario,
              y presiona el botón (solicitar libro), luego, dirigete al asesor de la biblioteca con
              tu documento en físico para formalizar la entrega.
            </span>

            <form
              className='text-neutral-700 px-12 pt-4 pb-20 mx-5 rounded-lg border border-indigo-600 relative flex flex-col gap-3'
              onSubmit={handleSubmit}
            >
              <div className='flex flex-col gap-1'>
                <div className='flex gap-5'>
                  <label htmlFor="id">Identificación</label>
                  <input
                    className='border border-indigo-300 focus:outline-none focus:border-indigo-800 rounded-md pl-3 py-0.5 text-sm w-full'
                    id='id'
                    name='identification'
                    value={userData.identification}
                    onChange={handleChange}
                  />
                </div>
                <span className='text-sm text-red-700'>
                  {errors.identification.isActive && errors.identification.message}
                </span>
              </div>

              <div className='flex flex-col gap-1'>
                <div className='flex gap-5'>
                  <label htmlFor="name">Nombre</label>
                  <input
                    className='border border-indigo-300 focus:outline-none focus:border-indigo-800 rounded-md pl-3 py-0.5 text-sm w-full'
                    id='name'
                    name='name'
                    value={userData.name}
                    onChange={handleChange}
                  />
                </div>
                <span className='text-sm text-red-700'>
                  {errors.name.isActive && errors.name.message}
                </span>
              </div>

              <div className='flex flex-col gap-1'>
                <div className='flex gap-5'>
                  <label htmlFor="lastname">Apellido</label>
                  <input
                    className='border border-indigo-300 focus:outline-none focus:border-indigo-800 rounded-md pl-3 py-0.5 text-sm w-full'
                    id='lastname'
                    name='lastname'
                    value={userData.lastname}
                    onChange={handleChange}
                  />
                </div>
                <span className='text-sm text-red-700'>
                  {errors.lastname.isActive && errors.lastname.message}
                </span>
              </div>

              <div className='border border-indigo-300 flex flex-col gap-2 px-4 py-2 rounded-lg mt-2 w-fit mx-auto'>
                <div className='flex gap-2'>
                  <input className='w-4' type="radio" id='inLibrary' name='inLibrary' checked={loanData.inLibrary} onChange={handleRadio} />
                  <label htmlFor="inLibrary">Lo leeré en la biblioteca</label>
                </div>

                <div className='flex gap-2'>
                  <input className='w-4'  type="radio" id='inHome' name='inHome' checked={loanData.inHome} onChange={handleRadio} />
                  <label htmlFor="inHome">Lo leeré en mi casa</label>
                </div>
              </div>

              <div className='absolute right-3 bottom-3 flex flex-row gap-4'>
                <input
                  className='bg-indigo-500 hover:bg-indigo-800 hover:cursor-pointer text-white text-sm py-2 px-3 rounded-md'
                  type="submit"
                  value="Solicitar libro"
                />

                <button
                  className='bg-red-500 hover:bg-red-700 hover:cursor-pointer text-white text-sm py-2 px-3 rounded-md'
                  onClick={handleClose}
                >
                  Cancelar
                </button>
              </div>


            </form>
          </div>
        </section>
      ) : null }
    </div>
  )
}
