'use client'
import Layout from './../../components/Layout'
import clsx from 'clsx'
import { useFormik } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'
import Link from 'next/link'
import { createBrowserClient } from '@supabase/ssr'
import toast from 'react-hot-toast'

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
})

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false)
  const [initialValues, setInitialValues] = useState({
    email: '',
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
        const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
          redirectTo: `${origin}/reset-password`,
        })
        if (error) {
          setStatus('Could not authenticate user')
          // toast.error('The login information you have provided is incorrect. Please try again.')
          setLoading(false)
          return
        }
        setStatus('Password Reset link has been sent to your email address')
        toast.success('Password Reset link has been sent to your email address')
        setLoading(false)
      } catch (error: any) {
        toast.error(error)
        // eslint-disable-next-line no-console
        console.error(error)
        setStatus('Could not authenticate user')
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
                <h1 className='text-gray-900 fw-bolder mb-3'>Forgot Password</h1>
                <div className='text-gray-500 fw-semibold fs-6'>Enter Email Address</div>
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

              <div className='d-grid my-5'>
                <button
                  type='submit'
                  id='kt_sign_up_submit'
                  className='btn btn-primary'
                  disabled={formik.isSubmitting || !formik.isValid}
                >
                  <span className='indicator-label me-2'>Confirm</span>

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
