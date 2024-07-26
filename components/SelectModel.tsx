import Link from 'next/link'

export default function SelectModel() {
  return (
    <div className='flex-shrink-0 ms-2'>
      <button
        type='button'
        className='btn btn-sm btn-primary '
        data-kt-menu-trigger='click'
        data-kt-menu-placement='bottom-end'
      >
        <i className='bi bi-folder-plus  fs-2'>
          <span className='path1' />
          <span className='path2' />
        </i>
      </button>
    </div>
  )
}
