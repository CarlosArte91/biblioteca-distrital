import ClipLoader from 'react-spinners/PuffLoader'

export default function Loading() {
  return (
    <div className='flex flex-grow items-center justify-center mb-14'>
      <ClipLoader size={120} />
    </div>
  )
}
