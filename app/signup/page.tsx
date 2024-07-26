'use client'
import Layout from './../../components/Layout'
import clsx from 'clsx'
import { useFormik } from 'formik'
import { useState, useEffect } from 'react'
import * as Yup from 'yup'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import { signUpWithEmailAndPassword } from './actions'
import { createBrowserClient } from '@supabase/ssr'
import toast from 'react-hot-toast'
import { useUser } from '@/lib/store/user'
import { redirect } from 'next/navigation'
const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),

  fullname: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(30, 'Maximum 50 symbols')
    .required('Full Name is required'),
  rememberPassword: Yup.boolean().notRequired(),
})

export default function SignUp() {
  const user = useUser((state) => state.user)
  const router = useRouter()
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)
  const [fieldPass, setfieldPass] = useState(false)
  const [initialValues, setInitialValues] = useState({
    fullname: '',
    email: '',
    password: '',
    rememberPassword: true,
  })

  useEffect(() => {
    let value: any = 'null'
    if (typeof window !== 'undefined') {
      value = localStorage.getItem('rememberPassword')
      setInitialValues({
        fullname: `${JSON.parse(value)?.full_name || ''}`,
        email: `${JSON.parse(value)?.email || ''}`,
        password: `${JSON.parse(value)?.password || ''}`,
        rememberPassword: JSON.parse(value)?.rememberPassword,
      })
    }

    if (user) {
      return redirect('/')
    }
  }, [])

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: loginSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true)
      try {
        const dataMap = {
          email: values.email,
          full_name: values.fullname,
          password: values.password,
        }

        const result = await signUpWithEmailAndPassword({
          data: dataMap,
          emailRedirectTo: `${location.origin}/auth/callback`,
        })

        const { error } = JSON.parse(result)

        if (values.rememberPassword) {
          if (typeof window !== 'undefined') {
            localStorage.setItem(
              'rememberPassword',
              JSON.stringify({
                rememberPassword: values.rememberPassword,
                email: values.email,
                ful_name: values.fullname,
                password: values.password,
              })
            )
          }
        } else {
          if (typeof window !== 'undefined') {
            localStorage.setItem(
              'rememberPassword',
              JSON.stringify({
                rememberPassword: false,
                email: '',
                password: '',
                ful_name: '',
              })
            )
          }
        }
        if (error) {
          setStatus(
            'The information you have provided is incorrect. Please try again.or you have already register with this email'
          )
          toast.error(
            'The information you have provided is incorrect. Please try again.or you have already register with this email'
          )

          setLoading(false)
          return
        }

        setStatus('')
        toast.success('Registered successfully')
        router.push('/login')
      } catch (error: any) {
        toast.error(error)
        // eslint-disable-next-line no-console
        console.error(error)

        setStatus(
          'The information you have provided is incorrect. Please try again.or you have already register with this email'
        )
        setSubmitting(false)
        setLoading(false)
      }
    },
  })

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  return (
    <Layout>
      <div className='bg-body d-flex flex-column flex-center rounded-4 w-md-600px p-10 m-auto'>
        <div className='d-flex flex-center flex-column align-items-stretch h-lg-100 w-md-400px'>
          <div className='d-flex flex-center flex-column flex-column-fluid pb-15 pb-lg-20'>
            <form
              className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
              onSubmit={formik.handleSubmit}
              noValidate
            >
              <div className='text-center mb-11'>
                <h1 className='text-gray-900 fw-bolder mb-3'>Sign Up</h1>
                <div className='text-gray-500 fw-semibold fs-6'>
                  Create Account Fill The All Fields Below
                </div>
              </div>

              {formik.status ? (
                <div className='mb-lg-15 alert alert-danger'>
                  <div className='alert-text font-weight-bold'>{formik.status}</div>
                </div>
              ) : (
                <div />
              )}
              <div className='fv-row mb-8 fv-plugins-icon-container'>
                <input
                  placeholder='Full Name'
                  {...formik.getFieldProps('fullname')}
                  className={clsx('form-control form-control-lg mb-3', {
                    'is-invalid': formik.touched.fullname && formik.errors.fullname,
                  })}
                  type='text'
                  name='fullname'
                  autoComplete='off'
                />

                <div className='text-danger'>{formik.errors.fullname}</div>
                <div className='fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback' />
              </div>

              <div className='fv-row mb-8 fv-plugins-icon-container'>
                <input
                  placeholder='Email'
                  {...formik.getFieldProps('email')}
                  className={clsx('form-control form-control-lg mb-3', {
                    'is-invalid': formik.touched.email && formik.errors.email,
                  })}
                  type='email'
                  name='email'
                  autoComplete='off'
                />

                <div className='text-danger'>{formik.errors.email}</div>
                <div className='fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback' />
              </div>
              <div className='fv-row mb-8 fv-plugins-icon-container' data-kt-password-meter='true'>
                <div className='mb-1'>
                  <div className='position-relative mb-3'>
                    <input
                      type={fieldPass ? 'text' : 'password'}
                      placeholder='Password'
                      autoComplete='off'
                      {...formik.getFieldProps('password')}
                      className={clsx('form-control form-control-lg', {
                        'is-invalid': formik.touched.password && formik.errors.password,
                      })}
                    />
                    <span
                      className='btn btn-sm btn-primary position-absolute translate-middle top-50 end-0 me-n2'
                      data-kt-password-meter-control='visibility'
                      onClick={() => setfieldPass(!fieldPass)}
                    >
                      <i className={`fa fa-eye${fieldPass ? '' : '-slash'}`} />
                    </span>
                  </div>
                </div>
                <div className='text-danger'>{formik.errors.password}</div>
                <div className='fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback' />
              </div>

              <div className='fv-row mb-8 fv-plugins-icon-container'>
                <label className='form-check form-check-inline'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    id='rememberPassword'
                    {...formik.getFieldProps('rememberPassword')}
                  />
                  <span className='form-check-label fw-semibold text-gray-700 fs-base ms-1'>
                    Remember Password
                  </span>
                </label>
                <div className='fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback' />
              </div>

              <div className='d-grid my-5'>
                <button
                  type='submit'
                  id='kt_sign_up_submit'
                  className='btn btn-primary'
                  disabled={formik.isSubmitting || !formik.isValid}
                >
                  <span className='indicator-label me-2'>Sign Up</span>

                  {loading && (
                    <span className='spinner-border spinner-border-sm align-middle ms-2' />
                  )}
                </button>
              </div>
              <div className='text-gray-500 text-center fw-semibold fs-6 '>
                Already have an Account?
                <Link href='login' className='link-primary fw-semibold  ms-2'>
                  Sign in
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}
