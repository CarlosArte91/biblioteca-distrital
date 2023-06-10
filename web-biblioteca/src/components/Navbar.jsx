import logoUniversidad from '../assets/images/logo_universidad.png'
import ManagementButton from './ManagementButton'

export default function Navbar({ showPanel, handleShowPanel, handleReload }) {
  return (
    <nav className="flex items-center justify-between gap-4 bg-indigo-900 py-2 pl-8 fixed w-full z-10">
      <div className='flex items-center gap-4'>
        <img
          className='w-16 rounded-full'
          src={logoUniversidad}
          alt="logo universidad"
        />

        <h1 className="text-2xl font-semibold text-neutral-50">
          Biblioteca Universidad Distrital
        </h1>
      </div>

      <ManagementButton
        showPanel={showPanel}
        handleShowPanel={handleShowPanel}
        handleReload={handleReload}
      />
    </nav>
  )
}
