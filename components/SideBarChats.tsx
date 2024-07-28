'use client'
import { useState, useEffect } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useUser } from '@/lib/store/user'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Modal from 'react-bootstrap/Modal'
import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer'
import moment from 'moment'
import Link from 'next/link'
import { useTheme } from '@/context/ThemeContext'
export default function SideBarChats(props: any) {
  const { selectedChat, chatSelect, closechat, setChat } = useTheme()
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
  const [show, setShow] = useState(false)
  const [folders, setfolders] = useState<any>([])
  const [folderId, setfolderId] = useState<any>('')
  const [chatId, setchatId] = useState<any>('')
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [total, setTotal] = useState<any>(0)
  const PAGE_SIZE = 100
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

  const fetchData = async () => {
    try {
      let query = supabase
        .from('chats')
        .select('*', { count: 'exact' })
        .eq('user_id', user?.id)
        .eq('move', false)

      if (searchTasks) {
        query = query.ilike('name', `%${searchTasks}%`)
      }

      const { data, error, count } = await query.range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1)

      if (error) {
        console.error('Error fetching posts:', error)
        return
      }
      setTotal(count)
      setTasks((prevTasks: any) => (page === 0 ? data : [...prevTasks, ...data]))
      setHasMore(data.length === PAGE_SIZE)
    } catch (error: any) {
      console.error('Error fetching data:', error.message)
    }
  }

  supabase
    .channel('custom-all-channel')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'chats' }, (payload) => {
      // console.log('Change received:', payload)
      // Update data in state based on change type
      switch (payload.eventType) {
        case 'INSERT':
          setTasks((prevData: any) => [payload.new, ...prevData])
          break
        case 'UPDATE':
          setTasks((prevData: any) =>
            prevData.map((item: any) => (item.id === payload.new.id ? payload.new : item))
          )
          break
        case 'DELETE':
          setTasks((prevData: any) => prevData.filter((item: any) => item.id !== payload.old.id))
          break
        default:
          break
      }
    })
    .subscribe()
  useEffect(() => {
    if (user) {
      // Fetch initial data when component mounts
      fetchData()
    }
  }, [searchTasks, user, page])

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
      // fetchData()
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
      // fetchData()
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
        // fetchData()
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

        toast.success('Chat Copy To Folder Successfully')
        // fetchData()
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
  const handleLoadMore = () => {
    if (hasMore) {
      setPage((prevPage: any) => prevPage + 1)
    }
  }
  return (
    <>
      <div className='accordion accordion-icon-toggle'>
        <div className='mb-5'>
          <div
            onClick={() => setChat(!closechat)}
            className='accordion-header pt-2 d-flex'
            data-bs-toggle='collapse'
            data-bs-target='#kt_accordion_2_item_1'
          >
            <span className=''>
              <i
                className={`${closechat ? 'bi bi-chevron-up' : 'bi bi-chevron-down'} fs-4 text-primary`}
              ></i>
            </span>
            <h3 className='fs-7 fw-semibold mb-0 ms-4'>
              Chats ({total})
              {loading && <span className='spinner-border spinner-border-sm align-middle ms-2' />}
            </h3>
          </div>
          <div id='kt_accordion_2_item_1' style={{ display: closechat ? 'none' : 'block' }}>
            <form
              data-kt-search-element='form'
              className='d-none d-lg-block w-100 position-relative mb-5 mt-3 mb-lg-0'
              autoComplete='off'
            >
              <input type='hidden' />
              <i className='ki-duotone ki-magnifier search-icon fs-3 text-gray-500 position-absolute top-50 translate-middle-y ms-5'>
                <span className='path1' />
                <span className='path2' />
              </i>
              <input
                onChange={(e: any) => {
                  setPage(0)
                  setsearchTasks(e.target.value)
                }}
                type='text'
                className='search-input form-control form-control-solid ps-13 h-35px'
                name='search chats'
                defaultValue=''
                placeholder='Search Chats...'
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

            {tasks.length > 0 ? (
              <>
                {tasks
                  ?.filter((item1: any) => item1.move !== true)
                  .map((item: any) => (
                    <div key={item.id}>
                      {isEditing == item?.id ? (
                        <div className='d-flex align-items-center my-2'>
                          <input
                            type='text'
                            id='kt_file_manager_rename_input'
                            name='rename_folder_name'
                            placeholder='Enter the new Chat name'
                            className='form-control mw-200px me-3 h-35px'
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

                      <div
                        data-bs-toggle='tooltip'
                        data-bs-trigger='hover'
                        data-bs-placement='right'
                        data-bs-dismiss='click'
                        title={item?.name}
                        style={{
                          boxShadow:
                            selectedChat == item?.id ? 'rgba(0, 0, 0, 0.24) 0px 3px 8px' : '',
                        }}
                        className={`${selectedChat == item?.id ? 'custom-list d-flex  p-2 my-3 border border-primary border-dashed rounded text-gray-800 text-hover-primary' : 'custom-list d-flex  p-2 my-3 border border-gray-300 border-dashed rounded text-gray-800 text-hover-primary'}`}
                      >
                        <Link
                          className='mt-1'
                          href={{
                            pathname: '/chat',
                            query: {
                              id: item?.id,
                            },
                          }}
                        >
                          <span
                            className='icon-wrapper cursor-pointer'
                            onClick={() => chatSelect(item?.id)}
                          >
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
                          onClick={() => chatSelect(item?.id)}
                          className='d-flex flex-column flex-grow-1 cursor-pointer'
                        >
                          <span className='text-gray-800 text-hover-primary mb-1 customElipsis'>
                            {item.name}
                          </span>
                          <span className='text-gray-500 fs-8'>
                            {moment(item?.created_at).calendar()}
                          </span>
                        </Link>

                        <div className='d-flex justify-content-end flex-shrink-0'>
                          <button
                            className=' me-2'
                            onClick={() => {
                              handleShow(item?.id)
                            }}
                          >
                            <i className='ki-duotone ki-switch fs-2'>
                              <span className='path1' />
                              <span className='path2' />
                            </i>
                          </button>
                          <button
                            className=' me-2'
                            onClick={() => {
                              setIsEditing(item?.id)
                              setisDeleting('')
                            }}
                          >
                            <i className='ki-duotone ki-pencil fs-2'>
                              <span className='path1' />
                              <span className='path2' />
                            </i>
                          </button>
                          <button
                            className=' '
                            onClick={() => {
                              setIsEditing('')
                              setisDeleting(item?.id)
                            }}
                          >
                            <i className='ki-duotone ki-trash fs-2'>
                              <span className='path1' />
                              <span className='path2' />
                              <span className='path3' />
                              <span className='path4' />
                              <span className='path5' />
                            </i>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                {hasMore && (
                  <div className=' text-center '>
                    <button
                      onClick={() => handleLoadMore()}
                      type='button'
                      className='btn btn-sm btn-icon h-20px btn-light btn-active-light-primary'
                    >
                      <i className='ki-duotone ki-down fs-3 m-0'>
                        <span className='path1'></span>
                        <span className='path2'></span>
                      </i>
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className='border border-gray-300 border-dashed rounded text-center py-3 px-4 mt-3 mb-3'>
                <div className='text-gray-500 text-hover-primary align-items-center'>
                  Empty Chat
                </div>
              </div>
            )}
          </div>
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
    </>
  )
}
