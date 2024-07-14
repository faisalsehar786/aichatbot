import Link from 'next/link';

export default function SearchFolder() {
  return (
    <form
      data-kt-search-element="form"
      className="d-none d-lg-block w-100 position-relative mb-5 mb-lg-0"
      autoComplete="off"
    >
      <input type="hidden" />
      <i className="ki-duotone ki-magnifier search-icon fs-2 text-gray-500 position-absolute top-50 translate-middle-y ms-5">
        <span className="path1" />
        <span className="path2" />
      </i>
      <input
        type="text"
        className="search-input form-control form-control-solid ps-13"
        name="search"
        defaultValue=""
        placeholder="Search Folder..."
        data-kt-search-element="input"
      />
      <span
        className="search-spinner position-absolute top-50 end-0 translate-middle-y lh-0 d-none me-5"
        data-kt-search-element="spinner"
      >
        <span className="spinner-border h-15px w-15px align-middle text-gray-500" />
      </span>
      <span
        className="search-reset btn btn-flush btn-active-color-primary position-absolute top-50 end-0 translate-middle-y lh-0 d-none me-4"
        data-kt-search-element="clear"
      >
        <i className="ki-duotone ki-cross fs-2 fs-lg-1 me-0">
          <span className="path1" />
          <span className="path2" />
        </i>
      </span>
    </form>
  );
}
