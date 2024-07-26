'use client'
import { useState, useEffect } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useUser } from '@/lib/store/user'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import moment from 'moment'
import { useTheme } from '@/context/ThemeContext'
export default function SideBarFolders(props: any) {
  const { selectedFolder, folderSelect, closefolder, setFolder } = useTheme()
  // const { refreshChat } = props
  const user = useUser((state) => state.user)
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const router = useRouter()
  const [tasks, setTasks] = useState<any>([])
  const [isEditing, setIsEditing] = useState<any>('')
  const [updateTaskName, setupdateTaskName] = useState<any>('')
  const [loading, setLoading] = useState(false)
  const [searchTasks, setsearchTasks] = useState<any>('')
  const [isDeleting, setisDeleting] = useState<any>('')
  const addTask = async () => {
    if (!user) {
      router.push('/login')
      return
    }
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('folders')
        .insert([{ name: 'New Folder' }])
        .select()
      if (error) {
        setLoading(false)
        router.push('/login')
        toast.error('something Went wrong try again or unauthorized User please login!')
        return
      }
      toast.success('New Folder Created Successfully')
      // fetchData()
      setLoading(false)
    } catch (error: any) {
      toast.error(error.message)
      setLoading(false)
    }
  }
  const fetchData = async () => {
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

      const { data: folders, error } = await query

      if (error) {
        toast.error('something Went wrong try again or unauthorized User please login!')
        return
      }
      setTasks(folders)

      console.log(folders)
    } catch (error: any) {
      console.error('Error fetching data:', error.message)
    }
  }

  const subscriptionfolder = supabase
    .channel('custom-all-channel')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'folders' }, (payload) => {
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

    // Clean up subscription when component unmounts
    // return () => {
    //   subscriptionfolder.unsubscribe()
    // }
  }, [searchTasks, user])

  const deleteTask = async (id: any) => {
    if (!user) {
      router.push('/login')
      return
    }
    setLoading(true)
    try {
      const { error } = await supabase.from('folders').delete().eq('id', id)

      if (error) {
        setLoading(false)
        router.push('/login')
        toast.error('something Went wrong try again or unauthorized User please login!')
        return
      }
      toast.success('Folder Deleted  Successfully')
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
      toast.error('Folder name should not be empty or not be diffrent from current name !')
      return
    }

    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('folders')
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
      toast.success('Folder Name Updated  Successfully')
      //  fetchData()
      setLoading(false)
    } catch (error: any) {
      toast.error(error.message)
      setLoading(false)
    }
  }

  return (
    <>
      <div className='accordion accordion-icon-toggle'>
        <div className='mb-5'>
          <div
            onClick={() => setFolder(!closefolder)}
            className='accordion-header my-3 d-flex'
            data-bs-toggle='collapse'
            data-bs-target='#kt_accordion_2_item_1'
          >
            <span className=''>
              <i
                className={`${closefolder ? 'bi bi-chevron-up' : 'bi bi-chevron-down'} fs-4 text-primary`}
              ></i>
            </span>
            <h3 className='fs-7 fw-semibold mb-0 ms-4'>
              Folders ({tasks?.length})
              {loading && <span className='spinner-border spinner-border-sm align-middle ms-2' />}
            </h3>
          </div>
          <div id='kt_accordion_2_item_1' style={{ display: closefolder ? 'none' : 'block' }}>
            <div className='d-flex mb-2'>
              <div id='kt_header_search' className='header-search d-flex align-items-center w-100'>
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
                    onChange={(e: any) => setsearchTasks(e.target.value)}
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
              <div className='flex-shrink-0 ms-2'>
                <button
                  type='button'
                  onClick={() => addTask()}
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
            </div>

            {tasks.length > 0 ? (
              <>
                {tasks?.map((item: any) => (
                  <div key={item.id}>
                    {isEditing == item?.id ? (
                      <div className='d-flex align-items-center my-2'>
                        <input
                          type='text'
                          id='kt_file_manager_rename_input'
                          name='rename_folder_name'
                          placeholder='Enter the new Folder name'
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
                            Are you sure !
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
                            className='btn btn-sm btn-icon btn-light btn-active-light-primary'
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
                          selectedFolder == item?.id ? 'rgba(0, 0, 0, 0.24) 0px 3px 8px' : '',
                      }}
                      className={`${selectedFolder == item?.id ? 'custom-list d-flex  p-2 my-3 border border-primary border-dashed rounded text-gray-800 text-hover-primary' : 'custom-list d-flex  p-2 my-3 border border-gray-300 border-dashed rounded text-gray-800 text-hover-primary'}`}
                    >
                      <Link
                        href={{
                          pathname: '/chatmanger',
                          query: {
                            id: item?.id,
                            folder_name: item?.name,
                          },
                        }}
                        onClick={() => folderSelect(item?.id)}
                      >
                        <span className='icon-wrapper cursor-pointer'>
                          <i className='ki-duotone ki-folder fs-2x text-primary me-2'>
                            <span className='path1' />
                            <span className='path2' />
                          </i>
                        </span>
                      </Link>
                      <Link
                        href={{
                          pathname: '/chatmanger',
                          query: {
                            id: item?.id,
                            folder_name: item?.name,
                          },
                        }}
                        onClick={() => folderSelect(item?.id)}
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
                            setisDeleting(item?.id)

                            setIsEditing('')
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
              </>
            ) : (
              <div className='border border-gray-300 border-dashed rounded text-center py-3 px-4 mt-3 mb-3'>
                <div className='text-gray-500 text-hover-primary align-items-center'>
                  Empty Folders
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
