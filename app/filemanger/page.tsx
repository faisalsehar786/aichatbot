import Layout from './../../components/Layout';
export default async function Filemanger() {
  return (
    <Layout>
      <div className="card card-flush pb-0 bgi-position-y-center bgi-no-repeat mb-10">
        <div className="card-header py-10">
          <div className="d-flex align-items-center">
            <div className="symbol symbol-circle me-5">
              <div className="symbol-label bg-transparent text-primary border border-secondary border-dashed">
                <i className="ki-duotone ki-abstract-47 fs-2x text-primary">
                  <span className="path1" />
                  <span className="path2" />
                </i>
              </div>
            </div>
            <div className="d-flex flex-column">
              <h3 className="mb-1">File Manager</h3>
              <div className="text-muted fw-bold">
                <a href="#">File Manager</a>
                <span className="mx-3">|</span>4 items
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card card-flush">
        <div className="card-header pt-8">
          <div className="card-title">
            <div className="d-flex align-items-center position-relative my-1">
              <i className="ki-duotone ki-magnifier fs-1 position-absolute ms-6">
                <span className="path1" />
                <span className="path2" />
              </i>
              <input
                type="text"
                data-kt-filemanager-table-filter="search"
                className="form-control form-control-solid w-250px ps-15"
                placeholder="Search Files & Folders"
              />
            </div>
          </div>
          <div className="card-toolbar">
            <div
              className="d-flex justify-content-end"
              data-kt-filemanager-table-toolbar="base"
            >
              <button
                type="button"
                className="  btn btn-sm btn-outline btn-outline btn-outline-primary"
                id="kt_file_manager_new_folder"
              >
                <i className="ki-duotone ki-add-folder fs-2">
                  <span className="path1" />
                  <span className="path2" />
                </i>
                New Folder
              </button>
            </div>
          </div>
        </div>
        <div className="card-body">
          <table
            id="kt_file_manager_list"
            data-kt-filemanager-table="folders"
            className="table align-middle table-row-dashed fs-6 gy-5"
          >
            <thead>
              <tr className="text-start text-gray-500 fw-bold fs-7 text-uppercase gs-0">
                <th className="min-w-250px">Name</th>

                <th className="min-w-125px">Created at</th>
                <th className="w-125px" />
              </tr>
            </thead>
            <tbody className="fw-semibold text-gray-600">
              <tr>
                <td data-order="layouts">
                  <div className="d-flex align-items-center">
                    <span className="icon-wrapper">
                      <i className="ki-duotone ki-folder fs-2x text-primary me-4">
                        <span className="path1" />
                        <span className="path2" />
                      </i>
                    </span>
                    <a
                      href="apps/file-manager/files/.html"
                      className="text-gray-800 text-hover-primary"
                    >
                      layouts
                    </a>
                  </div>
                </td>
                <td>20 Jun 2024, 11:05 am</td>

                <td
                  className="text-end"
                  data-kt-filemanager-table="action_dropdown"
                >
                  <div className="d-flex justify-content-end">
                    <div className="ms-2" data-kt-filemanger-table="copy_link">
                      <button
                        type="button"
                        className="btn btn-sm btn-icon btn-light btn-active-light-primary   btn-outline btn-outline btn-outline-primary"
                        data-kt-menu-trigger="click"
                        data-kt-menu-placement="bottom-end"
                      >
                        <i className="ki-duotone ki-dots-square fs-5 m-0">
                          <span className="path1" />
                          <span className="path2" />
                          <span className="path3" />
                          <span className="path4" />
                        </i>
                      </button>
                    </div>
                  </div>
                </td>
              </tr>

              <tr>
                <td data-order="layouts">
                  <div className="d-flex align-items-center">
                    <span className="icon-wrapper">
                      <i className="ki-duotone ki-file fs-2x text-primary me-4">
                        <span className="path1" />
                        <span className="path2" />
                      </i>
                    </span>
                    <a
                      href="apps/file-manager/files/.html"
                      className="text-gray-800 text-hover-primary"
                    >
                      write react messanger app code
                    </a>
                  </div>
                </td>
                <td>20 Jun 2024, 11:05 am</td>

                <td
                  className="text-end"
                  data-kt-filemanager-table="action_dropdown"
                >
                  <div className="d-flex justify-content-end">
                    <div className="ms-2" data-kt-filemanger-table="copy_link">
                      <button
                        type="button"
                        className="btn btn-sm btn-icon btn-light btn-active-light-primary   btn-outline btn-outline btn-outline-primary"
                        data-kt-menu-trigger="click"
                        data-kt-menu-placement="bottom-end"
                      >
                        <i className="ki-duotone ki-dots-square fs-5 m-0">
                          <span className="path1" />
                          <span className="path2" />
                          <span className="path3" />
                          <span className="path4" />
                        </i>
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div
        className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-150px py-4 show"
        data-kt-menu="true"
        style={{
          zIndex: 107,
          position: 'fixed',
          inset: '42px 0px auto auto',
          margin: 0,
          transform: 'translate(-60px, 43px)'
        }}
        data-popper-placement="bottom-end"
      >
        <div className="menu-item px-3">
          <a href="#" className="menu-link px-3">
            Train Ai
          </a>
        </div>
        <div className="menu-item px-3">
          <a
            href="#"
            className="menu-link px-3"
            data-kt-filemanager-table="rename"
          >
            Rename
          </a>
        </div>

        <div className="menu-item px-3">
          <a
            href="#"
            className="menu-link text-danger px-3"
            data-kt-filemanager-table-filter="delete_row"
          >
            Delete
          </a>
        </div>
      </div>
    </Layout>
  );
}
