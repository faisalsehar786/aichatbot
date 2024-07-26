import Sidebar from './Sidebar'
import Topbar from './Topbar'
import Aside from './Aside'
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div
        id='kt_aside'
        className='aside aside-extended'
        data-kt-drawer='true'
        data-kt-drawer-name='aside'
        data-kt-drawer-activate='{default: true, lg: false}'
        data-kt-drawer-overlay='true'
        data-kt-drawer-width='auto'
        data-kt-drawer-direction='start'
        data-kt-drawer-toggle='#kt_aside_mobile_toggle'
      >
        <Aside />
        <Sidebar />
      </div>
      <div className='wrapper d-flex flex-column flex-row-fluid' id='kt_wrapper'>
        <Topbar />
        <div className='content d-flex flex-column flex-column-fluid pb-5' id='kt_content'>
          <div className='container-fluid' id='kt_content_container'>
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
