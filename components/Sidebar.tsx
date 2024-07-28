'use client'
import { useState, useEffect } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useUser } from '@/lib/store/user'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import SideBarChats from './SideBarChats'
import SideBarFolders from './SideBarFolders'

export default function Sidebar() {
  const user = useUser((state) => state.user)
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [refreshChat, setrefreshChat] = useState(false)

  const addTask = async () => {
    if (!user) {
      router.push('/login')
      return
    }
    setrefreshChat(!refreshChat)
    setLoading(true)
    try {
      const { error } = await supabase
        .from('chats')
        .insert([{ name: 'New Chat' }])
        .select()
      if (error) {
        setLoading(false)
        router.push('/login')
        toast.error('something Went wrong try again or unauthorized User please login!')
        return
      }
      toast.success('New Chat Created Successfully')

      setLoading(false)
    } catch (error: any) {
      toast.error(error.message)
      setLoading(false)
    }
  }

  return (
    <div className='aside-secondary d-flex flex-row-fluid' id='aside-secondary-fs'>
      <div className='aside-workspace my-5 p-5' id='kt_aside_wordspace'>
        <div className='d-flex h-100 flex-column'>
          <div className='flex-column-fluid h-[calc(100vh-190px)] overflow-y-auto hide__scroll__bar px-1'>
            <div className='tab-content'>
              <div
                className='tab-pane fade active show'
                id='kt_aside_nav_tab_projects'
                role='tabpanel'
              >
                <div className='m-0'>
                  <div className='d-flex mb-3'>
                    <div
                      id='kt_header_search'
                      className='header-search d-flex align-items-center w-100'
                    >
                      <button
                        onClick={() => addTask()}
                        className='btn btn-sm btn-primary  w-100'
                        data-bs-toggle='modal'
                        data-bs-target='#kt_modal_invite_friends'
                        disabled={loading}
                      >
                        <i className='bi bi-chat-left-text-fill fs-2 me-0 me-md-2'>
                          <span className='path1'></span>
                          <span className='path2'></span>
                          <span className='path3'></span>
                        </i>

                        <span className='d-none d-md-inline'>New Chat</span>
                        {loading && (
                          <span className='spinner-border spinner-border-sm align-middle ms-2' />
                        )}
                      </button>
                    </div>
                    {/* <MenuButton /> */}
                  </div>

                  <SideBarFolders refreshChat={refreshChat}></SideBarFolders>

                  <SideBarChats refreshChat={refreshChat}></SideBarChats>
                </div>
              </div>

              <div className='tab-pane fade' id='kt_aside_nav_tab_subscription' role='tabpanel'>
                <div className='row'>
                  <div className='col-lg-12'>
                    <h3 className='mb-2 '>Welcome to Subscriptions App</h3>
                    <h5 className='mb-2 text-gray-800'>Active until Dec 09, 2024</h5>
                    <p className='fs-6 text-gray-600 fw-semibold mb-6 mb-lg-15'>
                      We will send you a notification upon Subscription expiration
                    </p>
                    <div className='fs-5 mb-2'>
                      <span className='text-gray-800 fw-bold me-1'>$24.99</span>
                      <span className='text-gray-600 fw-semibold'>Per Month</span>
                    </div>
                    <div className='fs-6 text-gray-600 fw-semibold'>
                      Extended Pro Package.&amp; 100 Projects 1000 Files
                    </div>
                  </div>
                  <div className='col-lg-12'>
                    <div className='d-flex text-muted fw-bold fs-5 mb-3'>
                      <span className='flex-grow-1 text-gray-800'>Users</span>
                      <span className='text-gray-800'>86 of 100 Used</span>
                    </div>
                    <div className='progress h-8px bg-light-primary mb-2'>
                      <div
                        className='progress-bar bg-primary'
                        role='progressbar'
                        style={{ width: '86%' }}
                        aria-valuenow={86}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                    <div className='fs-6 text-gray-600 fw-semibold mb-10'>
                      14 Projects and 300 files remaining until your plan requires update
                    </div>
                    <div className='d-flex justify-content-end pb-0 px-0'>
                      <a
                        href='#'
                        className='btn btn-sm btn-outline btn-outline btn-outline-primary me-2 w-100'
                        id='kt_account_billing_cancel_subscription_btn'
                      >
                        Cancel
                      </a>
                      <button
                        className='btn btn-sm btn-outline btn-outline btn-outline-primary w-100'
                        data-bs-toggle='modal'
                        data-bs-target='#kt_modal_upgrade_plan'
                      >
                        Upgrade Pro
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className='tab-pane fade' id='kt_aside_nav_tab_menu' role='tabpanel'>
                <div className='mx-5'>
                  <div className=' pt-10 mb-20'>
                    <h3 className='fs-2 fw-bold mb-7'>File Manager</h3>
                    <p className='text-gray-500 fs-4 fw-semibold mb-10'>
                      Make Folders Mange And Train Ai Model
                    </p>
                  </div>
                  <div className='text-center px-4'>
                    <i
                      className='ki-duotone ki-folder  text-primary me-4'
                      style={{ fontSize: '7.75rem!important' }}
                    >
                      <span className='path1' />
                      <span className='path2' />
                    </i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
