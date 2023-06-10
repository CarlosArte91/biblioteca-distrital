export default function Book({ name, author, publisher, year, genre, cover, isBorrowed, data, openModal }) {
  return (
    <div className="bg-white shadow-xl hover:shadow-2xl flex gap-4 rounded-xl pr-3 relative w-[440px] h-56">
      <img
        className="w-36 rounded-s-xl"
        src={cover}
        alt={name}
      />

      <div className="flex flex-col gap-1 pt-4">
        <h3 className="font-semibold text-indigo-800 text-center px-0 mb-3">
          {name}
        </h3>

        <p className="text-sm font-semibold text-neutral-600">
          <span className="text-indigo-700 mr-3">Autor:</span>{author}
        </p>

        <p className="text-sm font-semibold text-neutral-600">
          <span className="text-indigo-700 mr-3">Editor:</span>{publisher}
        </p>

        <p className="text-sm font-semibold text-neutral-600">
          <span className="text-indigo-700 mr-3">Año:</span>{year}
        </p>

        <p className="text-sm font-semibold text-neutral-600">
          <span className="text-indigo-700 mr-3">Genero:</span>{genre}
        </p>
      </div>

      {!isBorrowed ? (
        <button
          className="bg-indigo-500 hover:bg-indigo-800 text-white text-sm py-2 px-3 rounded-md absolute right-3 bottom-3"
          onClick={() => openModal(data, true)}
        >
          Solicitar
        </button>
      ) : (
        <span
          className="bg-rose-900 text-white absolute left-0 right-0 bottom-4 py-1 text-center"
        >
          No disponible
        </span>
      )}
    </div>
  )
}
