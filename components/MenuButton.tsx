import Link from 'next/link'

export default function SelectModel() {
  return (
    <div className='flex-shrink-0 ms-2'>
      <button
        type='button'
        className='btn btn-sm btn-icon btn-bg-light btn-active-icon-primary btn-color-gray-500'
        data-kt-menu-trigger='click'
        data-kt-menu-placement='bottom-end'
      >
        <i className='bi bi-list text-primary  fs-2 '>
          <span className='path1'></span>
          <span className='path2'></span>
          <span className='path3'></span>
          <span className='path4'></span>
        </i>
      </button>
    </div>
  )
}
