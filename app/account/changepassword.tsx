'use client'
import clsx from 'clsx'
import { useFormik } from 'formik'
import { useState, useLayoutEffect } from 'react'
import * as Yup from 'yup'
import { createBrowserClient } from '@supabase/ssr'
import toast from 'react-hot-toast'
import { useUser } from '@/lib/store/user'
import { redirect, useRouter } from 'next/navigation'

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

export default function ChangePassword() {
  const router = useRouter()
  const [fieldPass, setfieldPass] = useState(false)
  const setUser = useUser((state) => state.setUser)
  const user = useUser((state) => state.user)
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
    password: '',
  })

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
          setLoading(false)
          return
        }

        setStatus('')
        setLoading(false)
        toast.success('Password Updated successfully')
        await supabase.auth.signOut()
        setUser(null)
        router.push('/login')
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
    <div className='card mb-5 mb-xl-10 border border-gray-300 border-dashed'>
      <div className='card-header border-0 cursor-pointer'>
        <div className='card-title m-0'>
          <h3 className='fw-bold m-0'>Change Password</h3>
        </div>
      </div>
      <div>
        <div className='card-body border-top p-9'>
          {formik.status ? (
            <div className='mb-lg-15 alert alert-danger'>
              <div className='alert-text font-weight-bold'>{formik.status}</div>
            </div>
          ) : (
            <div />
          )}
          <form
            id='kt_signin_change_password'
            onSubmit={formik.handleSubmit}
            noValidate
            className='form fv-plugins-bootstrap5 fv-plugins-framework'
          >
            <div className='row mb-1'>
              <label className='col-lg-4 col-form-label fw-semibold fs-6'>Change Password</label>
              <div className='col-lg-8'>
                <div className='fv-row mb-0 fv-plugins-icon-container'>
                  <div
                    className='fv-row mb-8 fv-plugins-icon-container'
                    data-kt-password-meter='true'
                  >
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
                </div>
              </div>
            </div>

            <div className=' d-flex justify-content-end py-6 '>
              <button
                type='submit'
                id='kt_sign_up_submit'
                className='btn  btn-sm btn-primary'
                disabled={formik.isSubmitting || !formik.isValid}
              >
                <span className='indicator-label me-2'> Update Password</span>

                {loading && <span className='spinner-border spinner-border-sm align-middle ms-2' />}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
