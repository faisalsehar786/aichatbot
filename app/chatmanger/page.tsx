'use client'
import { useState, useEffect, forwardRef } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useUser } from '@/lib/store/user'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Layout from '@/components/Layout'
import { useSearchParams } from 'next/navigation'
import Modal from 'react-bootstrap/Modal'
import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer'
import moment from 'moment'
import { Dropdown, Button } from 'react-bootstrap'
import React from 'react'

export default function ChatManger() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const name = searchParams.get('folder_name')
  const user = useUser((state) => state.user)
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const router = useRouter()
  const [tasks, setTasks] = useState<any>([])
  const [isEditing, setIsEditing] = useState<any>('')
  const [isDeleting, setisDeleting] = useState<any>('')
  const [updateTaskName, setupdateTaskName] = useState<any>('')
  const [loading, setLoading] = useState(false)
  const [searchTasks, setsearchTasks] = useState<any>('')
  const [toggleAcc, settoggleAcc] = useState<any>(false)
  const [show, setShow] = useState(false)
  const [folders, setfolders] = useState<any>([])
  const [folderId, setfolderId] = useState<any>('')
  const [chatId, setchatId] = useState<any>('')
  const handleClose = () => setShow(false)

  const [showA, setShowA] = useState(false)
  const [showB, setShowB] = useState(false)

  const toggleShowA = () => setShowA(!showA)
  const toggleShowB = () => setShowB(!showB)

  const handleShow = async (chat_id: any) => {
    setShowA(false)
    setShowB(false)
    setShow(true)
    setchatId(chat_id)
    setLoading(true)
    try {
      let query = supabase
        .from('folders')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })
      // Check order query parameter and apply sorting
      if (searchTasks) {
        query = query.ilike('name', `%${searchTasks}%`)
      }

      const { data: chats, error } = await query

      if (error) {
        toast.error('something Went wrong try again or unauthorized User please login!')
        setLoading(false)
        return
      }
      setfolders(chats)
      setLoading(false)
      console.log(chats)
    } catch (error: any) {
      console.error('Error fetching data:', error.message)
    }
  }
  const addTask = async () => {
    if (!user) {
      router.push('/login')
      return
    }

    setLoading(true)
    try {
      const { error } = await supabase
        .from('chats')
        .insert([{ name: 'New Chat', folder_id: id }])
        .select()
      if (error) {
        setLoading(false)
        router.push('/login')
        toast.error('something Went wrong try again or unauthorized User please login!')
        return
      }
      toast.success('New Chat Created Successfully')
      fetchData()
      setLoading(false)
    } catch (error: any) {
      toast.error(error.message)
      setLoading(false)
    }
  }
  const fetchData = async () => {
    setLoading(true)
    try {
      let query = supabase
        .from('chats')
        .select('*')
        .eq('folder_id', id)
        .order('created_at', { ascending: false })
      // Check order query parameter and apply sorting
      if (searchTasks) {
        query = query.ilike('name', `%${searchTasks}%`)
      }

      const { data: chats, error } = await query

      if (error) {
        setLoading(false)
        toast.error('something Went wrong try again or unauthorized User please login!')
        return
      }
      setTasks(chats)
      setLoading(false)
    } catch (error: any) {
      console.error('Error fetching data:', error.message)
    }
  }

  useEffect(() => {
    if (user) {
      // Fetch initial data when component mounts
      fetchData()
    }
  }, [searchTasks, user, id])

  const deleteTask = async (id: any) => {
    if (!user) {
      router.push('/login')
      return
    }
    setLoading(true)
    try {
      const { error } = await supabase.from('chats').delete().eq('id', id)

      if (error) {
        setLoading(false)
        router.push('/login')
        toast.error('something Went wrong try again or unauthorized User please login!')
        return
      }
      toast.success('Chat Deleted  Successfully')
      fetchData()
      setLoading(false)
    } catch (error: any) {
      toast.error(error.message)
      setLoading(false)
    }
  }

  const updateTask = async (id: any) => {
    if (!user) {
      router.push('/login')
      return
    } else if (!updateTaskName) {
      toast.error('Chat name should not be empty or not be diffrent from current name !')
      return
    }

    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('chats')
        .update({ name: updateTaskName })
        .eq('id', id)
        .select()

      if (error) {
        setLoading(false)
        router.push('/login')
        toast.error('something Went wrong try again or unauthorized User please login!')
        return
      }
      setIsEditing('')
      toast.success('Chat Name Updated  Successfully')
      fetchData()
      setLoading(false)
    } catch (error: any) {
      toast.error(error.message)
      setLoading(false)
    }
  }
  const moveToFolder = async () => {
    if (folderId && chatId) {
      setLoading(true)
      try {
        const { error } = await supabase
          .from('chats')
          .update({ folder_id: folderId, move: true })
          .eq('id', chatId)
          .select()

        if (error) {
          setLoading(false)
          handleClose()

          toast.error('something Went wrong try again or unauthorized User please login!')
          return
        }
        handleClose()
        toast.success('Chat Moved To Folder Successfully')
        fetchData()
        setLoading(false)
      } catch (error: any) {
        toast.error(error.message)
        setLoading(false)
      }
    } else {
      handleClose()

      toast.error('Select Chat and Folder Again Please !')
    }
  }

  const copyToFolder = async () => {
    if (folderId && chatId) {
      setLoading(true)
      try {
        const { error } = await supabase
          .from('chats')
          .update({ folder_id: folderId, move: false })
          .eq('id', chatId)
          .select()

        if (error) {
          setLoading(false)
          handleClose()

          toast.error('something Went wrong try again or unauthorized User please login!')
          return
        }
        handleClose()

        toast.success('Chat Moved To Folder Successfully')
        fetchData()
        setLoading(false)
      } catch (error: any) {
        toast.error(error.message)
        setLoading(false)
      }
    } else {
      handleClose()

      toast.error('Select Chat and Folder Again Please !')
    }
  }

  const searchFolder = async (val: any) => {
    let query = supabase
      .from('folders')
      .select('*')
      .eq('user_id', user?.id)
      .order('created_at', { ascending: false })
    // Check order query parameter and apply sorting
    if (val) {
      query = query.ilike('name', `%${val}%`)
    }

    const { data: folders, error } = await query

    setfolders(folders)
  }

  interface CustomDropdownToggleProps {
    children: React.ReactNode // Content inside the toggle button
    onClick: React.MouseEventHandler<HTMLButtonElement> // Click event handler
    className?: string // Optional class name for additional styling
    icon?: React.ReactNode // Optional icon component for the toggle button
    dropDirection?: 'up' | 'down' | 'left' | 'right' // Dropdown menu direction
  }
  const CustomDropdownToggle: React.FC<CustomDropdownToggleProps> = ({
    children,
    onClick,
    className,
    icon,
    dropDirection = 'down', // Default drop direction is 'down'
  }) => (
    <Dropdown.Toggle
      as={Button}
      variant='outline-primary'
      className={className}
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        onClick(e)
      }}
      drop={dropDirection}
    >
      {children}
      {icon && <span className='ml-2'>{icon}</span>}
    </Dropdown.Toggle>
  )

  return (
    <Layout>
      <div className='card card-flush border border-gray-300 border-dashed'>
        <div className='pt-4 px-4'>
          <div className='card-title'>
            <div className='d-flex align-items-center position-relative my-1'>
              <i className='ki-duotone ki-magnifier fs-3 position-absolute ms-6'>
                <span className='path1' />
                <span className='path2' />
              </i>
              <input
                type='text'
                onChange={(e: any) => setsearchTasks(e.target.value)}
                data-kt-filemanager-table-filter='Search Chats...'
                className='form-control form-control-solid w-250px ps-15 h-35px'
                placeholder='Search Chats...'
              />
            </div>
          </div>
          <div className='card-toolbar'>
            <div className='d-flex justify-content-end' data-kt-filemanager-table-toolbar='base'>
              <button
                onClick={() => addTask()}
                type='button'
                className='  btn btn-sm btn-primary'
                id='kt_file_manager_new_folder'
              >
                <i className='bi bi-chat-left-text-fill fs-2 '>
                  <span className='path1' />
                  <span className='path2' />
                </i>
                New Chat
              </button>
            </div>
          </div>
        </div>
        <div className='p-4'>
          <div className='d-flex flex-stack'>
            <div className='badge badge-lg badge-light-primary'>
              <div className='d-flex align-items-center flex-wrap'>
                <i className='ki-duotone ki-folder fs-2x text-primary me-2'>
                  <span className='path1' />
                  <span className='path2' />
                </i>
                <a href='#'>Folder Name</a>
                <i className='ki-duotone ki-right fs-2 text-primary mx-1' /> <a href='#'>{name}</a>
              </div>
            </div>
            <div className='badge badge-lg badge-primary'>
              <span id='kt_file_manager_items_counter'>{tasks?.length} items</span>
            </div>
          </div>
          {loading && (
            <div className='text-center'>
              <span className='spinner-border spinner-border-lg align-middle ms-2' />
            </div>
          )}

          {tasks.length > 0 ? (
            <>
              {tasks.map((item: any) => (
                <div key={item.id}>
                  {isEditing == item?.id ? (
                    <div className='d-flex align-items-center my-2'>
                      <input
                        type='text'
                        id='kt_file_manager_rename_input'
                        name='rename_folder_name'
                        placeholder='Enter the new Chat name'
                        className='form-control  me-3 h-35px'
                        onChange={(e: any) => setupdateTaskName(e.target.value)}
                        defaultValue={item?.name}
                      />
                      <button
                        onClick={() => updateTask(item?.id)}
                        className='btn btn-sm btn-icon btn-light btn-active-light-primary me-2'
                        id='kt_file_manager_rename_folder'
                      >
                        <i className='bi bi-check2 fs-2'></i>{' '}
                      </button>
                      <button
                        className='btn btn-sm btn-icon btn-light btn-active-light-primary '
                        onClick={() => {
                          setisDeleting('')
                          setIsEditing('')
                        }}
                        id='kt_file_manager_rename_folder_cancel'
                      >
                        <i className='bi bi-x-lg ki-trash fs-2'></i>{' '}
                      </button>
                    </div>
                  ) : null}

                  {isDeleting == item?.id ? (
                    <div className='custom-list d-flex align-items-center p-2 my-3  rounded text-gray-800 text-hover-primary'>
                      <div className='d-flex flex-column flex-grow-1 '>
                        <span className='text-gray-800 text-hover-primary mb-1 customElipsis'>
                          {item?.name}
                        </span>
                      </div>

                      <div className='d-flex justify-content-end flex-shrink-0'>
                        <button
                          className='btn btn-sm btn-icon btn-light btn-active-light-primary me-2'
                          onClick={() => deleteTask(item?.id)}
                        >
                          <i className='bi bi-trash3 fs-2 '></i>
                        </button>
                        <button
                          className='btn btn-sm btn-icon btn-light btn-active-light-primary '
                          onClick={() => {
                            setisDeleting('')
                            setIsEditing('')
                          }}
                        >
                          <i className='bi bi-x-lg ki-trash fs-2'></i>
                        </button>
                      </div>
                    </div>
                  ) : null}

                  <div className='row border border-gray-300 border-dashed rounded text-gray-800 text-hover-primary pt-4 pb-3 mx-0 my-3'>
                    <div className='col-lg-10'>
                      <div className='custom-list d-flex  '>
                        <Link
                          className='mt-1'
                          href={{
                            pathname: '/chat',
                            query: {
                              id: item?.id,
                            },
                          }}
                        >
                          <span className='icon-wrapper cursor-pointer'>
                            <i className='bi bi-chat-left-text-fill fs-2 text-primary me-2'>
                              <span className='path1' />
                              <span className='path2' />
                            </i>
                          </span>
                        </Link>
                        <Link
                          href={{
                            pathname: '/chat',
                            query: {
                              id: item?.id,
                            },
                          }}
                          className='d-flex flex-column flex-grow-1 cursor-pointer'
                        >
                          <span className='text-gray-800 text-hover-primary mb-1 '>
                            {item.name}
                          </span>
                          <span className='text-gray-500 fs-8'>
                            {' '}
                            {moment(item?.created_at).calendar()}
                          </span>
                        </Link>
                      </div>
                    </div>
                    <div className='col-lg-2'>
                      <div className='d-flex justify-content-end flex-shrink-0'>
                        <Dropdown className='d-inline mx-2'>
                          <Dropdown.Toggle
                            as={CustomDropdownToggle}
                            id='dropdown-custom'
                            className='btn btn-sm  btn-light btn-active-light-primary hideaftericon dropDownCustomButtomPadding'
                            icon={
                              <i className='ki-duotone ki-dots-square fs-5 m-0'>
                                <span className='path1' />
                                <span className='path2' />
                                <span className='path3' />
                                <span className='path4' />
                              </i>
                            }
                            dropDirection='down'
                          ></Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item href='#'>
                              <Link
                                href={{
                                  pathname: '/chat',
                                  query: {
                                    id: item?.id,
                                  },
                                }}
                              >
                                Train Ai
                              </Link>
                            </Dropdown.Item>
                            <Dropdown.Item
                              href='#'
                              onClick={() => {
                                setIsEditing(item?.id)
                                setisDeleting('')
                              }}
                            >
                              Rename
                            </Dropdown.Item>
                            <Dropdown.Item
                              href='#'
                              onClick={() => {
                                handleShow(item?.id)
                              }}
                            >
                              Move Or Copy To Other Folders
                            </Dropdown.Item>
                            <Dropdown.Item href='#'>Move To Default Chat</Dropdown.Item>
                            <Dropdown.Item
                              href='#'
                              onClick={() => {
                                setIsEditing('')
                                setisDeleting(item?.id)
                              }}
                            >
                              Delete
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className='border border-gray-300 border-dashed rounded text-center py-3 px-4 mt-3 mb-3'>
              <div className='text-gray-500 text-hover-primary align-items-center'>Empty Chat</div>
            </div>
          )}
        </div>
      </div>
      <Modal
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        // centered
        show={show}
        onHide={handleClose}
        animation={false}
      >
        <div className='modal-content'>
          <form
            className='form fv-plugins-bootstrap5 fv-plugins-framework'
            action='#'
            id='kt_modal_move_to_folder_form'
          >
            <div className='modal-header'>
              <h2 className='fw-bold'>Move or Copy to folder</h2>
              <div
                className='btn btn-icon btn-sm btn-active-icon-primary'
                data-bs-dismiss='modal'
                onClick={() => handleClose()}
              >
                <i className='ki-duotone ki-cross fs-1'>
                  <span className='path1' />
                  <span className='path2' />
                </i>{' '}
              </div>
            </div>
            <div className='modal-body pt-10 pb-15 px-lg-17'>
              <div
                id='kt_header_search'
                className='header-search d-flex align-items-center w-100 mb-5'
              >
                <form
                  data-kt-search-element='form'
                  className='d-none d-lg-block w-100 position-relative mb-5 mb-lg-0'
                  autoComplete='off'
                >
                  <input type='hidden' />
                  <i className='ki-duotone ki-magnifier search-icon fs-3 text-gray-500 position-absolute top-50 translate-middle-y ms-5'>
                    <span className='path1' />
                    <span className='path2' />
                  </i>
                  <input
                    type='text'
                    className='search-input form-control form-control-solid ps-13 h-35px'
                    name='search'
                    defaultValue=''
                    onChange={(e: any) => searchFolder(e.target.value)}
                    placeholder='Search Folder...'
                    data-kt-search-element='input'
                  />
                  <span
                    className='search-spinner position-absolute top-50 end-0 translate-middle-y lh-0 d-none me-5'
                    data-kt-search-element='spinner'
                  >
                    <span className='spinner-border h-15px w-15px align-middle text-gray-500' />
                  </span>
                  <span
                    className='search-reset btn btn-flush btn-active-color-primary position-absolute top-50 end-0 translate-middle-y lh-0 d-none me-4'
                    data-kt-search-element='clear'
                  >
                    <i className='ki-duotone ki-cross fs-2 fs-lg-1 me-0'>
                      <span className='path1' />
                      <span className='path2' />
                    </i>
                  </span>
                </form>
              </div>

              {loading && (
                <div className='text-center'>
                  <span className='spinner-border spinner-border-lg align-middle ms-2' />
                </div>
              )}

              <div className='form-group fv-row fv-plugins-icon-container'>
                {folders?.map((item: any) => (
                  <div key={item?.id}>
                    <div className='d-flex'>
                      <div className='form-check form-check-custom form-check-solid'>
                        <input
                          onClick={(e: any) => setfolderId(e.target.value)}
                          className='form-check-input me-3'
                          name='move_to_folder'
                          type='radio'
                          defaultValue={item?.id}
                          checked={folderId == item?.id}
                          id='kt_modal_move_to_folder_0'
                        />
                        <label className='form-check-label' htmlFor='kt_modal_move_to_folder_0'>
                          <div className='fw-bold'>
                            <i className='ki-duotone ki-folder fs-2 text-primary me-2'>
                              <span className='path1' />
                              <span className='path2' />
                            </i>{' '}
                            {item?.name}
                          </div>
                        </label>
                      </div>
                    </div>
                    <div className='separator separator-dashed my-5' />
                  </div>
                ))}

                <div className='fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback' />
              </div>
              <div className='d-flex flex-center mt-12'>
                <button
                  onClick={() => toggleShowA()}
                  type='button'
                  className='btn btn-sm btn-primary me-3'
                  id='kt_modal_move_to_folder_submit'
                >
                  <span className='indicator-label'>Move</span>
                </button>

                <button
                  onClick={() => toggleShowB()}
                  type='button'
                  className='btn btn-sm btn-primary'
                  id='kt_modal_move_to_folder_submit'
                >
                  <span className='indicator-label'>Copy</span>
                </button>
                <ToastContainer className='p-3' position={`bottom-center`} style={{ zIndex: 1 }}>
                  <Toast show={showA}>
                    <Toast.Body>
                      Are you sure you would like to move to this folder
                      <div className='d-flex flex-center mt-12'>
                        <button
                          onClick={() => moveToFolder()}
                          type='button'
                          className='btn btn-sm btn-primary me-3'
                          id='kt_modal_move_to_folder_submit'
                        >
                          <span className='indicator-label'>Move</span>
                        </button>

                        <button
                          type='button'
                          onClick={() => toggleShowA()}
                          className='btn btn-sm btn-light'
                          id='kt_modal_move_to_folder_submit'
                        >
                          <span className='indicator-label'>Cancel</span>
                        </button>
                      </div>
                    </Toast.Body>
                  </Toast>
                </ToastContainer>

                <ToastContainer className='p-3' position={`bottom-center`} style={{ zIndex: 1 }}>
                  <Toast show={showB}>
                    <Toast.Body>
                      Are you sure you would like to Copy to this folder
                      <div className='d-flex flex-center mt-12'>
                        <button
                          onClick={() => copyToFolder()}
                          type='button'
                          className='btn btn-sm btn-primary me-3'
                          id='kt_modal_move_to_folder_submit'
                        >
                          <span className='indicator-label'>Copy</span>
                        </button>

                        <button
                          type='button'
                          onClick={() => toggleShowB()}
                          className='btn btn-sm btn-light'
                          id='kt_modal_move_to_folder_submit'
                        >
                          <span className='indicator-label'>Cancel</span>
                        </button>
                      </div>
                    </Toast.Body>
                  </Toast>
                </ToastContainer>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </Layout>
  )
}
