import Layout from './../components/Layout';

export default function Home() {
  return (
    <Layout>
      <div className="menu menu-sub menu-sub-dropdown menu-column w-100 show mb-5">
        <div
          className="d-flex flex-column flex-center  rounded-top px-9 py-10"
          style={{
            backgroundImage: 'url("assets/media/misc/dropdown-header-bg.png")'
          }}
        >
      
        </div>
        <div className="row g-0">
          <div className="col-6">
            <a
              href="apps/projects/budget.html"
              className="d-flex flex-column flex-center h-100 p-6 bg-hover-light border-end border-bottom"
            >
              <i className="ki-duotone ki-dollar fs-3x text-primary mb-2">
                <span className="path1" />
                <span className="path2" />
                <span className="path3" />
              </i>
              <span className="fs-5 fw-semibold text-gray-800 mb-0">
                Accounting
              </span>
              <span className="fs-7 text-gray-500">eCommerce</span>
            </a>
          </div>
          <div className="col-6">
            <a
              href="apps/projects/settings.html"
              className="d-flex flex-column flex-center h-100 p-6 bg-hover-light border-bottom"
            >
              <i className="ki-duotone ki-sms fs-3x text-primary mb-2">
                <span className="path1" />
                <span className="path2" />
              </i>
              <span className="fs-5 fw-semibold text-gray-800 mb-0">
                Administration
              </span>
              <span className="fs-7 text-gray-500">Console</span>
            </a>
          </div>
          <div className="col-6">
            <a
              href="apps/projects/list.html"
              className="d-flex flex-column flex-center h-100 p-6 bg-hover-light border-end"
            >
              <i className="ki-duotone ki-abstract-41 fs-3x text-primary mb-2">
                <span className="path1" />
                <span className="path2" />
              </i>
              <span className="fs-5 fw-semibold text-gray-800 mb-0">
                Projects
              </span>
              <span className="fs-7 text-gray-500">Pending Tasks</span>
            </a>
          </div>
          <div className="col-6">
            <a
              href="apps/projects/users.html"
              className="d-flex flex-column flex-center h-100 p-6 bg-hover-light"
            >
              <i className="ki-duotone ki-briefcase fs-3x text-primary mb-2">
                <span className="path1" />
                <span className="path2" />
              </i>
              <span className="fs-5 fw-semibold text-gray-800 mb-0">
                Customers
              </span>
              <span className="fs-7 text-gray-500">Latest cases</span>
            </a>
          </div>
        </div>
        <div className="py-2 text-center border-top">
          <a
            href="pages/user-profile/activity.html"
            className="btn btn-color-gray-600 btn-active-color-primary"
          >
            View All
            <i className="ki-duotone ki-arrow-right fs-5">
              <span className="path1" />
              <span className="path2" />
            </i>
          </a>
        </div>
      </div>

      <div className="scroll-y me-n5 pe-5  h-lg-auto">
        <div className=" justify-content-start mb-10">
          <div className="d-flex flex-column align-items-start">
            <div className="d-flex align-items-center mb-2">
              <div className="symbol symbol-35px symbol-circle">
                <img alt="Pic" src="assets/media/logos/demo7.svg" />
              </div>
              <div className="ms-3">
                <a
                  href="#"
                  className="fs-5 fw-bold text-gray-900 text-hover-primary me-1"
                >
                  Ai Chat Bot
                </a>
                <span className="text-muted fs-7 mb-1">2 mins</span>
              </div>
            </div>
            <div
              className="p-5 rounded bg-light-info text-gray-900 fw-semibold w-100 text-start"
              data-kt-element="message-text"
            >
              How likely are you to recommend our company to your friends and
              family ?
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end mb-10">
          <div className="d-flex flex-column align-items-end">
            <div className="d-flex align-items-center mb-2">
              <div className="me-3">
                <span className="text-muted fs-7 mb-1">5 mins</span>
                <a
                  href="#"
                  className="fs-5 fw-bold text-gray-900 text-hover-primary ms-1"
                >
                  You
                </a>
              </div>
              <div className="symbol symbol-35px symbol-circle">
                <img alt="Pic" src="assets/media/avatars/300-1.jpg" />
              </div>
            </div>
            <div
              className="p-5 rounded bg-light-primary text-gray-900 fw-semibold mw-lg-600px text-end"
              data-kt-element="message-text"
            >
              Hey there, we’re just writing to let you know that you’ve been
              subscribed to a repository on GitHub.
            </div>
          </div>
        </div>
      </div>

      <div className="card-footer pt-4">
        <div className="row">
          <div className="col-11">
            <textarea
              className="form-control form-control-lg form-control-solid mb-3"
              rows={2}
              data-kt-element="input"
              placeholder="Type a message"
              defaultValue={''}
            />
          </div>
          <div className="col-1 m-auto">
            <button
              className="btn btn-sm btn-outline btn-outline btn-outline-primary"
              type="button"
              data-kt-element="send"
            >
              <i className="fa fa-paper-plane" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
