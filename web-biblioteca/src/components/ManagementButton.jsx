import Swal from 'sweetalert2'

const passwordDefault = '12345'

export default function ManagementButton({ showPanel, handleShowPanel, handleReload }) {
  const handleManagement = () => {
    if(!showPanel) {
      Swal.fire({
        title: 'Panel Administrativo',
        text: 'Ingresa la contraseña de administrador. La contraseña de pruebas es (12345)',
        input: 'password',
        showCancelButton: true,
        cancelButtonColor: 'red',
        confirmButtonText: 'Ingresar',
        showLoaderOnConfirm: true,
        preConfirm: (pass) => {
          return new Promise((resolve, reject) => {
            if (pass === passwordDefault) {
              resolve(true);
            } else {
              reject('Tu contraseña es incorrecta');
            }
          })
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.isConfirmed) {
          handleShowPanel(true)
          localStorage.setItem('is_management', true)

          Swal.fire({
            title: '¡Bienvenido!',
            text: 'Haz ingresado correctamente',
            icon: 'success',
          })
        }
      }).catch((error) => {
        Swal.fire({
          title: 'Ingreso no válido',
          text: error,
          icon: 'error',
        })
      })
    } else {
      Swal.fire({
        title: 'Cerrando panel administrativo',
        text: '¿Estas seguro de cerrar el panel?',
        showCancelButton: true,
        cancelButtonColor: 'red',
        confirmButtonText: 'Cerrar',
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem('is_management')
          handleReload()
          handleShowPanel(false)
        }
      })
    }
  }

  return (
    <button
      className='mr-28 border  hover:bg-indigo-100 hover:text-indigo-800 text-white text-sm py-1 px-3 rounded-md'
      onClick={handleManagement}
    >
      {showPanel ? 'Cerrar panel' : 'Administrar biblioteca'}
    </button>
  )
}
