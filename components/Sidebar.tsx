import Link from 'next/link';
import SearchFolder from './SearchFolder';
import SelectModel from './SelectModel';
import ShowFolder from './ShowFolder';
export default function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <div className="aside-secondary d-flex flex-row-fluid">
      <div className="aside-workspace my-5 p-5" id="kt_aside_wordspace">
        <div className="d-flex h-100 flex-column">
          <div
            className="flex-column-fluid hover-scroll-y"
            data-kt-scroll="true"
            data-kt-scroll-activate="true"
            data-kt-scroll-height="auto"
            data-kt-scroll-wrappers="#kt_aside_wordspace"
            data-kt-scroll-dependencies="#kt_aside_secondary_footer"
            data-kt-scroll-offset="0px"
          >
            <div className="tab-content">
              <div
                className="tab-pane fade active show"
                id="kt_aside_nav_tab_projects"
                role="tabpanel"
              >
                <div className="m-0">
                  <div className="d-flex mb-5">
                    <div
                      id="kt_header_search"
                      className="header-search d-flex align-items-center w-100"
                      data-kt-search-keypress="true"
                      data-kt-search-min-length={2}
                      data-kt-search-enter="enter"
                      data-kt-search-layout="menu"
                      data-kt-search-responsive="false"
                      SearchFolder
                      data-kt-menu-trigger="auto"
                      data-kt-menu-permanent="true"
                      data-kt-menu-placement="bottom-start"
                    >
                      <SearchFolder />
                    </div>
                    <SelectModel />
                  </div>
                  <ShowFolder />
                </div>
              </div>

              <div
                className="tab-pane fade"
                id="kt_aside_nav_tab_subscription"
                role="tabpanel"
              >
                <div className="row">
                  <div className="col-lg-12">
                    <h3 className="mb-2 ">Welcome to Subscriptions App</h3>
                    <h5 className="mb-2 text-gray-800">
                      Active until Dec 09, 2024
                    </h5>
                    <p className="fs-6 text-gray-600 fw-semibold mb-6 mb-lg-15">
                      We will send you a notification upon Subscription
                      expiration
                    </p>
                    <div className="fs-5 mb-2">
                      <span className="text-gray-800 fw-bold me-1">$24.99</span>
                      <span className="text-gray-600 fw-semibold">
                        Per Month
                      </span>
                    </div>
                    <div className="fs-6 text-gray-600 fw-semibold">
                      Extended Pro Package.&amp; 100 Projects 1000 Files
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="d-flex text-muted fw-bold fs-5 mb-3">
                      <span className="flex-grow-1 text-gray-800">Users</span>
                      <span className="text-gray-800">86 of 100 Used</span>
                    </div>
                    <div className="progress h-8px bg-light-primary mb-2">
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: '86%' }}
                        aria-valuenow={86}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                    <div className="fs-6 text-gray-600 fw-semibold mb-10">
                      14 Projects and 300 files remaining until your plan
                      requires update
                    </div>
                    <div className="d-flex justify-content-end pb-0 px-0">
                      <a
                        href="#"
                        className="btn btn-sm btn-outline btn-outline btn-outline-primary me-2 w-100"
                        id="kt_account_billing_cancel_subscription_btn"
                      >
                        Cancel
                      </a>
                      <button
                        className="btn btn-sm btn-outline btn-outline btn-outline-primary w-100"
                        data-bs-toggle="modal"
                        data-bs-target="#kt_modal_upgrade_plan"
                      >
                        Upgrade Pro
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="kt_aside_nav_tab_menu"
                role="tabpanel"
              >
                <div className="mx-5">
                  <div className=" pt-10 mb-20">
                    <h3 className="fs-2 fw-bold mb-7">File Manager</h3>
                    <p className="text-gray-500 fs-4 fw-semibold mb-10">
                      Make Folders Mange And Train Ai Model
                    </p>
                  </div>
                  <div className="text-center px-4">
                    <i
                      className="ki-duotone ki-folder  text-primary me-4"
                      style={{ fontSize: '7.75rem!important' }}
                    >
                      <span className="path1" />
                      <span className="path2" />
                    </i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
