import Link from 'next/link';

export default function SelectModel() {
  return (
    <div className="flex-shrink-0 ms-2">
      <button
        type="button"
        className="btn btn-icon btn-bg-light btn-active-icon-primary btn-color-gray-500"
        data-kt-menu-trigger="click"
        data-kt-menu-placement="bottom-end"
      >
        <i className="ki-duotone ki-abstract-32  text-primary  fs-2">
          <span className="path1" />
          <span className="path2" />
        </i>
      </button>
    </div>
  );
}
