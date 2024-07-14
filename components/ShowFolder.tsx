import Link from 'next/link';

export default function ShowFolder() {
  return (
    <>
      <a
        href="#"
        className="btn btn-sm btn-outline btn-outline btn-outline-primary  w-100"
        data-bs-toggle="modal"
        data-bs-target="#kt_modal_invite_friends"
      >
        <i className="ki-duotone ki-plus fs-2 me-0 me-md-2" />
        <span className="d-none d-md-inline">New Folder</span>
      </a>
      <a
        href="apps/projects/project.html"
        className="custom-list d-flex align-items-center px-0 my-3 text-gray-800 text-hover-primary"
      >
        <span className="icon-wrapper">
          <i className="ki-duotone ki-folder fs-2x text-primary me-2">
            <span className="path1" />
            <span className="path2" />
          </i>
        </span>

        <div className="d-flex flex-column flex-grow-1">
          <span className="text-gray-800 text-hover-primary mb-1">
            Briviba SaaS
          </span>
        </div>

        <span className="icon-wrapper">
          <i className="bi bi-trash fs-5 m-0 text-hover-primary">
            <span className="path1" />
            <span className="path2" />
          </i>
        </span>
      </a>
      <a
        href="apps/projects/project.html"
        className="custom-list d-flex align-items-center px-0 my-3 text-gray-800 text-hover-primary"
      >
        <span className="icon-wrapper">
          <i className="ki-duotone ki-folder fs-2x text-primary me-2">
            <span className="path1" />
            <span className="path2" />
          </i>
        </span>

        <div className="d-flex flex-column flex-grow-1">
          <span className="text-gray-800 text-hover-primary mb-1">
            Briviba SaaS
          </span>
        </div>

        <div>
          <span className="icon-wrapper me-2">
            <i className="bi bi-pencil-square fs-5 m-0 text-hover-primary">
              <span className="path1" />
              <span className="path2" />
            </i>
          </span>
          <span className="icon-wrapper">
            <i className="bi bi-trash fs-5 m-0 text-hover-primary">
              <span className="path1" />
              <span className="path2" />
            </i>
          </span>
        </div>
      </a>
    </>
  );
}

{
  /* <div className="d-flex align-items-center">
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
</div> */
}
