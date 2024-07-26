/* eslint-disable  */
'use client'
import Link from 'next/link'
import { useUser } from '@/lib/store/user'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'
import useDarkMode from '@/hooks/useDarkMode'
import React, { useState, useEffect, useRef } from 'react'
import { useTheme } from '@/context/ThemeContext'
import ModelDropDown from '@/components/ModelDropDown'

export default function Topbar() {
  const { closeSideBar, setSideBar, ai_version, setVersion } = useTheme()
  const [theme, setTheme] = useDarkMode()
  const router = useRouter()
  const gptModel = ['gpt-3.5-turbo', 'gpt-4']
  const dropdownRef = useRef(null)
  const user = useUser((state) => state.user)
  const setUser = useUser((state) => state.setUser)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(user?.avatar_url)
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  useEffect(() => {
    async function downloadImage(path: string) {
      try {
        const { data, error } = await supabase.storage.from('avatars').download(path)
        if (error) {
          throw error
        }

        const url = URL.createObjectURL(data)
        setAvatarUrl(url)
      } catch (error) {
        console.log('Error downloading image: ', error)
      }
    }

    if (user?.avatar_url) downloadImage(user?.avatar_url)
  }, [user?.avatar_url, supabase])

  // useEffect(() => {
  //   const handleClickOutside = (event: any) => {
  //     if (dropdownRef.current) {
  //       setIsOpen(false)
  //     }
  //   }

  //   document.addEventListener('mousedown', handleClickOutside)
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside)
  //   }
  // }, [])
  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    router.push('/')
  }

  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleSelectOption = () => {
    setIsOpen(false) // Close dropdown after selection
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const element: any = window.document.getElementById('kt_body')
      const element2: any = window.document.getElementById('aside-secondary-fs')
      const element3: any = window.document.getElementById('aside-primary-fs')

      if (closeSideBar) {
        element3.classList.add('show')
        element3.classList.remove('d-none')

        element2.classList.add('show')
        element2.classList.remove('d-none')
        element.classList.add('aside-secondary-enabled')
      } else {
        element3.classList.remove('show')
        element3.classList.add('d-none')

        element2.classList.remove('show')
        element2.classList.add('d-none')
        element.classList.remove('aside-secondary-enabled')
      }
    }
  }, [closeSideBar])

  return (
    <div
      id='kt_header'
      className='header'
      data-kt-sticky='true'
      data-kt-sticky-name='header'
      data-kt-sticky-offset="{default: '200px', lg: '300px'}"
    >
      <div
        className='container-fluid d-flex align-items-center justify-content-between'
        id='kt_header_container'
      >
        <div
          className='page-title d-flex flex-column align-items-start justify-content-center flex-wrap mt-n5 mt-lg-0 me-lg-2 pb-2 pb-lg-0'
          data-kt-swapper='true'
          data-kt-swapper-mode='prepend'
          data-kt-swapper-parent="{default: '#kt_content_container', lg: '#kt_header_container'}"
        ></div>

        <div className='d-flex'>
          <div className='form-check form-check-solid form-switch form-check-custom fv-row me-3'>
            <input
              className='form-check-input w-35px h-20px'
              type='checkbox'
              // checked={closeSideBar}
              defaultChecked={closeSideBar}
              onClick={(e: any) => setSideBar(e.target.checked)}
            />
            <label className='form-check-label' htmlFor='allowmarketing' />
          </div>
          {user ? (
            <>
              {/* <div
                className='mx-auto  tabs tabs-boxed w-fit   tabs tabs-boxed  bg-light  rounded me-3'
                style={{ padding: '8.8px 5px' }}
              >
                <a
                  className={`${ai_version == gptModel[0] ? 'bg-primary p-1 rounded text-white px-2 mx-2 cursor-pointer' : 'text-gray-800 mx-1 cursor-pointer'}`}
                  onClick={() => setVersion(gptModel[0])}
                >
                  GPT-3.5
                </a>
                <a
                  className={`${ai_version == gptModel[1] ? 'bg-primary p-1 rounded text-white px-2 mx-2 cursor-pointer' : 'text-gray-800 mx-1 cursor-pointer'}`}
                  onClick={() => setVersion(gptModel[1])}
                >
                  GPT-4
                </a>
              </div> */}
              <ModelDropDown></ModelDropDown>

              <div className='popover-dropdown mt-0' ref={dropdownRef}>
                <div onClick={toggleDropdown} className='cursor-pointer symbol symbol-40px'>
                  <img src={avatarUrl ? avatarUrl : 'assets/media/avatars/blank.png'} alt='image' />
                </div>

                {isOpen && (
                  <div className='popover-content border-0 menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-color fw-semibold py-4 fs-6 w-275px show'>
                    <div className='menu-item px-3'>
                      <div className='menu-content d-flex align-items-center px-3'>
                        <div className='symbol symbol-50px me-5'>
                          <img
                            alt='Logo'
                            src={avatarUrl ? avatarUrl : 'assets/media/avatars/blank.png'}
                          />
                        </div>
                        <div className='d-flex flex-column'>
                          <div className='fw-bold d-flex align-items-center fs-5'>
                            {user?.full_name}
                            <span className='badge badge-light-success fw-bold fs-8 px-2 py-1 ms-2'>
                              Free
                            </span>
                          </div>
                          <a href='#' className='fw-semibold text-muted text-hover-primary fs-7'>
                            {user?.email}
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className='menu-item px-5 my-1' onClick={() => handleSelectOption()}>
                      <Link href='/account' className='menu-link px-5'>
                        Account Settings
                      </Link>
                    </div>

                    <div className='menu-item px-5' onClick={() => handleToggle()}>
                      <a href='#' className='menu-link px-5'>
                        Light/Dark Mode
                      </a>
                    </div>

                    <div className='menu-item px-5' onClick={() => handleSelectOption()}>
                      <a onClick={() => handleLogout()} href='#' className='menu-link px-5'>
                        Sign Out
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className='d-flex ms-3'>
              <Link href='/login' className=' btn btn-sm btn-primary'>
                <i className='ki-duotone ki-user fs-2'>
                  <span className='path1' />
                  <span className='path2' />
                </i>

                <span className='d-none d-md-inline'>Login</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
