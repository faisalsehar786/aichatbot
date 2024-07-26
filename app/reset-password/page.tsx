'use client'
import Layout from './../../components/Layout'
import clsx from 'clsx'
import { useFormik } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import toast from 'react-hot-toast'
import { useUser } from '@/lib/store/user'
const loginSchema = Yup.object().shape({
  password: Yup.string()
    .required()
    .min(8, 'The password must consist of at least 8 characters.')

    .matches(
      /[0-9]/,
      'The password must contain both numbers, symbols, upper and lower case letters and consist of at least 8 characters'
    )
    .matches(
      /[a-z]/,
      'The password must contain both numbers, symbols, upper and lower case letters and consist of at least 8 characters'
    )
    .matches(
      /[A-Z]/,
      'The password must contain both numbers, symbols, upper and lower case letters and consist of at least 8 characters'
    )
    .matches(
      /[^\w]/,
      'The password must contain both numbers, symbols, upper and lower case letters and consist of at least 8 characters'
    ),
})

export default function ReSetPassword({
  searchParams,
}: {
  searchParams: { message: string; code: string }
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [fieldPass, setfieldPass] = useState(false)
  const setUser = useUser((state) => state.setUser)
  const [initialValues, setInitialValues] = useState({
    password: '',
  })
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: loginSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true)

      try {
        const { error } = await supabase.auth.updateUser({
          password: values.password,
        })

        if (error) {
          setStatus(error.message)
          toast.error(error.message)
          setLoading(false)
          router.push(`/forgot-password`)
          return
        }
        await supabase.auth.signOut()
        setUser(null)
        router.push('/login')
        setStatus('')
        toast.success('Password Reset Successfully')
        setLoading(false)
      } catch (error: any) {
        toast.error(error)
        // eslint-disable-next-line no-console
        console.error(error)
        setStatus('The information you have provided is incorrect. Please try again')
        setSubmitting(false)
        setLoading(false)
      }
    },
  })

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
                <h1 className='text-gray-900 fw-bolder mb-3'>Reset Password</h1>
                <div className='text-gray-500 fw-semibold fs-6'>
                  The password must contain both numbers, symbols, upper and lower case letters and
                  consist of at least 8 characters
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

              <div className='d-grid my-5'>
                <button
                  type='submit'
                  id='kt_sign_up_submit'
                  className='btn btn-primary'
                  disabled={formik.isSubmitting || !formik.isValid}
                >
                  <span className='indicator-label me-2'>Save</span>

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
