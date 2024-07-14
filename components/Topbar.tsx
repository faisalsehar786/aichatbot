import Link from 'next/link';

export default function Topbar() {
  return (
    <div
      id="kt_header"
      className="header"
      data-kt-sticky="true"
      data-kt-sticky-name="header"
      data-kt-sticky-offset="{default: '200px', lg: '300px'}"
    >
      <div
        className="container-xxl d-flex align-items-center justify-content-between"
        id="kt_header_container"
      >
        <div
          className="page-title d-flex flex-column align-items-start justify-content-center flex-wrap mt-n5 mt-lg-0 me-lg-2 pb-2 pb-lg-0"
          data-kt-swapper="true"
          data-kt-swapper-mode="prepend"
          data-kt-swapper-parent="{default: '#kt_content_container', lg: '#kt_header_container'}"
        >
          <div className="d-flex flex-stack">
            <div className="badge badge-lg badge-light-primary">
              <div className="d-flex align-items-center flex-wrap">
                <i className="ki-duotone ki-abstract-32 fs-2 text-primary me-3">
                  <span className="path1" />
                  <span className="path2" />
                </i>
                <a href="#">Model</a>
                <i className="ki-duotone ki-right  text-primary mx-1" />
                <a href="#">Ai Chat</a>

                <i className="ki-duotone ki-right  text-primary mx-1" />
                <a href="#">Briviba SaaS</a>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex flex-shrink-0">
          <Link href="/myaccount">
            <div className=" d-flex align-items-center px-3">
              <div className="symbol symbol-35px me-5">
                <img alt="Logo" src="assets/media/avatars/300-1.jpg" />
              </div>
              <div className="d-flex flex-column">
                <div className="fw-bold d-flex align-items-center fs-5">
                  Max Smith
                  <span className="badge badge-light-success fw-bold fs-8 px-2 py-1 ms-2">
                    Pro
                  </span>
                </div>
                <a
                  href="#"
                  className="fw-semibold text-muted text-hover-primary fs-7"
                >
                  max@kt.com
                </a>
              </div>
            </div>
          </Link>
          <div className="d-flex ms-3">
            <Link
              href="/login"
              className=" btn btn-sm btn-outline btn-outline btn-outline-primary w-40px w-md-auto px-0 px-md-6"
            
            >
              {/* <i className="ki-duotone ki-plus fs-2 me-0 me-md-2" /> */}

              <i className="ki-duotone ki-lock  fs-3 fs-lg-3">
                <span className="path1" />
                <span className="path2" />
                <span className="path3" />
                <span className="path4" />
              </i>
              <span className="d-none d-md-inline">Login</span>
            </Link>
          </div>  
        </div>
      </div>
    </div>
  );
}
