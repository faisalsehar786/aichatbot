import Link from 'next/link';

export default function Aside() {
  return (
    <div className="aside-primary d-flex flex-column align-items-lg-center flex-row-auto">
      <div
        className="aside-logo d-none d-lg-flex flex-column align-items-center flex-column-auto py-10"
        id="kt_aside_logo"
      >
        <Link href="/">
          <img
            alt="Logo"
            src="assets/media/logos/demo7.svg"
            className="h-40px"
          />
        </Link>
      </div>
      <div
        className="aside-nav d-flex flex-column align-items-center flex-column-fluid w-100 pt-5 pt-lg-0"
        id="kt_aside_nav"
      >
        <div
          className="hover-scroll-overlay-y mb-5 scroll-ms px-5"
          data-kt-scroll="true"
          data-kt-scroll-activate="{default: false, lg: true}"
          data-kt-scroll-height="auto"
          data-kt-scroll-wrappers="#kt_aside_nav"
          data-kt-scroll-dependencies="#kt_aside_logo, #kt_aside_footer"
          data-kt-scroll-offset="0px"
        >
          <ul className="nav flex-column w-100" id="kt_aside_nav_tabs">
            <li
              className="nav-item mb-2"
              data-bs-toggle="tooltip"
              data-bs-trigger="hover"
              data-bs-placement="right"
              data-bs-dismiss="click"
              title="Projects"
            >
              <Link
                className="nav-link btn btn-icon btn-active-color-primary btn-color-gray-500 btn-active-light"
                href="/"
              >
                <i className="ki-duotone ki-element-11 fs-2x">
                  <span className="path1" />
                  <span className="path2" />
                  <span className="path3" />
                  <span className="path4" />
                </i>
              </Link>
            </li>
            <li
              className="nav-item mb-2"
              data-bs-toggle="tooltip"
              data-bs-trigger="hover"
              data-bs-placement="right"
              data-bs-dismiss="click"
              title="Menu"
            >
              <Link
                className="nav-link btn btn-icon btn-active-color-primary btn-color-gray-500 btn-active-light active"
                href="/filemanger"
              >
                <i className="ki-duotone ki-folder  fs-2x">
                  <span className="path1" />
                  <span className="path2" />
                </i>
              </Link>
            </li>
            <li
              className="nav-item mb-2"
              data-bs-toggle="tooltip"
              data-bs-trigger="hover"
              data-bs-placement="right"
              data-bs-dismiss="click"
              title="Subscription"
            >
              {/* <span
                className="badge badge-light-success fw-bold fs-8 px-2 py-1 ms-2"
                style={{ position: 'absolute', right: '4%', zIndex: 10 }}
              >  
                Pro
              </span> */}
              <Link
                className="nav-link btn btn-icon btn-active-color-primary btn-color-gray-500 btn-active-light"
                href="/subscription"
              >
                <i className="ki-duotone ki-chart-simple fs-2x">
                  <span className="path1" />
                  <span className="path2" />
                  <span className="path3" />
                  <span className="path4" />
                </i>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div
        className="aside-footer d-flex flex-column align-items-center flex-column-auto"
        id="kt_aside_footer"
      >
        <div className="d-flex align-items-center mb-10">
          <div
            className="btn btn-icon btn-active-color-primary btn-color-gray-500 btn-active-light"
            data-kt-menu-trigger="click"
            data-kt-menu-overflow="true"
            data-kt-menu-placement="top-start"
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            data-bs-dismiss="click"
            title="logout"
          >
            <i className="ki-duotone ki-lock  fs-2 fs-lg-1">
              <span className="path1" />
              <span className="path2" />
              <span className="path3" />
              <span className="path4" />
            </i>
          </div>
        </div>
      </div>
    </div>
  );
}
