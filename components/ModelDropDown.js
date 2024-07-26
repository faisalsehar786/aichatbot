import React, { useState, useEffect, useRef } from 'react'
import { getEngines } from '@/components/getEngines'
import { useUser } from '@/lib/store/user'
import { useTheme } from '@/context/ThemeContext'

const ModelDropDown = () => {
  const dropdownRef = useRef(null)
  const { setModel, ai_model} = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [options, setOptions] = useState([])
  const [loading, setLoading] = useState(false)
  const user = useUser((state) => state.user)
  // Function to fetch data from backend API
  const fetchData = async () => {

    if (user) {
      const { data } = await getEngines(user?.ai_key)
      setOptions(data)
    }

  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    fetchData() // Fetch data when component mounts
  }, [])

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleSelectOption = (option) => {
    setModel(option)
    setIsOpen(false) // Close dropdown after selection
  }

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value)
    // You can implement filtering logic here if needed
  }

 
  return (
    <div className='popover-dropdown mt-0 ' ref={dropdownRef}>
      <button

        onClick={() => toggleDropdown()}
        type='button'
        className='btn btn-sm  btn-light btn-active-light-primary me-3'

      >
        <i className='ki-duotone ki-abstract-32 fs-2 text-primary '>
          <span className='path1' />
          <span className='path2' />
        </i>
       
        {ai_model?ai_model: ' Models'}

      </button>
      {isOpen && (
        <div className='popover-content border-0 menu menu-sub menu-sub-dropdown menu-column menu-rounded px-1 menu-gray-800 menu-state-bg menu-state-color fw-semibold py-4 fs-6 w-275px show'>
          <input
            type='text'
            className='search-input form-control form-control-solid ps-13 h-35px'
            placeholder='Search...'
            value={searchTerm}
            onChange={handleInputChange}
          />
          <div style={{
            maxHeight: 300,
            overflowY: 'auto'
          }}>
            {options
              .filter((option) =>option?.id?.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((option, index) => (
                <div className=' menu-item px-5 my-4 cursor-pointer' onClick={() => handleSelectOption(option?.id)} key={index}>


  <div className="d-flex align-items-center flex-wrap">
    <i className="ki-duotone ki-abstract-32 fs-2 text-primary me-3">
      <span className="path1" />
      <span className="path2" />
    </i>{" "}
    <span className='text-gray-600'>{option?.id}</span>
   
  
</div>

                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ModelDropDown
