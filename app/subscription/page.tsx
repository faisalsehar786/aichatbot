'use client'
import Layout from './../../components/Layout'
import Checkout from '@/components/stripe/Checkout'
import { useUser } from '@/lib/store/user'
import moment from 'moment'
import { createBrowserClient } from '@supabase/ssr'
import { useState, useEffect, forwardRef } from 'react'
// eslint-disable-next-line @next/next/no-async-client-component
import ManageBill from '@/components/stripe/ManageBill'
export default function Subscription() {
  const user = useUser((state) => state.user)
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const [folders, setFolders] = useState<any>(0)
  const [chats, setChats] = useState<any>(0)

  const fetchData = async () => {
    const { count } = await supabase
      .from('chats') // Replace with your actual table name
      .select('*', { count: 'exact' })
      .eq('user_id', user?.id)
    setFolders(count)

    const { count: total } = await supabase
      .from('folders')
      .select('*', { count: 'exact' })
      .eq('user_id', user?.id)
    setChats(total)
  }

  useEffect(() => {
    if (user) {
      fetchData()
    }
  }, [user])
  return (
    <Layout>
      <div className='card mb-5 mb-xl-10 border border-gray-300 border-dashed'>
        <div className='card-body'>
          {user?.subscription_status && new Date() <= new Date(user?.subscription_end) ? (
            <>
              <div className='notice d-flex bg-light-primary rounded border-primary border border-dashed mb-12 p-6'>
                <i className='ki-duotone ki-information fs-2tx text-warning me-4'>
                  <span className='path1' />
                  <span className='path2' />
                  <span className='path3' />
                </i>

                <div className='d-flex flex-stack flex-grow-1'>
                  <div className='fw-semibold'>
                    <h4 className='text-gray-900 fw-bold'>Now You have Pro Plan</h4>
                    <div className='fs-6 text-gray-700'>
                      Enjoy The Pro Version You Have Unlimted Acesss.
                    </div>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-lg-7'>
                  <h3 className='mb-2'>
                    Active Date {moment(user?.subscription_start).calendar()}
                  </h3>
                  <p className='fs-6 text-gray-600 fw-semibold mb-6 mb-lg-15'>
                    Subscription Start Date
                  </p>

                  <h3 className='mb-2'>Active until {moment(user?.subscription_end).calendar()}</h3>
                  <p className='fs-6 text-gray-600 fw-semibold mb-6 mb-lg-15'>
                    Subscription End Date
                  </p>
                  <div className='fs-5 mb-2'>
                    <span className='text-gray-800 fw-bold me-1'>$9.00</span>
                    <span className='text-gray-600 fw-semibold'>Per Month</span>
                  </div>
                  <div className='fs-6 text-gray-600 fw-semibold'>
                    You Have Pro Package. 1000 Folders 4000 Chats
                  </div>
                </div>
                <div className='col-lg-5'>
                  <div className='d-flex text-muted fw-bold fs-5 mb-3'>
                    <span className='flex-grow-1 text-gray-800'>Folder And Chats </span>
                    <span className='text-gray-800'>{chats + folders} of 5000 Used</span>
                  </div>
                  <div className='progress h-8px bg-light-primary mb-2'>
                    <div
                      className='progress-bar bg-primary'
                      role='progressbar'
                      style={{ width: `${((chats + folders) / 5000) * 100}%` }}
                      aria-valuenow={((chats + folders) / 5000) * 100}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                  <div className='fs-6 text-gray-600 fw-semibold mb-10'>
                    {5000 - (chats + folders)} Folders And Chats Remainings
                  </div>
                  <div className='d-flex justify-content-end pb-0 px-0'>
                    {user?.stripe_customer_id ? (
                      <ManageBill customerId={user?.stripe_customer_id}></ManageBill>
                    ) : null}

                    {user?.subscription_status &&
                    new Date() <= new Date(user?.subscription_end) ? null : (
                      <Checkout></Checkout>
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className='notice d-flex bg-light-warning rounded border-warning border border-dashed mb-12 p-6'>
                <i className='ki-duotone ki-information fs-2tx text-warning me-4'>
                  <span className='path1' />
                  <span className='path2' />
                  <span className='path3' />
                </i>

                <div className='d-flex flex-stack flex-grow-1'>
                  <div className='fw-semibold'>
                    <h4 className='text-gray-900 fw-bold'>We need your attention!</h4>
                    <div className='fs-6 text-gray-700'>
                      You have Limited access Using Free Trail With Limited Access
                    </div>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-lg-7'>
                  <h3 className='mb-2'>Free Version</h3>
                  <p className='fs-6 text-gray-600 fw-semibold mb-6 mb-lg-15'>
                    {process.env.NEXT_PUBLIC_FREEE_FOLDERS} Folders And{' '}
                    {process.env.NEXT_PUBLIC_FREEE_CHATS} Chats Only
                  </p>

                  <div className='fs-5 mb-2'>
                    <span className='text-gray-800 fw-bold me-1'>$9.00</span>
                    <span className='text-gray-600 fw-semibold'>Per Month</span>
                  </div>
                  <div className='fs-6 text-gray-600 fw-semibold'>
                    Extended Pro Package. 1000 Folders 4000 Chats
                  </div>
                </div>
                <div className='col-lg-5'>
                  <div className='d-flex justify-content-end pb-0 px-0'>
                    {user?.stripe_customer_id ? (
                      <ManageBill customerId={user?.stripe_customer_id}></ManageBill>
                    ) : null}

                    {user?.subscription_status &&
                    new Date() <= new Date(user?.subscription_end) ? null : (
                      <Checkout></Checkout>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className='card card-flush border border-gray-300 border-dashed'>
        <div className='card-body'>
          <table
            id='kt_file_manager_list'
            data-kt-filemanager-table='folders'
            className='table align-middle table-row-dashed fs-6 gy-5'
          >
            <thead>
              <tr className='text-start text-gray-500 fw-bold fs-7 text-uppercase gs-0'>
                <th>Customer</th>
                <th>Status</th>
                <th>Billing</th>
                <th>Created</th>
                <th className='text-end'>Expire</th>
              </tr>
            </thead>
            <tbody className='fw-semibold text-gray-600'></tbody>
          </table>
        </div>
      </div>
    </Layout>
  )
}
