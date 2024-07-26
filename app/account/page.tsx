'use client'
import Layout from './../../components/Layout'
import clsx from 'clsx'
import { useFormik } from 'formik'
import { useState, useEffect, useLayoutEffect } from 'react'
import * as Yup from 'yup'
import { createBrowserClient } from '@supabase/ssr'
import toast from 'react-hot-toast'
import { useUser } from '@/lib/store/user'
import { redirect } from 'next/navigation'
import Avatar from './avatar'
import ChangePassword from './changepassword'
const loginSchema = Yup.object().shape({
  full_name: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(30, 'Maximum 50 symbols')
    .required('Full Name is required'),
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .notRequired(),
  phone_no: Yup.string().notRequired(),
  website: Yup.string().notRequired(),
  ai_key: Yup.string().notRequired(),
})

export default function MyAccount() {
  // const router = useRouter()
  const [avatar_url, setAvatarUrl] = useState<string | null>(null)
  const setUser = useUser((state) => state.setUser)
  const user = useUser((state) => state.user)
  const [fieldPass, setfieldPass] = useState(false)
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useLayoutEffect(() => {
    const isAuth = user
    if (!isAuth) {
      redirect('/')
    }
  }, [])

  const [loading, setLoading] = useState(false)
  const [initialValues, setInitialValues] = useState({
    full_name: '',
    phone_no: '',
    website: '',
    ai_key: '',
    email: '',
  })
  const readSession = async () => {
    const { data: userSesssion } = await supabase.auth.getSession()
    if (userSesssion.session) {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userSesssion.session?.user.id)
        .single()

      data.email = userSesssion.session?.user?.email

      setInitialValues({
        full_name: data?.full_name,
        phone_no: data?.phone_no,
        website: data?.website,
        ai_key: data?.ai_key,
        email: data?.email,
      })
      setAvatarUrl(data?.avatar_url)
      setUser(data)
    }
  }
  useEffect(() => {
    readSession()
  }, [])

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: loginSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true)
      try {
        const { error } = await supabase.from('profiles').upsert({
          id: user?.id,
          full_name: values?.full_name,
          display_name: values?.full_name,
          phone_no: values?.phone_no,
          website: values?.website,
          ai_key: values?.ai_key,
          avatar_url: avatar_url,
          updated_at: new Date().toISOString(),
        })
        if (error) {
          setStatus(error.message)
          toast.error(error.message)
          setLoading(false)
          return
        }

        setStatus('')
        setLoading(false)
        toast.success('Updated successfully')
        readSession()
      } catch (error: any) {
        toast.error(error)
        // eslint-disable-next-line no-console
        console.error(error)

        setStatus('The information you have provided is incorrect. Please try again.')
        setSubmitting(false)
        setLoading(false)
      }
    },
  })

  return (
    <Layout>
      <div className='card mb-5 mb-xl-10 border border-gray-300 border-dashed'>
        <div className='card-header border-0 cursor-pointer'>
          <div className='card-title m-0'>
            <h3 className='fw-bold m-0'>Profile Details</h3>
          </div>
        </div>
        <div>
          <form
            onSubmit={formik.handleSubmit}
            noValidate
            id='kt_account_profile_details_form'
            className='form fv-plugins-bootstrap5 fv-plugins-framework'
          >
            <div className='card-body border-top p-9'>
              {formik.status ? (
                <div className='mb-lg-15 alert alert-danger'>
                  <div className='alert-text font-weight-bold'>{formik.status}</div>
                </div>
              ) : (
                <div />
              )}
              <div className='row mb-6'>
                <label className='col-lg-4 col-form-label fw-semibold fs-6'>Avatar</label>
                <div className='col-lg-8'>
                  <Avatar
                    uid={user?.id ?? null}
                    url={avatar_url}
                    size={150}
                    onUpload={(url) => {
                      setAvatarUrl(url)
                    }}
                  />
                  <div className='form-text'>Allowed file types: png, jpg, jpeg.</div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-4 col-form-label  fw-semibold fs-6'>Full Name</label>
                <div className='col-lg-8'>
                  <div className='row'>
                    <div className='col-lg-12 fv-row fv-plugins-icon-container'>
                      <input
                        placeholder='Full Name'
                        {...formik.getFieldProps('full_name')}
                        className={clsx('form-control form-control-lg mb-3', {
                          'is-invalid': formik.touched.full_name && formik.errors.full_name,
                        })}
                        type='text'
                        name='full_name'
                        autoComplete='off'
                      />

                      <div className='text-danger'>{formik.errors.full_name}</div>
                      <div className='fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback' />
                    </div>
                  </div>
                </div>
              </div>

              <div className='row mb-6'>
                <label className='col-lg-4 col-form-label  fw-semibold fs-6'>Email</label>
                <div className='col-lg-8'>
                  <div className='row'>
                    <div className='col-lg-12 fv-row fv-plugins-icon-container'>
                      <input
                        placeholder='Email'
                        {...formik.getFieldProps('email')}
                        className={clsx('form-control form-control-lg mb-3', {
                          'is-invalid': formik.touched.email && formik.errors.email,
                        })}
                        type='email'
                        name='email'
                        disabled
                        autoComplete='off'
                      />

                      <div className='text-danger'>{formik.errors.email}</div>
                      <div className='fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback' />
                    </div>
                  </div>
                </div>
              </div>

              <div className='row mb-6'>
                <label className='col-lg-4 col-form-label fw-semibold fs-6'>
                  <span className=''>Contact Phone</span>
                  <span
                    className='ms-1'
                    data-bs-toggle='tooltip'
                    aria-label='Phone number must be active'
                    data-bs-original-title='Phone number must be active'
                    data-kt-initialized={1}
                  >
                    <i className='ki-duotone ki-information-5 text-gray-500 fs-6'>
                      <span className='path1' />
                      <span className='path2' />
                      <span className='path3' />
                    </i>
                  </span>
                </label>
                <div className='col-lg-8 fv-row fv-plugins-icon-container'>
                  <input
                    placeholder='Phone number'
                    {...formik.getFieldProps('phone_no')}
                    className={clsx('form-control form-control-lg mb-3', {
                      'is-invalid': formik.touched.phone_no && formik.errors.phone_no,
                    })}
                    type='text'
                    name='phone_no'
                    autoComplete='off'
                  />

                  <div className='text-danger'>{formik.errors.phone_no}</div>
                  <div className='fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback' />
                </div>
              </div>

              <div className='row mb-6'>
                <label className='col-lg-4 col-form-label  fw-semibold fs-6'>Company Site</label>
                <div className='col-lg-8 fv-row fv-plugins-icon-container'>
                  <input
                    placeholder='Company Site'
                    {...formik.getFieldProps('website')}
                    className={clsx('form-control form-control-lg mb-3', {
                      'is-invalid': formik.touched.website && formik.errors.website,
                    })}
                    type='text'
                    name='website'
                    autoComplete='off'
                  />

                  {/* <div className='text-danger'>{formik.errors.website}</div> */}
                  <div className='fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback' />
                </div>
              </div>

              <div className='row mb-6'>
                <label className='col-lg-4 col-form-label  fw-semibold fs-6'>Ai Key</label>
                <div className='col-lg-8 fv-row fv-plugins-icon-container'>
                  <div className='position-relative mb-3'>
                    <input
                      placeholder='Ai Key'
                      {...formik.getFieldProps('ai_key')}
                      className={clsx('form-control form-control-lg mb-3', {
                        'is-invalid': formik.touched.ai_key && formik.errors.ai_key,
                      })}
                      type={fieldPass ? 'text' : 'hidden'}
                      name='ai_key'
                    />

                    <span
                      className='btn btn-sm btn-primary position-absolute translate-middle top-50 end-0 me-n2'
                      data-kt-password-meter-control='visibility'
                      onClick={() => setfieldPass(!fieldPass)}
                    >
                      <i className={`fa fa-eye${fieldPass ? '' : '-slash'}`} />
                    </span>
                  </div>
                  {/* <div className='text-danger'>{formik.errors.website}</div> */}
                  <div className='fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback' />
                </div>
              </div>
            </div>

            <div className='card-footer d-flex justify-content-end py-6 px-9'>
              <button
                type='submit'
                id='kt_sign_up_submit'
                className='btn btn-sm btn-primary'
                disabled={formik.isSubmitting || !formik.isValid}
              >
                <span className='indicator-label me-2'>Save Changes</span>

                {loading && <span className='spinner-border spinner-border-sm align-middle ms-2' />}
              </button>
            </div>
          </form>
        </div>
      </div>

      <ChangePassword />
    </Layout>
  )
}
