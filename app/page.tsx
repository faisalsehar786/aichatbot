'use client'
import Layout from './../components/Layout'
import React from 'react'
import { useTheme } from '@/context/ThemeContext'
import { useUser } from '@/lib/store/user'
export default function Home() {
  const { ai_version, setVersion } = useTheme()
  const gptModel = ['gpt-3.5-turbo', 'gpt-4']

  return (
    <Layout>
      <div className='h-[calc(100vh-190px)] overflow-y-auto hide__scroll__bar px-1'>
        <section className=' items-center justify-center  py-6 md:-0 px-2 text-white'>
          <div className='mx-auto  w-fit  tabs tabs-boxed mt-20 pt-10'>
            <span className='badge badge-primary fs-7 fw-semibold'>
              ✨ Wellcome to ai mangement system{' '}
            </span>
          </div>

          <div className='mx-auto   w-fit'>
            <div className='d-flex align-items-center  my-20'>
              <div className='symbol symbol-50px me-5'>
                <img src='assets/media/logos/ai.webp' className='' alt='' />
              </div>
              <div className='flex-grow-1'>
                <h2 className=' text-hover-primary mb-0' style={{ fontSize: '3rem' }}>
                  Ai Chat Bot
                </h2>
              </div>
            </div>
          </div>

          <div className='row '>
            <div className='col-lg-4 col-md-6'>
              <div className='me-md-5 w-100'>
                <div className='d-flex border border-gray-300 border-dashed rounded p-6 mb-6 h-80px'>
                  <div className='d-flex align-items-center flex-grow-1 me-2 me-sm-5'>
                    <div className='symbol symbol-50px me-4'>
                      <span className='symbol-label'>
                        <i className='ki-duotone ki-timer fs-2qx text-primary'>
                          <span className='path1' />
                          <span className='path2' />
                          <span className='path3' />
                        </i>
                      </span>
                    </div>
                    <div className='me-2'>
                      <a href='#' className='text-gray-800 text-hover-primary fs-6 fw-bold'>
                        Attendance
                      </a>
                      <span className='text-gray-500 fw-bold d-block fs-7'>Great, you always</span>
                    </div>
                  </div>
                </div>

                <div className='d-flex border border-gray-300 border-dashed rounded p-6 mb-6 h-80px'>
                  <div className='d-flex align-items-center flex-grow-1 me-2 me-sm-5'>
                    <div className='symbol symbol-50px me-4'>
                      <span className='symbol-label'>
                        <i className='ki-duotone ki-abstract-24 fs-2qx text-primary'>
                          <span className='path1' />
                          <span className='path2' />
                        </i>
                      </span>
                    </div>
                    <div className='me-2'>
                      <a href='#' className='text-gray-800 text-hover-primary fs-6 fw-bold'>
                        Tests
                      </a>
                      <span className='text-gray-500 fw-bold d-block fs-7'>
                        You take 12 subjects
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-lg-4 col-md-6'>
              <div className='me-md-5 w-100'>
                <div className='d-flex border border-gray-300 border-dashed rounded p-6 mb-6 h-80px'>
                  <div className='d-flex align-items-center flex-grow-1 me-2 me-sm-5'>
                    <div className='symbol symbol-50px me-4'>
                      <span className='symbol-label'>
                        <i className='ki-duotone ki-timer fs-2qx text-primary'>
                          <span className='path1' />
                          <span className='path2' />
                          <span className='path3' />
                        </i>
                      </span>
                    </div>
                    <div className='me-2'>
                      <a href='#' className='text-gray-800 text-hover-primary fs-6 fw-bold'>
                        Attendance
                      </a>
                      <span className='text-gray-500 fw-bold d-block fs-7'>Great, you always</span>
                    </div>
                  </div>
                </div>
                <div className='d-flex border border-gray-300 border-dashed rounded p-6 mb-6 h-80px'>
                  <div className='d-flex align-items-center flex-grow-1 me-2 me-sm-5'>
                    <div className='symbol symbol-50px me-4'>
                      <span className='symbol-label'>
                        <i className='ki-duotone ki-element-11 fs-2qx text-primary'>
                          <span className='path1' />
                          <span className='path2' />
                          <span className='path3' />
                          <span className='path4' />
                        </i>
                      </span>
                    </div>
                    <div className='me-2'>
                      <a href='#' className='text-gray-800 text-hover-primary fs-6 fw-bold'>
                        Homeworks
                      </a>
                      <span className='text-gray-500 fw-bold d-block fs-7'>
                        Don’t forget to turn in your task
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-lg-4 col-md-6'>
              <div className='me-md-5 w-100'>
                <div className='d-flex border border-gray-300 border-dashed rounded p-6 mb-6 h-80px'>
                  <div className='d-flex align-items-center flex-grow-1 me-2 me-sm-5'>
                    <div className='symbol symbol-50px me-4'>
                      <span className='symbol-label'>
                        <i className='ki-duotone ki-element-11 fs-2qx text-primary'>
                          <span className='path1' />
                          <span className='path2' />
                          <span className='path3' />
                          <span className='path4' />
                        </i>
                      </span>
                    </div>
                    <div className='me-2'>
                      <a href='#' className='text-gray-800 text-hover-primary fs-6 fw-bold'>
                        Homeworks
                      </a>
                      <span className='text-gray-500 fw-bold d-block fs-7'>
                        Don’t forget to turn
                      </span>
                    </div>
                  </div>
                </div>
                <div className='d-flex border border-gray-300 border-dashed rounded p-6 mb-6 h-80px'>
                  <div className='d-flex align-items-center flex-grow-1 me-2 me-sm-5'>
                    <div className='symbol symbol-50px me-4'>
                      <span className='symbol-label'>
                        <i className='ki-duotone ki-abstract-24 fs-2qx text-primary'>
                          <span className='path1' />
                          <span className='path2' />
                        </i>
                      </span>
                    </div>
                    <div className='me-2'>
                      <a href='#' className='text-gray-800 text-hover-primary fs-6 fw-bold'>
                        Tests
                      </a>
                      <span className='text-gray-500 fw-bold d-block fs-7'>
                        You take 12 subjects at this semeste
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}
